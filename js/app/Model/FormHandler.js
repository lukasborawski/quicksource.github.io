var FormHandler = {
    send : function($button, $form) {
        // load jquery ajax handler
        requirejs(["https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"], function () {
            // get form
            var form = $('.js-contact-from');
            // get url
            var formUrl = $form.getAttribute('data-form-url');
            // get form data
            var formData = form.serialize();
            // button state fn.
            var setButtonState = function($state) {
                // add success class
                $button.classList.add('fn-'+ $state +'');
                // set attribute
                $button.setAttribute('disabled', 'disabled');
                // time delay to unlock button
                setTimeout(function() {
                    // remove class
                    $button.classList.remove('fn-'+ $state +'');
                    // remove attribute
                    $button.removeAttribute('disabled');
                }, 2000);
            };
            // post method
            $.ajax({
                type: 'POST',
                url: formUrl,
                data: formData,
                dataType: 'json',
                success: function() {
                    // reset form on success
                    $form.reset();
                    // set success button state
                    setButtonState('success');
                }, 
                error: function() {
                    // set error button state
                    setButtonState('error');
                }
            });
        });
    }
}