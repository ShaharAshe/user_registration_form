
const funcs = {
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
    }
}



const main = {
    main_func(){
        const az_pattern = /^[a-z]+\s*$/;
        const email_pattern = /\S+@\S+ac\.il/;
        const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;


        const elem_next_none = document.querySelectorAll('div .next-clicked');
        const elem_prev_none = document.querySelectorAll('div .prev-clicked');

        const sub_next = document.querySelector("div .sub-next");

        const first_name_ev = document.getElementById("First-Name");
        const last_name_ev = document.getElementById("Last-Name");
        const email_ev = document.getElementById("Email");
        const password_ev = document.getElementById("Password");
        const confirm_password_ev = document.getElementById("Valid-Password");
        const date_ev = document.getElementById("Date-Of-Birth");
        const gender_ev = document.getElementById("Gender");
        const text_ev = document.querySelector("textarea");



        sub_next.addEventListener("click", function(){


            let is_valid = true;
            if (page_num === PAGE_1)
            {
                // first name validation
                if(!first_name_ev.value.trim()) {
                    funcs.alert_message(".bad-val-fu", ".good-val-fu", "The first name must not be empty", true);
                    is_valid = false;
                } else if(!az_pattern.test(first_name_ev.value.trim())) {
                    funcs.alert_message(".bad-val-fu", ".good-val-fu", "The first name should only contain alphabets (a-z)", true);
                    is_valid = false;
                }
                else {
                    funcs.alert_message(".bad-val-fu", ".good-val-fu", "", false);
                }

                // last name validation
                if(!last_name_ev.value.trim()) {
                    funcs.alert_message(".bad-val-lu", ".good-val-lu", "The last name must not be empty", true);
                    is_valid = false;
                } else if(!az_pattern.test(last_name_ev.value.trim())) {
                    funcs.alert_message(".bad-val-lu", ".good-val-lu", "The last name should only contain alphabets (a-z)", true);
                    is_valid = false;
                } else {
                    funcs.alert_message(".bad-val-lu", ".good-val-lu", "", false);
                }

                //email validation
                if(!email_ev.value.trim()) {
                    funcs.alert_message(".bad-val-eu", ".good-val-eu", "The Email must not be empty", true);
                    is_valid = false;
                } else if(email_ev.value.trim() in emails) {
                    funcs.alert_message(".bad-val-eu", ".good-val-eu", "The Email should be unique, one cannot record more than one user with same email.", true);
                    is_valid = false;
                } else if(!email_pattern.test(email_ev.value.trim())) {
                    funcs.alert_message(".bad-val-eu", ".good-val-eu", "The Email should contain a valid email address from an Israeli academic institution (*.ac.il)", true);
                    is_valid = false;
                } else {
                    funcs.alert_message(".bad-val-eu", ".good-val-eu", "", false);
                }

                if(is_valid)
                    funcs.next_click(elem_prev_none, elem_next_none, sub_next);
            }
            else
            {


                // password validation
                if(!password_ev.value.trim()) {
                    funcs.alert_message(".bad-val-pu", ".good-val-pu", "The password must not be empty", true);
                    is_valid = false;

                    document.querySelector(".good-val-vpu").classList.add('d-none');
                    document.querySelector(".bad-val-vpu").classList.add('d-none');
                } else if(!password_pattern.test(password_ev.value.trim())) {
                    let add_length = ""
                    if(password_ev.value.trim().length<8)
                        add_length = " <b>minimum eight characters<b>";

                    funcs.alert_message(".bad-val-pu", ".good-val-pu", "The password should only contain at least one uppercase letter(A-Z), one lowercase letter (a-z) and one digit."+add_length, true);
                    is_valid = false;

                    document.querySelector(".good-val-vpu").classList.add('d-none');
                    document.querySelector(".bad-val-vpu").classList.add('d-none');
                } else if(password_ev.value.trim().length<8) {
                    funcs.alert_message(".bad-val-pu", ".good-val-pu", "<b>minimum eight characters<b>", true);
                    is_valid = false;

                    document.querySelector(".good-val-vpu").classList.add('d-none');
                    document.querySelector(".bad-val-vpu").classList.add('d-none');
                } else {
                    funcs.alert_message(".bad-val-pu", ".good-val-pu", "", false);

                    // valid password validation
                    if(!confirm_password_ev.value.trim()) {
                        funcs.alert_message(".bad-val-vpu", ".good-val-vpu", "The Valid password must not be empty", true);
                        is_valid = false;
                    } else if(confirm_password_ev.value.trim() !== password_ev.value.trim()) {
                        funcs.alert_message(".bad-val-vpu", ".good-val-vpu", "The Valid password must match the first password field", true);
                        is_valid = false;
                    } else {
                        funcs.alert_message(".bad-val-vpu", ".good-val-vpu", "", false);
                    }
                }

                // date validation
                if(!date_ev.value.trim()) {
                    funcs.alert_message(".bad-val-du", ".good-val-du", "The date must not be empty", true);
                    is_valid = false;
                } else {
                    const dateObject = new Date(date_ev.value.trim()); // make date value
                    if (!isNaN(dateObject.getTime())/*check if the date input is valid*/)
                    {
                        const currentDate = new Date();
                        const userBirthDate = new Date(dateObject.getFullYear() + 18, dateObject.getMonth(), dateObject.getDate());
                        if (userBirthDate > currentDate)
                        {
                            funcs.alert_message(".bad-val-du", ".good-val-du", "The user date must be at least 18 years old", true);
                            is_valid = false
                        } else {
                            funcs.alert_message(".bad-val-du", ".good-val-du", "", false);
                        }
                    } else {
                        funcs.alert_message(".bad-val-du", ".good-val-du", "the date input is not valid", true);
                        is_valid = false
                    }
                }

                // gender validation
                if(gender_ev.selectedIndex === 0) {
                    funcs.alert_message(".bad-val-gu", ".good-val-gu", "You must to choose your Gender!", true);
                    is_valid = false;
                } else {
                    funcs.alert_message(".bad-val-gu", ".good-val-gu", "", false);
                }

                if(text_ev.value.trim().length > 100) {
                    funcs.alert_message(".bad-val-cu", "", "maximum of 100 characters", true);
                    is_valid = false;
                } else {
                    funcs.alert_message(".bad-val-cu", "", "", false);
                }

                if(is_valid)
                {
                    document.querySelector(".no-exist-u").classList.add("d-none");
                    document.querySelector(".exist-u").classList.remove("d-none");
                    emails[email_ev.value.trim()] = {
                        first_name: first_name_ev.value.trim(),
                        last_name: last_name_ev.value.trim(),
                        password: password_ev.value.trim(),
                        date: date_ev.value.trim(),
                        gender: genders[gender_ev.value.trim()-1],
                        text: text_ev.value.trim(),
                    };

                    email_ev.value = "";
                    first_name_ev.value = "";
                    last_name_ev.value = "";
                    password_ev.value = "";
                    confirm_password_ev.value = "";
                    date_ev.value = "";
                    gender_ev.selectedIndex = 0;
                    text_ev.value = "";

                    funcs.prev_click(elem_prev_none, elem_next_none, sub_next);
                    funcs.reset_alerts();

                    // sort the emails object
                    const sortedKeys = Object.keys(emails).sort();
                    const sortedObject = {};
                    sortedKeys.forEach(key => {
                        sortedObject[key] = emails[key];
                    });
                    emails = sortedObject;
                    //===============================

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
                }
            }
        })

        document.querySelector(".go-prev").addEventListener("click", function(){
            funcs.prev_click(elem_prev_none, elem_next_none, sub_next);
        })
    },
}