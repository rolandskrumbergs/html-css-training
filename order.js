$(document).ready(function () {

    $('#book-section-button').click(navigateToBookOrder);
    $('#order-form-button').click(sendOrder);

    $(".book-checkbox-container input").change(function() {
        if(this.checked) {
            $(this).parent().parent().find(".book-amount-container").css("visibility", "visible");
        } else {
            $(this).parent().parent().find(".book-amount-container").css("visibility", "hidden");
        }
      });

    var bookData = getbookData();

    $("#book1title").text(bookData.book1.name);
    $("#book2title").text(bookData.book2.name);
    $("#book3title").text(bookData.book3.name);

    $("#book1price").text(bookData.book1.price);
    $("#book2price").text(bookData.book2.price);
    $("#book3price").text(bookData.book3.price);

    var book1amount = parseInt(sessionStorage.getItem("book1"));
    var book2amount = parseInt(sessionStorage.getItem("book2"));
    var book3amount = parseInt(sessionStorage.getItem("book3"));

    var total = 0;

    if (book1amount && book1amount > 0) {
        var newElement = "<li>" + bookData.book1.name +  " (" + book1amount  + ")" + "</li>";
        $("#order-details-list").append(newElement);
        total += book1amount * bookData.book1.price;
    }
   
    if (book2amount && book2amount > 0) {
        var newElement = "<li>" + bookData.book2.name +  " (" + book2amount  + ")" + "</li>";
        $("#order-details-list").append(newElement);
        total += book2amount * bookData.book2.price;
    }

    if (book3amount && book3amount > 0) {
        var newElement = "<li>" + bookData.book3.name +  " (" + book3amount  + ")" + "</li>";
        $("#order-details-list").append(newElement);
        total += book3amount * bookData.book3.price;
    }

    $("#total-sum").text(total);

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

    if ($('#book1').prop("checked")) {
        book1Amount = parseInt($("#book1amount").val());
    }
    if ($('#book2').prop("checked")) {
        book2Amount = parseInt($("#book2amount").val());
    }
    if ($('#book3').prop("checked")) {
        book3Amount = parseInt($("#book3amount").val());
    }

    var book1Price = parseInt($("#book1price").text());
    var book2Price = parseInt($("#book2price").text());
    var book3Price = parseInt($("#book3price").text());

    var total = book1Amount * book1Price + book2Amount * book2Price + book3Amount * book3Price;

    sessionStorage.setItem("book1", book1Amount);
    sessionStorage.setItem("book2", book2Amount);
    sessionStorage.setItem("book3", book3Amount);
    sessionStorage.setItem("total", total);

    window.location.href = "order.html";
}

function sendOrder(event) {

    event.preventDefault();

    var name = $("#order-form-name").val();
    var email = $("#order-form-email").val();
    var billingAddress = $("#order-form-address").val();

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

    // Try also sending form as form POST and add hidden fields

    $.post("https://talmacibas-centrs-web.azurewebsites.net/orders", order)
        .done(function (data) {
            $("#order-form-name").val("");
            $("#order-form-email").val("");
            $("#order-form-address").val("");
            alert(data);
            window.location.href = "index.html";
        })
        .fail(function () {
            alert("Error sending order! Please try again.");
        });
}