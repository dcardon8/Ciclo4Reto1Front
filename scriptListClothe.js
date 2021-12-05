/**
 * Hace un Get para obtener el listado de ropa
 */
 function getClothes() {
    $.ajax({
        // url: "http://localhost:8080/api/clothe/all",
        url: 'http://129.151.98.9:8080/api/clothe/all',
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListClothes(response);
        }

    });
}

/**
 * Poblar la tabla
 * @param {*} response 
 */
function printListClothes(response) {
    let myTable = "<table>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].reference + "</td>";
        myTable += "<td>" + response[i].category + "</td>";
        myTable += "<td>" + response[i].size + "</td>";
        myTable += "<td>" + response[i].description + "</td>";
        myTable += "<td>" + response[i].availability + "</td>";
        myTable += "<td>" + response[i].price + "</td>";
        myTable += "<td>" + response[i].quantity + "</td>";
        myTable += "<td>" + response[i].photography + "</td>";
        myTable+="<td> <button class = 'btn btn-dark btn-lg action-button' onclick='deleteClothe("+JSON.stringify(response[i].reference)+")'>Eliminar</button>";
        myTable+="<td> <button class = 'btn btn-dark btn-lg action-button' onclick='loadData("+JSON.stringify(response[i].reference)+")'>Cargar</button>";
        myTable+="<td> <button class = 'btn btn-dark btn-lg action-button' onclick='updateData("+JSON.stringify(response[i].reference)+")'>Actualizar</button>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $(".cuerpoTabla").html(myTable);
}

/**
 * Funcion para eliminar CLOTHE en la tabla
 * @param {*} idClothe
 */
function deleteClothe(idClothe){
    let id= idClothe;
    let elemento = {
        id: id
    };
    console.log(id);
    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            // url: "http://localhost:8080/api/clothe/" + id,
            url: 'http://129.151.98.9:8080/api/clothe/' + id,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $(".cuerpoTabla").empty();  //esto limpia el Input!
                alert("Borrado de la BD!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}


/**
 * Carga la información del artículo en los inputs para luego actualizar
 * @param {*} idClothe 
 */
function loadData(idClothe) {
    let id = idClothe;
    $.ajax({
        dataType: 'json',
        // url: "http://localhost:8080/api/clothe/get/" + id,
        url: 'http://129.151.98.9:8080/api/clothe/get/' + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            let item = response;

            $("#ReferenceText").val(item.reference);
            $("#CategoryText").val(item.category);
            $("#SizeText").val(item.size);
            $("#DescriptionText").val(item.description);
            $("#AvailabilityText").val(item.availability);
            $("#PriceText").val(item.price);
            $("#StockText").val(item.quantity);
            $("#Fotografía").val(item.photography);
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

/**
 * ARREGLAR
 * @param {type} idClothe
 * @returns {undefined}
 */
function updateData(idClothe){

    if ($("#ReferenceText").val().length == 0 || $("#CategoryText").val().length == 0 || $("#SizeText").val().length == 0 
    || $("#DescriptionText").val().length == 0 ||  $("#AvailabilityText").val().length== 0  || $("#PriceText").val().length==0
    || $("#StockText").val().length==0 ||   $("#Fotografía").val().length==0)  {
        alert("Por favor ingrese todos los campos!")
    } else{
        let element = {
            reference: idClothe,
            category: $("#CategoryText").val(),
            size: $("#SizeText").val(),
            description: $("#DescriptionText").val(),
            availability: $("#AvailabilityText").val(),
            price:$("#PriceText").val(),
            stock: $("#StockText").val(),
            photography:$("#Fotografía").val()
        };
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",            
            // url: "http://localhost:8080/api/clothe/update",
            url: "http://129.151.98.9:8080/api/clothe/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $(".cuerpoTabla").empty();
                getClothes()();
                alert("Producto Editado!")               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Producto no editado!")
            }
        });
    }
}



function create(){

    if ($("#Referencia").val().length == 0 || $("#Categoria").val().length == 0 || $("#Talla").val().length == 0 
    || $("#Descripción").val().length == 0 ||  $("#Disponibilidad").val().length== 0  || $("#Precio").val().length==0
    || $("#Cantidad").val().length==0 ||   $("#Fotografía").val().length==0)  {
        alert("Por favor ingrese todos los campos!")
    } else{
        let myData = {
            reference: $("#Referencia").val(),
            category: $("#Categoria").val(),
            size: $("#Talla").val(),
            description: $("#Descripción").val(),
            availability: $("#Disponibilidad").val(),
            price: $("#Precio").val(),
            quantity: $("#Cantidad").val(),
            photography: $("#Fotografía").val()
        };
    
        $.ajax({
            // url: "http://localhost:8080/api/clothe/new",
            url: "http://129.151.98.9:8080/api/clothe/new",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(myData),
    
            statusCode: {
                201: function () {
                    alert("Producto creado de forma correcta");
                    //window.location.href = "http://localhost:8080/usuarios.html";
                    //window.location.href = "http://129.151.98.9:8080/usuarios.html";
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(myData);
            }
        });        
    }
} 