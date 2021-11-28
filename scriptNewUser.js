/**
 * Hace un Get para obtener el listado de usuarios
 */
 function getUsers() {
    $.ajax({
        url: "http://localhost:8080/api/user/all",
        /* url: 'http://129.151.98.9:8080/api/user/all', */
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListUsers(response);
        }

    });
}

/**
 * Poblar la tabla
 * @param {*} response 
 */
function printListUsers(response) {
    let myTable = "<table>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].identification + "</td>";
        myTable += "<td>" + response[i].name + "</td>";
        myTable += "<td>" + response[i].address + "</td>";
        myTable += "<td>" + response[i].cellPhone + "</td>";
        myTable += "<td>" + response[i].email + "</td>";
        myTable += "<td>" + response[i].password + "</td>";
        myTable += "<td>" + response[i].zone + "</td>";
        myTable += "<td>" + response[i].type + "</td>";
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="deleteUser(' + response[i].id + ')">Eliminar Usuario</button></td>';
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="cargarDatosSkate(' + response[i].id + ')">Editar Usuario</button></td>';
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="actualizar(' + response[i].id + ')">Actualizar Usuario</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $(".cuerpoTabla").html(myTable);
}

/**
 * Funcion para eliminar usuario en la tabla
 * @param {*} idUser 
 */
function deleteUser(idUser){
    let id = idUser;
    let elemento = {
        id: id
    }
    console.log(id);
    let dataToSend = JSON.stringify(elemento);

    
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url: "http://localhost:8080/api/user/" + id,
            /* url: 'http://129.151.98.9:8080/api/user/' + id, */
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $(".cuerpoTabla").empty();  //esto limpia el Input!
                alert("Usuario borrado de la BD!")
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
