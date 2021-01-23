// Izpildīsim funkciju, kad visa lapa ir ielādējusies
document.addEventListener('DOMContentLoaded', function(event) {

    setTimeout(showPopup, 3000);

    document.querySelector('.popup-content > button').addEventListener('click', hidePopup);

});

function getPopupElement() {
    return document.getElementsByClassName('popup')[0];
}

function hidePopup() {

    // Atrast elementu, ko gribam paslēpt
    // Izmainīsim CSS, lai paslēptu:
        // visilibity = hidden
        // opacity = 0

    var popup = getPopupElement();

    popup.style.visibility = 'hidden';
    
    popup.style.opacity = 0;

    // Saglabājam kaut kur vērtību, ka klients ir aizvēris mūsu logu
    //createCookie('popup-closed', 'yes', 1);
    
    window.sessionStorage.setItem('popup-closed', 'yes')
}

function showPopup() {

    //var popupCookie = readCookie('popup-closed');
    var popupCookie = window.sessionStorage.getItem('popup-closed')

    if (popupCookie && popupCookie === 'yes') {
        return;
    }

    // Atrast elementu, ko gribam parādīt
    // Izmainīsim CSS, lai parādītu:
        // visilibity = visible
        // opacity = 1

        var popup = getPopupElement();

        popup.style.visibility = 'visible';
        popup.style.opacity = 1;

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