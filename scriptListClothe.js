/**
 * Hace un Get para obtener el listado de ropa
 */
 function getClothes() {
    $.ajax({
        url: "http://localhost:8080/api/clothe/all",
        /* url: 'http://129.151.98.9:8080/api/clothe/all', */
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
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="prueba(' + response[i].reference + ')">Eliminar Vestuario</button></td>';
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="cargarDatosSkate(' + response[i].reference + ')">Editar Usuario</button></td>';
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="actualizar(' + response[i].reference + ')">Actualizar Usuario</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $(".cuerpoTabla").html(myTable);
}

function prueba(reference){
    let id = reference;
    console.log(id);
}


/**
 * Funcion para eliminar CLOTHE en la tabla
 * @param {*} idClothe
 */
function deleteClothe(idClothe){
    let id= idClothe;
    let elemento = {
        id: id
    }
    console.log(id);
    let dataToSend = JSON.stringify(elemento);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://localhost:8080/api/clothe/" + id,
            /* url: 'http://129.151.98.9:8080/api/clothe/' + id, */
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


//REVISAR PORQUE ESTO CARGA EN UN FORMULARIO
function loadUserData(id) {
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/user/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
