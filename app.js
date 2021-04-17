// document - globāls objekts, kas pieejams Javascript kodā, apzīmē mūsu mājaslapas dokumentu

// Pievienojam funkciju, kas izpildas, kad visa lapa ir ielādējusies
// Izmanto, lai pārliecinātos, ka visi elementi ir pieejami
document.addEventListener("DOMContentLoaded", function(event) { 

    // setTimeout(funkcija, laiks) --> funkcija, kas izpilda citu funkciju pēc konkrēta laika sprīža

    // Lai popup elements parādās pēc 5s
    setTimeout(show, 5000);

    // addEventListener(notikums, funkcija) --> izpilda funkciju, ja notiek notikums 
    // (piemēram, click, hover, mousedown) 

    // Pazūd, ja aizveram
    document
        .querySelector('.popup button') // Izvēlamies elementu
        .addEventListener('click', hide); // Pieliekam funkciju, kas izpildīsies ja uz elementa noklikšķina

});

// Funkcija, lai parādītu popup elementu
function show() {
    // Izvēlamies konkrēto elementu
    var elementToShow = document.querySelector('.popup');

    // Nolasām sīkdatnes vērtību
    var closedPopup = readCookie('closed-popup');

    // ja ir vērtība un tā nav yes, tad mēs parādām popup elementu
    if (closedPopup != 'yes') {
        elementToShow.style.visibility = 'visible';
        elementToShow.style.opacity = 1;
    }
}

// Funkcija, lai paslēptu popup elementu
function hide() {
    // Izvēlamies konkrēto elementu
    var elementToHide = document.querySelector('.popup');

    // Uzstādam CSS atribūtus - visibility un opacity
    elementToHide.style.visibility = 'hidden';
    elementToHide.style.opacity = 0;

    // Izveidojam sīkdatni, lai norādītu, ka aizvērām
    createCookie('closed-popup', 'yes', 5);
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