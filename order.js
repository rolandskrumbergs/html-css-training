document.addEventListener("DOMContentLoaded", function(event) { 

    document.querySelector('#order-form-button').addEventListener('click', sendOrder);

    var bookData = getbookData();

    var book1amount = parseInt(sessionStorage.getItem("book1"));
    var book2amount = parseInt(sessionStorage.getItem("book2"));
    var book3amount = parseInt(sessionStorage.getItem("book3"));

    var total = 0;

    if (book1amount && book1amount > 0) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(bookData.book1.name +  " (" + book1amount  + ")"));
        document.querySelector('#order-details-list').appendChild(li);
        total += book1amount * bookData.book1.price;
    }
   
    if (book2amount && book2amount > 0) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(bookData.book2.name +  " (" + book2amount  + ")"));
        document.querySelector('#order-details-list').appendChild(li);
        total += book2amount * bookData.book2.price;
    }

    if (book3amount && book3amount > 0) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(bookData.book3.name +  " (" + book3amount  + ")"));
        document.querySelector('#order-details-list').appendChild(li);
        total += book3amount * bookData.book3.price;
    }

    var totalSumElement = document.querySelector('#total-sum');
    if (totalSumElement) {
        totalSumElement.innerText = total;
    }
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

function sendOrder(event) {

    event.preventDefault();

    var name = document.querySelector('#order-form-name').value;
    var email = document.querySelector('#order-form-email').value;
    var billingAddress = document.querySelector('#order-form-address').value;

    var book1amount = parseInt(sessionStorage.getItem("book1"));
    var book2amount = parseInt(sessionStorage.getItem("book2"));
    var book3amount = parseInt(sessionStorage.getItem("book3"));

    var order = {
        "name": name,
        "email": email,
        "billingAddress": billingAddress,
        "book1": book1amount,
        "book2": book2amount,
        "book3": book3amount       
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                document.querySelector('#order-form-name').innerText = '';
                document.querySelector('#order-form-email').innerText = '';
                document.querySelector('#order-form-address').innerText = '';
                alert(this.responseText);
                window.location.href = "index.html";
            }
            else {
                alert("Error sending order! Please try again.");
            }
        }
    };
    xhttp.open("POST", "https://talmacibas-centrs-web.azurewebsites.net/order", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(order));
}