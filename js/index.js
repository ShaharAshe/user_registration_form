const utilities = {
    PAGE_1: 0,
    emails: {},
    page_num: 0,
    genders: ["Male", "Female", "Other"],

    az_pattern: /^[a-z]+\s*$/,
    email_pattern: /\S+@\S+ac\.il/,
    password_pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,

    elem_next_none: document.querySelectorAll('div .next-clicked'),
    elem_prev_none: document.querySelectorAll('div .prev-clicked'),

    sub_next: document.querySelector("div .sub-next"),
    go_prev: document.querySelector("div .go-prev"),

    first_name_ev: document.getElementById("First-Name"),
    last_name_ev: document.getElementById("Last-Name"),
    email_ev: document.getElementById("Email"),
    password_ev: document.getElementById("Password"),
    confirm_password_ev: document.getElementById("Valid-Password"),
    date_ev: document.getElementById("Date-Of-Birth"),
    gender_ev: document.getElementById("Gender"),
    text_ev: document.querySelector("textarea"),

    first_name_good : document.querySelector("div .good-val-fu"),
    first_name_bad : document.querySelector("div .bad-val-fu"),
    last_name_good : document.querySelector("div .good-val-lu"),
    last_name_bad : document.querySelector("div .bad-val-lu"),
    email_good : document.querySelector("div .good-val-eu"),
    email_bad : document.querySelector("div .bad-val-eu"),
    password_good : document.querySelector("div .good-val-pu"),
    password_bad : document.querySelector("div .bad-val-pu"),
    valid_password_good : document.querySelector("div .good-val-vpu"),
    valid_password_bad : document.querySelector("div .bad-val-vpu"),
    date_good :  document.querySelector("div .good-val-du"),
    date_bad:document.querySelector("div .bad-val-du"),
    gender_good : document.querySelector("div .good-val-gu"),
    gender_bad : document.querySelector("div .bad-val-gu"),
    comment_bad : document.querySelector("div .bad-val-cu"),

    user_no_exist : document.querySelector(".no-exist-u"),
    user_exist : document.querySelector(".exist-u"),
}


// ===================================================================

const funcs = {
    alert_message(bad_label, good_label, message, is_bad)
    {
        bad_label.innerHTML = message;

        if (is_bad)
        {
            bad_label.classList.remove("d-none")
            if(good_label !== "")
                good_label.classList.add("d-none")
        }
        else
        {
            bad_label.classList.add("d-none")
            if(good_label !== "")
                good_label.classList.remove("d-none")
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

        --utilities.page_num;
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
        ++utilities.page_num;
    },
    reset_alerts()
    {
        const alerts_banners = document.querySelectorAll('div .alert');

        alerts_banners.forEach(alert =>{
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
    sort_emails(){
        // sort the emails object
        const sortedKeys = Object.keys(utilities.emails).sort();
        const sortedObject = {};
        sortedKeys.forEach(key => {
            sortedObject[key] = utilities.emails[key];
        });
        utilities.emails = sortedObject;
    },
    add_scope(){
        let new_scope = "";
        let list = 0;

        for (const user in utilities.emails){
            new_scope += "<tr>\n" +
                "                    <th scope=\"row\">"+(++list).toString()+"</th>\n" +
                "                    <td>"+utilities.emails[user].first_name+"</td>\n" +
                "                    <td>"+utilities.emails[user].last_name+"</td>\n" +
                "                    <td>"+user+"</td>\n" +
                "                    <td>"+utilities.emails[user].password+"</td>\n" +
                "                    <td>"+utilities.emails[user].date+"</td>\n" +
                "                    <td>"+utilities.emails[user].gender+"</td>\n" +
                "                    <td>"+utilities.emails[user].text+"</td>\n" +
                "                </tr>";
        }
        document.querySelector("tbody").innerHTML = new_scope
    },
    check_date(){
        const dateObject = new Date(utilities.date_ev.value.trim()); // make date value
        if (!isNaN(dateObject.getTime())/*check if the date input is valid*/) {
            const currentDate = new Date();
            const userBirthDate = new Date(dateObject.getFullYear() + 18, dateObject.getMonth(), dateObject.getDate());
            if (userBirthDate > currentDate)
            {
                this.alert_message(utilities.date_bad, utilities.date_good, "The user date must be at least 18 years old", true);
                return false;
            }
            // good date
            this.alert_message(utilities.date_bad, utilities.date_good, "", false);
            return true;
        }
        this.alert_message(utilities.date_bad, utilities.date_good, "the date input is not valid", true);
        return false;
    },
    add_email(){
        utilities.emails[utilities.email_ev.value.trim()] = {
            first_name: utilities.first_name_ev.value.trim(),
            last_name: utilities.last_name_ev.value.trim(),
            password: utilities.password_ev.value.trim(),
            date: utilities.date_ev.value.trim(),
            gender: utilities.genders[utilities.gender_ev.value.trim()-1],
            text: utilities.text_ev.value.trim(),
        };
    },
    reset_form(){
        utilities.email_ev.value = "";
        utilities.first_name_ev.value = "";
        utilities.last_name_ev.value = "";
        utilities.password_ev.value = "";
        utilities.confirm_password_ev.value = "";
        utilities.date_ev.value = "";
        utilities.gender_ev.selectedIndex = 0;
        utilities.text_ev.value = "";
    },
}


// ======================================================================

const main = {
    main_func(){
        utilities.sub_next.addEventListener("click", function() {main.click_sub_next()})

        utilities.go_prev.addEventListener("click", function(){
            funcs.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        })
    },
    click_sub_next(){
        let is_valid = true;
        if (utilities.page_num === utilities.PAGE_1)
        {
            // first name validation
            if (funcs.validate_check(utilities.first_name_ev, utilities.az_pattern, utilities.first_name_bad, utilities.first_name_good, "first name", "The first name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                funcs.alert_message(utilities.first_name_bad, utilities.first_name_good, "", false);

            // last name validation
            if (funcs.validate_check(utilities.last_name_ev, utilities.az_pattern, utilities.last_name_bad, utilities.last_name_good, "last name", "The last name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                funcs.alert_message(utilities.last_name_bad, utilities.last_name_good, "", false);

            //email validation
            if (funcs.validate_check(utilities.email_ev, utilities.email_pattern, utilities.email_bad, utilities.email_good, "Email", "The Email should contain a valid email address from an Israeli academic institution (*.ac.il)"))
                is_valid = false;
            else if(utilities.email_ev.value.trim() in utilities.emails) {
                funcs.alert_message(utilities.email_bad, utilities.email_good, "The Email should be unique, one cannot record more than one user with same email.", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.email_bad, utilities.email_good, "", false);


            if(is_valid)
                funcs.next_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        }
        else
        {
            // password validation
            let add_length = ""
            if(utilities.password_ev.value.trim() && utilities.password_ev.value.trim().length<8)
                add_length = " <b>minimum eight characters<b>";

            if (funcs.validate_check(utilities.password_ev, utilities.password_pattern, utilities.password_bad, utilities.password_good, "password", "The password should only contain at least one uppercase letter(A-Z), one lowercase letter (a-z) and one digit."+add_length))
            {
                is_valid = false;

                // remove the valid password alert
                utilities.valid_password_good.classList.add('d-none');
                utilities.valid_password_bad.classList.add('d-none');
            } else if(add_length !== "") {
                funcs.alert_message(utilities.password_bad, utilities.password_good, add_length, true);
                is_valid = false;

                utilities.valid_password_good.classList.add('d-none');
                utilities.valid_password_bad.classList.add('d-none');
            } else {
                funcs.alert_message(utilities.password_bad, utilities.password_good, "", false);

                // valid password validation
                if(funcs.is_empty(utilities.confirm_password_ev, utilities.valid_password_bad, utilities.valid_password_good, "Valid password"))
                    is_valid = false;
                else if(utilities.confirm_password_ev.value.trim() !== utilities.password_ev.value.trim()) {
                    funcs.alert_message(utilities.valid_password_bad, utilities.valid_password_good, "The Valid password must match the first password field", true);
                    is_valid = false;
                } else
                    funcs.alert_message(utilities.valid_password_bad, utilities.valid_password_good, "", false);
            }

            // date validation
            if(funcs.is_empty(utilities.date_ev, utilities.date_bad, utilities.date_good, "date"))
                is_valid = false;
            else {
                if (!funcs.check_date())
                    is_valid = false;
            }

            // gender validation
            if(utilities.gender_ev.selectedIndex === 0) {
                funcs.alert_message(utilities.gender_bad, utilities.gender_good, "You must to choose your Gender!", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.gender_bad, utilities.gender_good, "", false);

            if(utilities.text_ev.value.trim().length > 100) {
                funcs.alert_message(utilities.comment_bad, "", "maximum of 100 characters", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.comment_bad, "", "", false);

            if(is_valid)
            {
                utilities.user_no_exist.classList.add("d-none");
                utilities.user_exist.classList.remove("d-none");

                funcs.add_email();

                funcs.reset_form();

                funcs.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
                funcs.reset_alerts();

                // sort the emails object
                funcs.sort_emails();
                //===============================

                funcs.add_scope();
            }
        }
    },
}
