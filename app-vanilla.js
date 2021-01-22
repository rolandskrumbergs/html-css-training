document.addEventListener("DOMContentLoaded", function(event) { 
    
    document.querySelector('.popup button').addEventListener('click', hideLoading);
    
    setTimeout(showLoading, 5000);

    document.getElementById('contact-form-button').addEventListener('click', function(event) {

        event.preventDefault();

        var name = document.getElementById('contact-form-name').value;
        var surname = document.getElementById('contact-form-surname').value;
        var subject = document.getElementById('contact-form-subject').value;
        var message = document.getElementById('contact-form-message').value;

        sendData(name, surname, subject, message);

    });

  });

function sendData(name, surname, subject, message) {
    
    var dataToSend = {
        "name": name,
        "email": surname,
        "subject": subject,
        "message": message
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert("Paldies, tavs jautājums ir nosūtīts!");
            // TO DO: šo vajag aizstāt ar feedbacku
        }
    };
    xhttp.open("POST", "https://talmacibas-centrs-web.azurewebsites.net/ContactMe", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dataToSend));
}

function showLoading() {
    var isSet = readCookie('closed-popup');
    if (isSet !== "1") {
        document.querySelector('.popup').style.visibility = 'visible';
        document.querySelector('.popup').style.opacity = 1;
    }
}

function hideLoading() {

    document.querySelector('.popup').style.visibility = 'hidden';
    document.querySelector('.popup').style.opacity = 0;

    createCookie('closed-popup', 1, 1);
}

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}