'use strict'

document.addEventListener(`DOMContentLoaded`, function () {
    const form = document.getElementById('form-comment');
    form.addEventListener('submit', formSend);

    console.log(form);
    async function formSend (e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);

        if (error === 0) {
            $(document).ready(function() {

                //E-mail Ajax Send
                $("form").submit(function() { //Change
                    var th = $(this);
                    $.ajax({
                        type: "POST",
                        url: "mail.php", //Change
                        data: th.serialize()
                    }).done(function() {
                        alert("Ваша заявка надіслана, очікуйте на дзвінок!");
                        setTimeout(function() {
                            // Done Functions
                            th.trigger("reset");
                        }, 1000);
                    });
                    return false;
                });

            });
        } else {
            alert('Заповніть будь ласка всі поля)');
        }

    }

    function formValidate (form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.value === '') {
                formAddError(input);
                error++;
            }
        }
        return error
    }


    function formAddError (input) {
        input.parentElement.classList.add('._error');
        input.classList.add('._error')
    }
    function formRemoveError (input) {
        input.parentElement.classList.remove('._error');
        input.classList.remove('._error')
    }
})

















