        // JavaScript para mostrar mensaje después de enviar el formulario
        const form = document.getElementById('contact-form');
        const mensajeDiv = document.getElementById('message');

        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evitar el envío del formulario por defecto

            const formData = new FormData(form);

            try {
                const response = await fetch('/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    messageDiv.textContent = '¡Message sent Succesfully!';
                    messageDiv.style.color = 'green';
                } else {
                    messageDiv.textContent = 'Error to sent Message!';
                    messageDiv.style.color = 'red';
                }
            } catch (error) {
                messageDiv.textContent = 'Error in sending the From, contact the System Administrator.';
                messageDiv.style.color = 'red';
            }
        });
