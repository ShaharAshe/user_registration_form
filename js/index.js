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
 * @property {HTMLElement} go_prev - Button element for previous action.
 * @property {HTMLInputElement} first_name_ev - Input element for first name.
 * @property {HTMLInputElement} last_name_ev - Input element for last name.
 * @property {HTMLInputElement} email_ev - Input element for email.
 * @property {HTMLInputElement} password_ev - Input element for password.
 * @property {HTMLInputElement} confirm_password_ev - Input element for confirming password.
 * @property {HTMLInputElement} date_ev - Input element for date of birth.
 * @property {HTMLSelectElement} gender_ev - Select element for gender.
 * @property {HTMLTextAreaElement} text_ev - TextArea element for additional text input.
 * @property {HTMLElement} first_name_good - Good validation message for first name.
 * @property {HTMLElement} first_name_bad - Bad validation message for first name.
 * @property {HTMLElement} last_name_good - Good validation message for last name.
 * @property {HTMLElement} last_name_bad - Bad validation message for last name.
 * @property {HTMLElement} email_good - Good validation message for email.
 * @property {HTMLElement} email_bad - Bad validation message for email.
 * @property {HTMLElement} password_good - Good validation message for password.
 * @property {HTMLElement} password_bad - Bad validation message for password.
 * @property {HTMLElement} valid_password_good - Good validation message for valid password.
 * @property {HTMLElement} valid_password_bad - Bad validation message for valid password.
 * @property {HTMLElement} date_good - Good validation message for date.
 * @property {HTMLElement} date_bad - Bad validation message for date.
 * @property {HTMLElement} gender_good - Good validation message for gender.
 * @property {HTMLElement} gender_bad - Bad validation message for gender.
 * @property {HTMLElement} comment_bad - Bad validation message for additional text.
 * @property {HTMLElement} user_no_exist - Message for non-existing user.
 * @property {HTMLElement} user_exist - Message for existing user.
 */
const utilities = (function() {
    const PAGE_1 = 0;
    const emails = {};
    const page_num = 0;
    const genders = ["Male", "Female", "Other"];

    const az_pattern = /^[a-z]+\s*$/;
    const email_pattern = /\S+@\S+ac\.il/;
    const password_pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    const elem_next_none = document.querySelectorAll('div .next-clicked');
    const elem_prev_none = document.querySelectorAll('div .prev-clicked');

    const sub_next = document.querySelector("div .sub-next");
    const go_prev = document.querySelector("div .go-prev");

    const first_name_ev = document.getElementById("First-Name");
    const last_name_ev = document.getElementById("Last-Name");
    const email_ev = document.getElementById("Email");
    const password_ev = document.getElementById("Password");
    const confirm_password_ev = document.getElementById("Valid-Password");
    const date_ev = document.getElementById("Date-Of-Birth");
    const gender_ev = document.getElementById("Gender");
    const text_ev = document.querySelector("textarea");

    const first_name_good = document.querySelector("div .good-val-fu");
    const first_name_bad = document.querySelector("div .bad-val-fu");
    const last_name_good = document.querySelector("div .good-val-lu");
    const last_name_bad = document.querySelector("div .bad-val-lu");
    const email_good = document.querySelector("div .good-val-eu");
    const email_bad = document.querySelector("div .bad-val-eu");
    const password_good = document.querySelector("div .good-val-pu");
    const password_bad = document.querySelector("div .bad-val-pu");
    const valid_password_good = document.querySelector("div .good-val-vpu");
    const valid_password_bad = document.querySelector("div .bad-val-vpu");
    const date_good = document.querySelector("div .good-val-du");
    const date_bad = document.querySelector("div .bad-val-du");
    const gender_good = document.querySelector("div .good-val-gu");
    const gender_bad = document.querySelector("div .bad-val-gu");
    const comment_bad = document.querySelector("div .bad-val-cu");

    const user_no_exist = document.querySelector(".no-exist-u");
    const user_exist = document.querySelector(".exist-u");

    return {
        PAGE_1: PAGE_1,
        emails: emails,
        page_num: page_num,
        genders: genders,
        az_pattern: az_pattern,
        email_pattern: email_pattern,
        password_pattern: password_pattern,
        elem_next_none: elem_next_none,
        elem_prev_none: elem_prev_none,
        sub_next: sub_next,
        go_prev: go_prev,
        first_name_ev: first_name_ev,
        last_name_ev: last_name_ev,
        email_ev: email_ev,
        password_ev: password_ev,
        confirm_password_ev: confirm_password_ev,
        date_ev: date_ev,
        gender_ev: gender_ev,
        text_ev: text_ev,
        first_name_good: first_name_good,
        first_name_bad: first_name_bad,
        last_name_good: last_name_good,
        last_name_bad: last_name_bad,
        email_good: email_good,
        email_bad: email_bad,
        password_good: password_good,
        password_bad: password_bad,
        valid_password_good: valid_password_good,
        valid_password_bad: valid_password_bad,
        date_good: date_good,
        date_bad: date_bad,
        gender_good: gender_good,
        gender_bad: gender_bad,
        comment_bad: comment_bad,
        user_no_exist: user_no_exist,
        user_exist: user_exist,
    };
})()

// ===================================================================

/**
 * @namespace funcs
 * @description Contains utility functions for form validation and page navigation.
 * @property {Function} alert_message - Displays validation messages.
 * @property {Function} prev_click - Handles the 'previous' button click action.
 * @property {Function} next_click - Handles the 'next' button click action.
 * @property {Function} reset_alerts - Resets all validation messages.
 * @property {Function} is_empty - Checks if a given input is empty.
 * @property {Function} validate_check - Validates input based on a given pattern.
 * @property {Function} sort_emails - Sorts the 'emails' object alphabetically.
 * @property {Function} add_scope - Adds user data to the HTML table.
 * @property {Function} check_date - Validates the user's date of birth.
 * @property {Function} add_email - Adds user data to the 'emails' object.
 * @property {Function} reset_form - Resets the form fields.
 */
const funcs = (function (){
    return {
        /**
         * @function alert_message
         * @param {HTMLElement} bad_label - Element to display a bad validation message.
         * @param {HTMLElement} good_label - Element to display a good validation message.
         * @param {string} message - The validation message to be displayed.
         * @param {boolean} is_bad - Boolean indicating if the message is bad (true) or good (false).
         * @description Displays validation messages based on input parameters.
         */
        alert_message: function (bad_label, good_label, message, is_bad) {
            bad_label.innerHTML = message;

            if (is_bad) {
                bad_label.classList.remove("d-none")
                if (good_label !== "")
                    good_label.classList.add("d-none")
            } else {
                bad_label.classList.add("d-none")
                if (good_label !== "")
                    good_label.classList.remove("d-none")
            }
        },

        /**
         * @function prev_click
         * @param {NodeList} elem_prev_none - NodeList of elements with class 'prev-clicked'.
         * @param {NodeList} elem_next_none - NodeList of elements with class 'next-clicked'.
         * @param {HTMLElement} sub_next - Button element for next/submit action.
         * @description Handles the 'previous' button click action.
         */
        prev_click: function(elem_prev_none, elem_next_none, sub_next) {
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
         * @param {NodeList} elem_prev_none - NodeList of elements with class 'prev-clicked'.
         * @param {NodeList} elem_next_none - NodeList of elements with class 'next-clicked'.
         * @param {HTMLElement} sub_next - Button element for next/submit action.
         * @description Handles the 'next' button click action.
         */
        next_click: function(elem_prev_none, elem_next_none, sub_next) {
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
         * @description Resets all validation messages.
         */
        reset_alerts: function() {
            const alerts_banners = document.querySelectorAll('div .alert');

            alerts_banners.forEach(alert => {
                alert.classList.add('d-none');
            })
        },

        /**
         * @function is_empty
         * @param {HTMLInputElement} ev - The input element to be checked for emptiness.
         * @param {HTMLElement} bad - Element to display a bad validation message.
         * @param {HTMLElement} good - Element to display a good validation message.
         * @param {string} empty_field - The name of the field being checked.
         * @returns {boolean} Returns true if the input is empty, false otherwise.
         * @description Checks if a given input is empty.
         */
        is_empty: function(ev, bad, good, empty_field) {
            if (!ev.value.trim()) {
                this.alert_message(bad, good, "The " + empty_field + " must not be empty", true);
                return true;
            }
            return false;
        },

        /**
         * @function validate_check
         * @param {HTMLInputElement} ev - The input element to be validated.
         * @param {RegExp} pattern - Regular expression pattern for validation.
         * @param {HTMLElement} bad - Element to display a bad validation message.
         * @param {HTMLElement} good - Element to display a good validation message.
         * @param {string} empty_field - The name of the field being checked.
         * @param {string} pattern_msg - The message to be displayed if the pattern is not matched.
         * @returns {boolean} Returns true if validation fails, false otherwise.
         * @description Validates input based on a given pattern.
         */
        validate_check: function(ev, pattern, bad, good, empty_field, pattern_msg) {
            if (this.is_empty(ev, bad, good, empty_field))
                return true;
            if (!pattern.test(ev.value.trim())) {
                this.alert_message(bad, good, pattern_msg, true);
                return true;
            }
            return false;
        },

        /**
         * @function sort_users
         * @description Sorts the 'emails' object alphabetically by last_name.
         */
        sort_users: function() {
            // sort the emails object
            const emailsArray = Object.values(utilities.emails);
            emailsArray.sort((a, b) => a.last_name.localeCompare(b.last_name));

            const sortedObject = {}
            emailsArray.forEach(user => {
                // Assuming each email object has a unique identifier (e.g., email address)
                sortedObject[user.email_address] = user;
            });

            utilities.emails = sortedObject;
        },

        /**
         * @function add_scope
         * @description Adds user data to the HTML table.
         */
        add_scope: function() {
            let new_scope = "";
            let list = 0;

            for (const user in utilities.emails) {
                new_scope += "<tr>\n" +
                    "                    <th scope=\"row\">" + (++list).toString() + "</th>\n" +
                    "                    <td>" + utilities.emails[user].first_name + "</td>\n" +
                    "                    <td>" + utilities.emails[user].last_name + "</td>\n" +
                    "                    <td>" + user + "</td>\n" +
                    "                    <td>" + utilities.emails[user].password + "</td>\n" +
                    "                    <td>" + utilities.emails[user].date + "</td>\n" +
                    "                    <td>" + utilities.emails[user].gender + "</td>\n" +
                    "                    <td>" + utilities.emails[user].text + "</td>\n" +
                    "                </tr>";
            }
            document.querySelector("tbody").innerHTML = new_scope
        },

        /**
         * @function check_date
         * @returns {boolean} Returns true if the date is valid, false otherwise.
         * @description Validates the user's date of birth.
         */
        check_date: function() {
            const dateObject = new Date(utilities.date_ev.value.trim()); // make date value
            if (!isNaN(dateObject.getTime())/*check if the date input is valid*/) {
                const currentDate = new Date();
                const userBirthDate = new Date(dateObject.getFullYear() + 18, dateObject.getMonth(), dateObject.getDate());
                if (userBirthDate > currentDate) {
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

        /**
         * @function add_email
         * @description Adds user data to the 'emails' object.
         */
        add_email: function() {
            utilities.emails[utilities.email_ev.value.trim()] = {
                first_name: utilities.first_name_ev.value.trim(),
                last_name: utilities.last_name_ev.value.trim(),
                email_address: utilities.email_ev.value.trim(),
                password: utilities.password_ev.value.trim(),
                date: utilities.date_ev.value.trim(),
                gender: utilities.genders[utilities.gender_ev.value.trim() - 1],
                text: utilities.text_ev.value.trim(),
            };
        },

        /**
         * @function reset_form
         * @description Resets the form fields.
         */
        reset_form: function() {
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
})();

// ======================================================================

/**
 * @namespace main
 * @description Contains the main functionality for form navigation and submission.
 * @property {Function} main_func - Initializes event listeners for form navigation.
 * @property {Function} click_sub_next - Handles the 'next/submit' button click action.
 */
const main = {
    /**
     * @function main_func
     * @description Initializes event listeners for form navigation.
     */
    main_func() {
        utilities.sub_next.addEventListener("click", function () {
            main.click_sub_next()
        })

        utilities.go_prev.addEventListener("click", function () {
            funcs.prev_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        })
    },

    /**
     * @function click_sub_next
     * @description Handles the 'next/submit' button click action.
     */
    click_sub_next() {
        let is_valid = true;
        if (utilities.page_num === utilities.PAGE_1) {
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
            else if (utilities.email_ev.value.trim() in utilities.emails) {
                funcs.alert_message(utilities.email_bad, utilities.email_good, "The Email should be unique, one cannot record more than one user with same email.", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.email_bad, utilities.email_good, "", false);


            if (is_valid)
                funcs.next_click(utilities.elem_prev_none, utilities.elem_next_none, utilities.sub_next);
        } else {
            // password validation
            let add_length = ""
            if (utilities.password_ev.value.trim() && utilities.password_ev.value.trim().length < 8)
                add_length = " <b>minimum eight characters<b>";

            if (funcs.validate_check(utilities.password_ev, utilities.password_pattern, utilities.password_bad, utilities.password_good, "password", "The password should only contain at least one uppercase letter(A-Z), one lowercase letter (a-z) and one digit." + add_length)) {
                is_valid = false;

                // remove the valid password alert
                utilities.valid_password_good.classList.add('d-none');
                utilities.valid_password_bad.classList.add('d-none');
            } else if (add_length !== "") {
                funcs.alert_message(utilities.password_bad, utilities.password_good, add_length, true);
                is_valid = false;

                utilities.valid_password_good.classList.add('d-none');
                utilities.valid_password_bad.classList.add('d-none');
            } else {
                funcs.alert_message(utilities.password_bad, utilities.password_good, "", false);

                // valid password validation
                if (funcs.is_empty(utilities.confirm_password_ev, utilities.valid_password_bad, utilities.valid_password_good, "Valid password"))
                    is_valid = false;
                else if (utilities.confirm_password_ev.value.trim() !== utilities.password_ev.value.trim()) {
                    funcs.alert_message(utilities.valid_password_bad, utilities.valid_password_good, "The Valid password must match the first password field", true);
                    is_valid = false;
                } else
                    funcs.alert_message(utilities.valid_password_bad, utilities.valid_password_good, "", false);
            }

            // date validation
            if (funcs.is_empty(utilities.date_ev, utilities.date_bad, utilities.date_good, "date"))
                is_valid = false;
            else {
                if (!funcs.check_date())
                    is_valid = false;
            }

            // gender validation
            if (utilities.gender_ev.selectedIndex === 0) {
                funcs.alert_message(utilities.gender_bad, utilities.gender_good, "You must to choose your Gender!", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.gender_bad, utilities.gender_good, "", false);

            if (utilities.text_ev.value.trim().length > 100) {
                funcs.alert_message(utilities.comment_bad, "", "maximum of 100 characters", true);
                is_valid = false;
            } else
                funcs.alert_message(utilities.comment_bad, "", "", false);

            if (is_valid) {
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
