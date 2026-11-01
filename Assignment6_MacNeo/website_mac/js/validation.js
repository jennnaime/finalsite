
(function () {
    'use strict';

    var form = document.getElementById('contactForm');
    if (!form) {
        return;
    }

    var successBox = document.getElementById('contactSuccess');
    var messageField = document.getElementById('message');
    var messageCounter = document.getElementById('messageCount');

   
    function updateCounter() {
        if (!messageField || !messageCounter) {
            return;
        }

        var length = messageField.value.length;
        messageCounter.textContent = length + ' / 500 characters';

        var outOfRange = length > 0 && (length < 10 || length > 500);
        messageCounter.classList.toggle('is-error', outOfRange);
    }

    if (messageField) {
        messageField.addEventListener('input', updateCounter);
        updateCounter();
    }

    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

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
        form.classList.remove('was-validated');

        if (successBox) {
            successBox.hidden = true;
        }

        updateCounter();
    });
})();
