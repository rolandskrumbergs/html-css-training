document.addEventListener("DOMContentLoaded", function(event) { 

    document.querySelector('#book-section-button').addEventListener('click', navigateToBookOrder);

    var bookCheckboxes = document.querySelectorAll('.book-checkbox-container input');

    bookCheckboxes.forEach(function(item) {
        item.addEventListener('change', function() {
            if(this.checked) {
                this.parentElement.parentElement.querySelector('.book-amount-container').style.visibility = 'visible';
            } else {
                this.parentElement.parentElement.querySelector('.book-amount-container').style.visibility = 'hidden';
            }
        });
    });

    var bookData = getbookData();

    document.querySelector('#book1title').innerText = bookData.book1.name;
    document.querySelector('#book2title').innerText = bookData.book2.name;
    document.querySelector('#book3title').innerText = bookData.book3.name;

    document.querySelector('#book1price').innerText = bookData.book1.price;
    document.querySelector('#book2price').innerText = bookData.book2.price;
    document.querySelector('#book3price').innerText = bookData.book3.price;
});

function getbookData() {
    return {
        "book1": {
            "price": 20,
            "name": "Book 1"
        },
        "book2": {
            "price": 10,
            "name": "Book 2"
        },
        "book3": {
            "price": 30,
            "name": "Book 3"
        },
    }
}

function navigateToBookOrder() {

    var book1Amount = 0;
    var book2Amount = 0;
    var book3Amount = 0;

    if (document.querySelector('#book1').checked) {
        book1Amount = parseInt(document.querySelector('#book1amount').value);
    }
    if (document.querySelector('#book2').checked) {
        book2Amount = parseInt(document.querySelector('#book2amount').value);
    }
    if (document.querySelector('#book3').checked) {
        book3Amount = parseInt(document.querySelector('#book3amount').value);
    }

    var book1Price = parseInt(document.querySelector('#book1price').innerText);
    var book2Price = parseInt(document.querySelector('#book2price').innerText);
    var book3Price = parseInt(document.querySelector('#book3price').innerText);

    var total = book1Amount * book1Price + book2Amount * book2Price + book3Amount * book3Price;

    sessionStorage.setItem("book1", book1Amount);
    sessionStorage.setItem("book2", book2Amount);
    sessionStorage.setItem("book3", book3Amount);
    sessionStorage.setItem("total", total);

    window.location.href = "order.html";
}