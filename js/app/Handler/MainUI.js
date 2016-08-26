define(["global", "params"], function(global, params) {
    // get viewport width
    var viewportWidth = window.outerWidth;
    /*
     pageloader
     ------------------------------------
     */
    DocumentReady(function() {
        // get body
        var body = document.querySelector('body');
        // get page loader
        var loader = document.querySelector('.js-page-loader');
        // unlock page
        body.classList.remove('fn-locked');
        // hide loader
        loader.classList.add('fn-loaded');
    });
    /*
     navigation anchors
     ------------------------------------
     */
    var NavigationAnchor = document.querySelectorAll('.js-navigation-anchor');
    // iterate over each navigation button
    [].forEach.call(NavigationAnchor, function(el, _) {
        // click event
        el.addEventListener('click', function() {
            // get anchor target
            var anchorTarget = el.getAttribute('data-target');
            // get corresponded element
            var elementTarget = document.getElementById(anchorTarget);
            // get offset of element
            var elementTargetOffset = elementTarget.offsetTop;
            // scroll to element
            window.scrollTo(0, elementTargetOffset);
        });
    });
    /*
     contact form
     ------------------------------------
     */
    // get contact form
    var ContactForm = document.querySelector('.js-contact-from');
    // get contact form submit
    var ContactFormSubmit = document.querySelector('.js-contact-form-submit');
    // form submit exist depd
    if (ContactFormSubmit !== null && ContactFormSubmit.length !== 0) {
        // submit event
        ContactFormSubmit.addEventListener('click', function () {
            // get scope operator
            var t = this;
            // get contact form fields
            var ContactFormField = ContactForm.querySelectorAll('input, textarea');
            // set form flag
            var formFlag = [];
            // iterate over each form field
            [].forEach.call(ContactFormField, function (el, _) {
                // set field error fn.
                var fieldError = function () {
                    // add bouncing class
                    el.classList.add('fn-bouncing');
                    // set time delay to remove class
                    setTimeout(function () {
                        // remove bouncing class
                        el.classList.remove('fn-bouncing');
                    }, 500);
                }
                // get required value
                var fieldRequiredValue = el.getAttribute('required');
                // get field name
                var fieldName = el.getAttribute('name');
                // get field value
                var fieldValue = el.value;
                // required and data values depd
                if (fieldRequiredValue == 'true' && (fieldValue != '' && fieldValue != null)) {
                    // email field content depd
                    if (fieldName == 'email' && fieldValue.indexOf('@') !== -1) {
                        // update form flag array
                        formFlag.push('true');
                    } else if (fieldName != 'email') {
                        // update form flag array
                        formFlag.push('true');
                    } else {
                        // update form flag array
                        formFlag.push('false');
                        // return field error
                        fieldError();
                    }
                } else if (fieldRequiredValue == 'true' && (fieldValue == '' || fieldValue == null)) {
                    // update form flag array
                    formFlag.push('false');
                    // return field error
                    fieldError();
                }
            });
            // form flag depd
            if (!isInArray('false', formFlag)) {
                // load form handler 
                requirejs(["FormHandler"], function () {
                    FormHandler.send(t, ContactForm);
                });
            }
        });
    }
});