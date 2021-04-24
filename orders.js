document.addEventListener("DOMContentLoaded", function(event) { 

    updateTable();

});

function getRowElement(item) {

    var tr = document.createElement("tr");

    tr.appendChild(createCell(item.name));
    tr.appendChild(createCell(item.email));
    tr.appendChild(createCell(item.address));
    tr.appendChild(createCell(item.firstBookAmount));
    tr.appendChild(createCell(item.secondBookAmount));
    tr.appendChild(createCell(item.thirdBookAmount));
    tr.appendChild(createCell(item.priority));
    tr.appendChild(createCell(item.status));
    tr.appendChild(createCellWithEditLink(item.id));
    
    return tr;
}

function createCell(value) {

    var td = document.createElement("td");
    
    td.appendChild(document.createTextNode(value));

    return td;
}

function createCellWithEditLink(id) {
    
    var td = document.createElement("td");

    var a = document.createElement("a");
    a.setAttribute("href", "/update-order.html?id=" + id);
    a.appendChild(document.createTextNode("Edit"));

    td.appendChild(a);

    return td;
}

function updateTable() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {

                var orders = JSON.parse(this.responseText);
                var table =  document.querySelector('#orders-section table');

                orders.forEach(function(item) {
                    var rowElement = getRowElement(item);
                    table.appendChild(rowElement);
                });

            }
            else {
                alert(this.responseText);
            }
        }
    };
    xhttp.open("Get", "https://localhost:44375/api/orders", true);
    xhttp.send();
}