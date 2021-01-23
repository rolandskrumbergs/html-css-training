$(document).ready(function () {

    $('.popup button').click(hideLoading)

    setTimeout(showLoading, 5000);
});

function showLoading() {
    var isSet = readCookie('closed-popup');
    if (isSet !== "1") {
        $('.popup').css("visibility", "visible");
        $('.popup').css("opacity", 1);
    }
}

function hideLoading() {
    $('.popup').css("visibility", "hidden");
    $('.popup').css("opacity", 0);
    createCookie('closed-popup', 1, 1);
}

// Šo var pārnest uz jquery.cookie.js
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