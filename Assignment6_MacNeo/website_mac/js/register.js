
(function () {
    'use strict';

    var form = document.getElementById('registerForm');
    if (!form) {
        return;
    }

    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var successBox = document.getElementById('registerSuccess');

   
    function syncPasswordState() {
        if (!password || !confirmPassword) {
            return;
        }

        var feedback = confirmPassword.parentElement.querySelector('.invalid-feedback');
        var confirmValue = confirmPassword.value;
        var mismatch = confirmValue !== '' && confirmValue !== password.value;
        var tooShort = confirmValue !== '' && confirmValue.length < 8;

        if (mismatch) {
            confirmPassword.setCustomValidity('The passwords do not match.');
            if (feedback) {
                feedback.textContent = 'The passwords do not match.';
            }
        } else if (tooShort) {
           
            confirmPassword.setCustomValidity('');
            if (feedback) {
                feedback.textContent = 'The password must be at least 8 characters.';
            }
        } else {
           
            confirmPassword.setCustomValidity('');
            if (feedback) {
                feedback.textContent = 'Please confirm your password.';
            }
        }
    }

    if (password && confirmPassword) {
        password.addEventListener('input', syncPasswordState);
        confirmPassword.addEventListener('input', syncPasswordState);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        syncPasswordState();

        if (!form.checkValidity()) {
            form.classList.add('was-validated');

            if (successBox) {
                successBox.hidden = true;
            }

            var firstInvalid = form.querySelector(':invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            return;
        }

        form.classList.add('was-validated');

        if (successBox) {
            successBox.hidden = false;
            successBox.focus();
        }
    });

   
    form.addEventListener('reset', function () {
        if (confirmPassword) {
            confirmPassword.setCustomValidity('');
        }

        form.classList.remove('was-validated');

        if (successBox) {
            successBox.hidden = true;
        }

        syncPasswordState();
    });
})();
