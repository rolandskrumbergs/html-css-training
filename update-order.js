document.addEventListener("DOMContentLoaded", function(event) { 

    var orderButton = document.querySelector('#order-form-button');

    var id = getIdFromQueryString();
    if (id) {
        orderButton.innerText = "Update";
        orderButton.addEventListener('click', updateOrder);

        prefillData(id);

    } else {
        orderButton.innerText = "Add";
        orderButton.addEventListener('click', addOrder);
    }

    

    var existingOrder = getOrderById(id);

    if (existingOrder) {
    
        document.getElementById('order-form-name').value = existingOrder.name;
        document.getElementById('order-form-email').value = existingOrder.email;
        document.getElementById('order-form-address').value = existingOrder.address;
        document.getElementById('order-form-book-1-amount').value = existingOrder.firstBookAmount;
        document.getElementById('order-form-book-2-amount').value = existingOrder.secondBookAmount;
        document.getElementById('order-form-book-3-amount').value = existingOrder.thirdBookAmount;
        if (existingOrder.priority) {
            document.getElementById('order-form-priority').checked = true;
        }
        
        var selectOptions = document.querySelectorAll('#order-form-status option');
        selectOptions.forEach(element => {
            if (element.innerText === existingOrder.status) {
                element.selected = true;
            }
        });

    } else {
        if (id) {
            alert("Order not found!");
        }
    }


});

function addOrder(event) {

    event.preventDefault();

    var statusSelect = document.getElementById("order-form-status");
    var status = statusSelect.options[statusSelect.selectedIndex].text;

    var dataToSend = {
        "name": document.getElementById('order-form-name').value,
        "email": document.getElementById('order-form-email').value,
        "address": document.getElementById('order-form-address').value,
        "firstBookAmount": parseInt(document.getElementById('order-form-book-1-amount').value),
        "secondBookAmount": parseInt(document.getElementById('order-form-book-2-amount').value),
        "thirdBookAmount": parseInt(document.getElementById('order-form-book-3-amount').value),
        "priority": document.getElementById('order-form-priority').checked,
        "status": status,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status > 200 && this.status < 300) {
                window.location.href = "orders.html";
            }
            else {
                alert(this.responseText);
            }
        }
    };
    xhttp.open("POST", "https://localhost:44375/api/orders", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dataToSend));
}

function updateOrder(event) {

    event.preventDefault();

    var id = getIdFromQueryString();

    var statusSelect = document.getElementById("order-form-status");
    var status = statusSelect.options[statusSelect.selectedIndex].text;

    var dataToSend = {
        "id": id,
        "name": document.getElementById('order-form-name').value,
        "email": document.getElementById('order-form-email').value,
        "address": document.getElementById('order-form-address').value,
        "firstBookAmount": parseInt(document.getElementById('order-form-book-1-amount').value),
        "secondBookAmount": parseInt(document.getElementById('order-form-book-2-amount').value),
        "thirdBookAmount": parseInt(document.getElementById('order-form-book-3-amount').value),
        "priority": document.getElementById('order-form-priority').checked,
        "status": status,
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status > 200 && this.status < 300) {
                window.location.href = "orders.html";
            }
            else {
                alert(this.responseText);
            }
        }
    };
    xhttp.open("PUT", "https://localhost:44375/api/orders/" + id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(dataToSend));
}

function getIdFromQueryString() {
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    return id;
}

function prefillData(id) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                var order = JSON.parse(this.responseText);
                
                document.getElementById('order-form-name').value = order.name;
                document.getElementById('order-form-email').value = order.email;
                document.getElementById('order-form-address').value = order.address;
                document.getElementById('order-form-book-1-amount').value = order.firstBookAmount;
                document.getElementById('order-form-book-2-amount').value = order.secondBookAmount;
                document.getElementById('order-form-book-3-amount').value = order.thirdBookAmount;
                if (order.priority) {
                    document.getElementById('order-form-priority').checked = true;
                }
                
                var selectOptions = document.querySelectorAll('#order-form-status option');
                selectOptions.forEach(element => {
                    if (element.innerText === order.status) {
                        element.selected = true;
                    }
                });
            }
            else {
                alert(this.responseText);
            }
        }
    };
    xhttp.open("Get", "https://localhost:44375/api/orders/" + id, true);
    xhttp.send(); 

}