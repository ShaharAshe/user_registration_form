const utilities = {
    az_pattern : /^[a-z]+\s*$/,
    email_pattern : /\S+@\S+ac\.il/,
    password_pattern : /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,


    elem_next_none : document.querySelectorAll('div .next-clicked'),
    elem_prev_none : document.querySelectorAll('div .prev-clicked'),

    sub_next : document.querySelector("div .sub-next"),

    first_name_ev : document.getElementById("First-Name"),
    last_name_ev : document.getElementById("Last-Name"),
    email_ev : document.getElementById("Email"),
    password_ev : document.getElementById("Password"),
    confirm_password_ev : document.getElementById("Valid-Password"),
    date_ev : document.getElementById("Date-Of-Birth"),
    gender_ev : document.getElementById("Gender"),
    text_ev : document.querySelector("textarea"),
}

const funcs = {
    click_sub_next(){
        let is_valid = true;
        if (page_num === PAGE_1)
        {
            // first name validation
            if (this.validate_check(utilities.first_name_ev, utilities.az_pattern, ".bad-val-fu", ".good-val-fu", "first name", "The first name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                this.alert_message(".bad-val-fu", ".good-val-fu", "", false);

            // last name validation
            if (this.validate_check(utilities.last_name_ev, utilities.az_pattern, ".bad-val-lu", ".good-val-lu", "last name", "The last name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                this.alert_message(".bad-val-lu", ".good-val-lu", "", false);

            //email validation
            if (this.validate_check(utilities.email_ev, utilities.email_pattern, ".bad-val-eu", ".good-val-eu", "Email", "The Email should contain a valid email address from an Israeli academic institution (*.ac.il)"))
                is_valid = false;
            else if(utilities.email_ev.value.trim() in emails) {
                this.alert_message(".bad-val-eu", ".good-val-eu", "The Email should be unique, one cannot record more than one user with same email.", true);
                is_valid = false;
            } else
                this.alert_message(".bad-val-eu", ".good-val-eu", "", false);


            if(is_valid)
                this.next_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        }
        else
        {
            // password validation
            let add_length = ""
            if(utilities.password_ev.value.trim() && utilities.password_ev.value.trim().length<8)
                add_length = " <b>minimum eight characters<b>";

            if (this.validate_check(utilities.password_ev, utilities.password_pattern, ".bad-val-pu", ".good-val-pu", "password", "The password should only contain at least one uppercase letter(A-Z), one lowercase letter (a-z) and one digit."+add_length))
            {
                is_valid = false;

                // remove the valid password alert
                document.querySelector(".good-val-vpu").classList.add('d-none');
                document.querySelector(".bad-val-vpu").classList.add('d-none');
            } else if(add_length !== "") {
                this.alert_message(".bad-val-pu", ".good-val-pu", add_length, true);
                is_valid = false;

                document.querySelector(".good-val-vpu").classList.add('d-none');
                document.querySelector(".bad-val-vpu").classList.add('d-none');
            } else {
                this.alert_message(".bad-val-pu", ".good-val-pu", "", false);

                // valid password validation
                if(this.is_empty(utilities.confirm_password_ev, ".bad-val-vpu", ".good-val-vpu", "Valid password"))
                    is_valid = false;
                else if(utilities.confirm_password_ev.value.trim() !== utilities.password_ev.value.trim()) {
                    this.alert_message(".bad-val-vpu", ".good-val-vpu", "The Valid password must match the first password field", true);
                    is_valid = false;
                } else
                    this.alert_message(".bad-val-vpu", ".good-val-vpu", "", false);
            }

            // date validation
            if(this.is_empty(utilities.date_ev, ".bad-val-du", ".good-val-du", "date"))
                is_valid = false;
            else {
                if (!this.check_date(utilities.date_ev))
                    is_valid = false;
            }

            // gender validation
            if(utilities.gender_ev.selectedIndex === 0) {
                this.alert_message(".bad-val-gu", ".good-val-gu", "You must to choose your Gender!", true);
                is_valid = false;
            } else
                this.alert_message(".bad-val-gu", ".good-val-gu", "", false);

            if(utilities.text_ev.value.trim().length > 100) {
                this.alert_message(".bad-val-cu", "", "maximum of 100 characters", true);
                is_valid = false;
            } else
                this.alert_message(".bad-val-cu", "", "", false);

            if(is_valid)
            {
                document.querySelector(".no-exist-u").classList.add("d-none");
                document.querySelector(".exist-u").classList.remove("d-none");

                emails[utilities.email_ev.value.trim()] = {
                    first_name: utilities.first_name_ev.value.trim(),
                    last_name: utilities.last_name_ev.value.trim(),
                    password: utilities.password_ev.value.trim(),
                    date: utilities.date_ev.value.trim(),
                    gender: genders[utilities.gender_ev.value.trim()-1],
                    text: utilities.text_ev.value.trim(),
                };

                utilities.email_ev.value = "";
                utilities.first_name_ev.value = "";
                utilities.last_name_ev.value = "";
                utilities.password_ev.value = "";
                utilities.confirm_password_ev.value = "";
                utilities.date_ev.value = "";
                utilities.gender_ev.selectedIndex = 0;
                utilities.text_ev.value = "";

                this.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
                this.reset_alerts();

                // sort the emails object
                emails = this.sort_emails(emails);
                //===============================

                this.add_scope(emails);
            }
        }
    },

    alert_message(bad_lable, good_lable, message, is_bad)
    {
        let name_alert = document.querySelector(bad_lable);
        name_alert.innerHTML = message;

        if (is_bad)
        {
            name_alert.classList.remove("d-none")
            if(good_lable !== "") {
                name_alert = document.querySelector(good_lable);
                name_alert.classList.add("d-none")
            }
        }
        else
        {
            name_alert.classList.add("d-none")
            if(good_lable !== "") {
                name_alert = document.querySelector(good_lable);
                name_alert.classList.remove("d-none")
            }
        }
    },

    prev_click(elem_prev_none, elem_next_none, sub_next) {
        elem_prev_none.forEach(div => {
            div.classList.remove('d-none');
        });

        elem_next_none.forEach(div => {
            div.classList.add('d-none');
        });

        sub_next.classList.remove("btn-success");
        sub_next.classList.add("btn-primary");

        --page_num;
        sub_next.innerHTML = "Next";
    },

    next_click(elem_prev_none, elem_next_none, sub_next) {
        elem_next_none.forEach(div => {
            div.classList.remove('d-none');
        });

        elem_prev_none.forEach(div => {
            div.classList.add('d-none');
        });

        sub_next.innerHTML = "Submit";
        sub_next.classList.remove("btn-primary")
        sub_next.classList.add("btn-success")
        ++page_num;
    },

    reset_alerts()
    {
        const alerts_bunners = document.querySelectorAll('div .alert');

        alerts_bunners.forEach(alert =>{
            alert.classList.add('d-none');
        })
    },

    is_empty(ev, bad, good, empty_field){
        if(!ev.value.trim()) {
            this.alert_message(bad, good, "The "+empty_field+" must not be empty", true);
            return true;
        }
        return false;
    },

    validate_check(ev, pattern, bad, good, empty_field, pattern_msg){
        if(this.is_empty(ev, bad, good, empty_field))
            return true;
        if(!pattern.test(ev.value.trim())) {
            this.alert_message(bad, good, pattern_msg, true);
            return true;
        }
        return false;
    },

    sort_emails(emails){
        // sort the emails object
        const sortedKeys = Object.keys(emails).sort();
        const sortedObject = {};
        sortedKeys.forEach(key => {
            sortedObject[key] = emails[key];
        });
        return sortedObject;
    },

    add_scope(emails){
        let new_scope = "";
        let list = 0;

        for (const user in emails){
            new_scope += "<tr>\n" +
                "                    <th scope=\"row\">"+(++list).toString()+"</th>\n" +
                "                    <td>"+emails[user].first_name+"</td>\n" +
                "                    <td>"+emails[user].last_name+"</td>\n" +
                "                    <td>"+user+"</td>\n" +
                "                    <td>"+emails[user].password+"</td>\n" +
                "                    <td>"+emails[user].date+"</td>\n" +
                "                    <td>"+emails[user].gender+"</td>\n" +
                "                    <td>"+emails[user].text+"</td>\n" +
                "                </tr>";
        }
        document.querySelector("tbody").innerHTML = new_scope
    },
    check_date(date_ev){
        const dateObject = new Date(date_ev.value.trim()); // make date value
        if (!isNaN(dateObject.getTime())/*check if the date input is valid*/) {
            const currentDate = new Date();
            const userBirthDate = new Date(dateObject.getFullYear() + 18, dateObject.getMonth(), dateObject.getDate());
            if (userBirthDate > currentDate)
            {
                this.alert_message(".bad-val-du", ".good-val-du", "The user date must be at least 18 years old", true);
                return false;
            }
            // good date
            this.alert_message(".bad-val-du", ".good-val-du", "", false);
            return true;
        }
        this.alert_message(".bad-val-du", ".good-val-du", "the date input is not valid", true);
        return false;
    },
}



const main = {
    main_func(){
        utilities.sub_next.addEventListener("click", function() {funcs.click_sub_next()})

        document.querySelector(".go-prev").addEventListener("click", function(){
            funcs.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        })
    },
}