// 1. Jāizgūst dati no laukiem

// 2. Izveidot XMLHttpRequest objektu

// 3. Nosūtīt datus uz servisu

// 4. Apstrādāt atbildi
    // 4a - OK - Uz ekrāna izvadīsim paziņojumu, ka "Pieprasījums veiksmīgi nosūtīts!"
    // 4b - FAIL - Uz ekrāna izvadīsim paziņojumu, kura saturs būs kļūdas teksts


    document.addEventListener('DOMContentLoaded', function(event) {

        document.getElementById('contact-form-button').addEventListener('click', function(event) {
            
            event.preventDefault();
    
            var name = document.getElementById('contact-form-name').value;
            var email = document.getElementById('contact-form-email').value;
            var subject = document.getElementById('contact-form-subject').value;
            var message = document.getElementById('contact-form-message').value;
    
            sendData(name, email, subject, message);
    
        });
        
    });
    
    function sendData(name, email, subject, message) {
    
        var dataToSend = {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message
          };
    
        var request = new XMLHttpRequest();
    
        // Funkcija, kas apstrādās rezultātu
    
        request.onreadystatechange = function () {
    
            if (this.readyState == 4) {
                if (this.status == 200) {
                    alert("Pieprasījums veiksmīgi nosūtīts");
                }
                else {
                    alert(this.responseText);
                }
            }
    
        }
    
        // Atvērt savienojumu sūtīšanai
        // GET, POST, PUT, DELETE, HEAD
        request.open("POST", "https://talmacibas-centrs-web.azurewebsites.net/ContactMe", true);
    
        // Ja nepieciešams, uzstādīt HTTP headerus
        request.setRequestHeader("Content-Type", "application/json")
        
        // Veikt pašu sūtīšanu
        request.send(JSON.stringify(dataToSend));
    }
    
    