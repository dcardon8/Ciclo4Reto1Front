/**
 * Hace un Get para obtener el listado de usuarios
 */
 function getUsers() {
    $.ajax({
        // url: "http://localhost:8080/api/user/all",
        url: 'http://129.151.98.9:8080/api/user/all',
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
        myTable += '<td><button class = "btn btn-dark btn-lg action-button" onclick="deleteUser(' + response[i].id + ')">Eliminar</button></td>';
        myTable+="<td> <button class = 'btn btn-dark btn-lg action-button' onclick='loadData("+JSON.stringify(response[i].id)+")'>Cargar</button>";
        myTable+="<td> <button class = 'btn btn-dark btn-lg action-button' onclick='updateData("+JSON.stringify(response[i].id)+")'>Actualizar</button>";
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
            // url: "http://localhost:8080/api/user/" + id,
            url: 'http://129.151.98.9:8080/api/user/' + id,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $(".cuerpoTabla").empty();  //esto limpia el Input!
                getUsers();
                alert("Usuario borrado de la BD!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });    
}


//REVISAR PORQUE ESTO CARGA EN UN FORMULARIO
function loadData(idUser) {
    let id = idUser;
    $.ajax({
        dataType: 'json',
        // url: "http://localhost:8080/api/user/get/" + id,
        url: 'http://129.151.98.9:8080/api/user/get/' + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            let item = response;

            $("#IdentificationText").val(item.identification);
            $("#NameText").val(item.name);
            $("#AddressText").val(item.address);
            $("#cellPhoneText").val(item.cellPhone);
            $("#EmailText").val(item.email);
            $("#contraNuevo1").val(item.password);
            $("#ZonaText").val(item.zone);
            $("#RolText").val(item.type);
        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function updateData(idUser){

    if ($("#IdentificationText").val().length == 0 || $("#NameText").val().length == 0 || $("#AddressText").val().length == 0 
    || $("#cellPhoneText").val().length == 0 ||  $("#EmailText").val().length== 0  || $("#contraNuevo1").val().length==0
    || $("#ZonaText").val().length==0 ||   $("#RolText").val().length==0)  {
        alert("Por favor ingrese todos los campos!")
    } else{
        let element = {
            id: idUser,
            identification: $("#IdentificationText").val(),
            name: $("#NameText").val(),
            address: $("#AddressText").val(),
            cellPhone: $("#cellPhoneText").val(),
            email:$("#EmailText").val(),
            password: $("#contraNuevo1").val(),
            zone:$("#ZonaText").val(),
            type:$("#RolText").val()            
        }

        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",            
            // url: "http://localhost:8080/api/user/update",
            url: "http://129.151.98.9:8080/api/user/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $(".cuerpoTabla").empty();
                getUsers();
                alert("Usuario Editado!")               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Usuario no editado!")
            }
        });
    }
}

function create(){

    if ($("#IdUser").val().length == 0 || $("#Identification").val().length == 0 || $("#nameNewUser").val().length == 0 
    || $("#Dirección").val().length == 0 ||  $("#cellPhone").val().length== 0  || $("#emailNewUser").val().length==0
    || $("#contraNuevo1").val().length==0 ||   $("#Zona").val().length==0  ||  $("#Rol").val().length==0)  {
        alert("Por favor ingrese todos los campos!")
    } else{
        let myData = {
            id: $("#IdUser").val(),
            identification: $("#Identification").val(),
            name: $("#nameNewUser").val(),
            address: $("#Dirección").val(),
            cellPhone: $("#cellPhone").val(),
            email: $("#emailNewUser").val(),
            password: $("#contraNuevo1").val(),
            zone: $("#Zona").val(),
            type: $("#Rol").val()
        };
    
        $.ajax({
            // url: "http://localhost:8080/api/user/new",
            url: "http://129.151.98.9:8080/api/user/new",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "JSON",
            data: JSON.stringify(myData),
    
            statusCode: {
                201: function () {
                    alert("Cuenta creada de forma correcta");
                    //window.location.href = "http://localhost:8080/usuarios.html";
                    window.location.href = "http://129.151.98.9:8080/usuarios.html";
                }
            }, error: function (jqXHR, textStatus, errorThrown) {
                console.log(myData);
            }
        });


        
    }

} 