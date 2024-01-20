/**
 * @namespace utilities
 * @description Contains utility variables for the form and page functionality.
 * @property {number} PAGE_1 - Page number constant representing the first page.
 * @property {Object} emails - Object to store user data with email addresses as keys.
 * @property {number} page_num - Current page number.
 * @property {string[]} genders - Array of available gender options.
 * @property {RegExp} az_pattern - Regular expression for alphabetic input validation.
 * @property {RegExp} email_pattern - Regular expression for email input validation.
 * @property {RegExp} password_pattern - Regular expression for password input validation.
 * @property {NodeList} elem_next_none - NodeList of elements with class 'next-clicked'.
 * @property {NodeList} elem_prev_none - NodeList of elements with class 'prev-clicked'.
 * @property {HTMLElement} sub_next - Button element for next/submit action.
 * @property {HTMLInputElement} first_name_ev - Input element for first name.
 * @property {HTMLInputElement} last_name_ev - Input element for last name.
 * @property {HTMLInputElement} email_ev - Input element for email.
 * @property {HTMLInputElement} password_ev - Input element for password.
 * @property {HTMLInputElement} confirm_password_ev - Input element for confirming password.
 * @property {HTMLInputElement} date_ev - Input element for date of birth.
 * @property {HTMLSelectElement} gender_ev - Select element for gender.
 * @property {HTMLTextAreaElement} text_ev - TextArea element for additional text input.
 */
const utilities = {
    PAGE_1 : 0,
    emails : {},
    page_num : 0,
    genders : ["Male", "Female", "Other"],

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


// ===================================================================

/**
 * @namespace funcs
 * @description Contains utility functions for form validation and page navigation.
 * @property {Function} alert_message - Displays alert messages based on validation results.
 * @property {Function} prev_click - Handles the 'Previous' button click event.
 * @property {Function} next_click - Handles the 'Next' button click event.
 * @property {Function} reset_alerts - Resets all alert messages on the page.
 * @property {Function} is_empty - Checks if an input field is empty and displays an alert if true.
 * @property {Function} validate_check - Validates input based on a pattern and displays an alert if invalid.
 * @property {Function} sort_emails - Sorts the 'emails' object alphabetically by email address.
 * @property {Function} add_scope - Generates and adds HTML table rows based on user data.
 * @property {Function} check_date - Validates the entered date to be at least 18 years ago.
 * @property {Function} add_email - Adds user data to the 'emails' object.
 * @property {Function} reset_form - Resets all form input fields.
 */
const funcs = {
    /**
     * @function alert_message
     * @description Displays alert messages based on validation results.
     * @param {string} bad_label - Selector for the bad alert label.
     * @param {string} good_label - Selector for the good alert label.
     * @param {string} message - Alert message to display.
     * @param {boolean} is_bad - Indicates whether the message is an error (true) or success (false).
     */
    alert_message(bad_label, good_label, message, is_bad)
    {
        let name_alert = document.querySelector(bad_label);
        name_alert.innerHTML = message;

        if (is_bad)
        {
            name_alert.classList.remove("d-none")
            if(good_label !== "") {
                name_alert = document.querySelector(good_label);
                name_alert.classList.add("d-none")
            }
        }
        else
        {
            name_alert.classList.add("d-none")
            if(good_label !== "") {
                name_alert = document.querySelector(good_label);
                name_alert.classList.remove("d-none")
            }
        }
    },

    /**
     * @function prev_click
     * @description Handles the 'Previous' button click event.
     * @param {NodeList} elem_prev_none - NodeList of elements with class 'prev-clicked'.
     * @param {NodeList} elem_next_none - NodeList of elements with class 'next-clicked'.
     * @param {HTMLElement} sub_next - Button element for next/submit action.
     */
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

    /**
     * @function next_click
     * @description Handles the 'Next' button click event.
     * @param {NodeList} elem_prev_none - NodeList of elements with class 'prev-clicked'.
     * @param {NodeList} elem_next_none - NodeList of elements with class 'next-clicked'.
     * @param {HTMLElement} sub_next - Button element for next/submit action.
     */
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

    /**
     * @function reset_alerts
     * @description Resets all alert messages on the page.
     */
    reset_alerts()
    {
        const alerts_banners = document.querySelectorAll('div .alert');

        alerts_banners.forEach(alert =>{
            alert.classList.add('d-none');
        })
    },

    /**
     * @function is_empty
     * @description Checks if an input field is empty and displays an alert if true.
     * @param {HTMLInputElement} ev - Input element to check.
     * @param {string} bad - Selector for the bad alert label.
     * @param {string} good - Selector for the good alert label.
     * @param {string} empty_field - Name of the field being checked.
     * @returns {boolean} - Returns true if the field is empty, otherwise false.
     */
    is_empty(ev, bad, good, empty_field){
        if(!ev.value.trim()) {
            this.alert_message(bad, good, "The "+empty_field+" must not be empty", true);
            return true;
        }
        return false;
    },

    /**
     * @function validate_check
     * @description Validates input based on a pattern and displays an alert if invalid.
     * @param {HTMLInputElement} ev - Input element to validate.
     * @param {RegExp} pattern - Regular expression pattern for validation.
     * @param {string} bad - Selector for the bad alert label.
     * @param {string} good - Selector for the good alert label.
     * @param {string} empty_field - Name of the field being checked.
     * @param {string} pattern_msg - Alert message to display for pattern validation.
     * @returns {boolean} - Returns true if validation fails, otherwise false.
     */
    validate_check(ev, pattern, bad, good, empty_field, pattern_msg){
        if(this.is_empty(ev, bad, good, empty_field))
            return true;
        if(!pattern.test(ev.value.trim())) {
            this.alert_message(bad, good, pattern_msg, true);
            return true;
        }
        return false;
    },

    /**
     * @function sort_emails
     * @description Sorts the 'emails' object alphabetically by email address.
     */
    sort_emails(){
        // sort the emails object
        const sortedKeys = Object.keys(utilities.emails).sort();
        const sortedObject = {};
        sortedKeys.forEach(key => {
            sortedObject[key] = utilities.emails[key];
        });
        utilities.emails = sortedObject;
    },

    /**
     * @function add_scope
     * @description Generates and adds HTML table rows based on user data.
     */
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

    /**
     * @function check_date
     * @description Validates the entered date to be at least 18 years ago.
     * @returns {boolean} - Returns true if date is valid, otherwise false.
     */
    check_date(){
        const dateObject = new Date(utilities.date_ev.value.trim()); // make date value
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

    /**
     * @function add_email
     * @description Adds user data to the 'emails' object.
     */
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

    /**
     * @function reset_form
     * @description Resets all form input fields.
     */
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

/**
 * @namespace main
 * @description Contains the main functionality for handling button click events.
 * @property {Function} main_func - Initializes event listeners for the form and page navigation.
 * @property {Function} click_sub_next - Handles the 'Next/Submit' button click event.
 */
const main = {
    /**
     * @function main_func
     * @description Initializes event listeners for the form and page navigation.
     */
    main_func(){
        utilities.sub_next.addEventListener("click", function() {main.click_sub_next()})

        document.querySelector(".go-prev").addEventListener("click", function(){
            funcs.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        })
    },

    /**
     * @function click_sub_next
     * @description Handles the 'Next/Submit' button click event.
     */
    click_sub_next(){
        let is_valid = true;
        if (utilities.page_num === utilities.PAGE_1)
        {
            // first name validation
            if (funcs.validate_check(utilities.first_name_ev, utilities.az_pattern, ".bad-val-fu", ".good-val-fu", "first name", "The first name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                funcs.alert_message(".bad-val-fu", ".good-val-fu", "", false);

            // last name validation
            if (funcs.validate_check(utilities.last_name_ev, utilities.az_pattern, ".bad-val-lu", ".good-val-lu", "last name", "The last name should only contain alphabets (a-z)"))
                is_valid = false;
            else
                funcs.alert_message(".bad-val-lu", ".good-val-lu", "", false);

            //email validation
            if (funcs.validate_check(utilities.email_ev, utilities.email_pattern, ".bad-val-eu", ".good-val-eu", "Email", "The Email should contain a valid email address from an Israeli academic institution (*.ac.il)"))
                is_valid = false;
            else if(utilities.email_ev.value.trim() in utilities.emails) {
                funcs.alert_message(".bad-val-eu", ".good-val-eu", "The Email should be unique, one cannot record more than one user with same email.", true);
                is_valid = false;
            } else
                funcs.alert_message(".bad-val-eu", ".good-val-eu", "", false);


            if(is_valid)
                funcs.next_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        }
        else
        {
            // password validation
            let add_length = ""
            if(utilities.password_ev.value.trim() && utilities.password_ev.value.trim().length<8)
                add_length = " <b>minimum eight characters<b>";

            if (funcs.validate_check(utilities.password_ev, utilities.password_pattern, ".bad-val-pu", ".good-val-pu", "password", "The password should only contain at least one uppercase letter(A-Z), one lowercase letter (a-z) and one digit."+add_length))
            {
                is_valid = false;

                // remove the valid password alert
                document.querySelector(".good-val-vpu").classList.add('d-none');
                document.querySelector(".bad-val-vpu").classList.add('d-none');
            } else if(add_length !== "") {
                funcs.alert_message(".bad-val-pu", ".good-val-pu", add_length, true);
                is_valid = false;

                document.querySelector(".good-val-vpu").classList.add('d-none');
                document.querySelector(".bad-val-vpu").classList.add('d-none');
            } else {
                funcs.alert_message(".bad-val-pu", ".good-val-pu", "", false);

                // valid password validation
                if(funcs.is_empty(utilities.confirm_password_ev, ".bad-val-vpu", ".good-val-vpu", "Valid password"))
                    is_valid = false;
                else if(utilities.confirm_password_ev.value.trim() !== utilities.password_ev.value.trim()) {
                    funcs.alert_message(".bad-val-vpu", ".good-val-vpu", "The Valid password must match the first password field", true);
                    is_valid = false;
                } else
                    funcs.alert_message(".bad-val-vpu", ".good-val-vpu", "", false);
            }

            // date validation
            if(funcs.is_empty(utilities.date_ev, ".bad-val-du", ".good-val-du", "date"))
                is_valid = false;
            else {
                if (!funcs.check_date())
                    is_valid = false;
            }

            // gender validation
            if(utilities.gender_ev.selectedIndex === 0) {
                funcs.alert_message(".bad-val-gu", ".good-val-gu", "You must to choose your Gender!", true);
                is_valid = false;
            } else
                funcs.alert_message(".bad-val-gu", ".good-val-gu", "", false);

            if(utilities.text_ev.value.trim().length > 100) {
                funcs.alert_message(".bad-val-cu", "", "maximum of 100 characters", true);
                is_valid = false;
            } else
                funcs.alert_message(".bad-val-cu", "", "", false);

            if(is_valid)
            {
                document.querySelector(".no-exist-u").classList.add("d-none");
                document.querySelector(".exist-u").classList.remove("d-none");

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
