/**
 * Funcion para cargar tablas
 */
function cargarTabla() {
    $.ajax({
        url: 'http://localhost:8080/api/user/all',
        /* url: 'http://129.151.98.9:8080/api/user/all', */
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            var resultado = "";
            response.forEach(function (items) {
                resultado += "<tr><td class=" + items.id + " id=borrar" + items.id + ">" + items.identification + "</td><td>";
                resultado += items.name + "</td><td>";
                resultado += items.address + "</td><td>";
                resultado += items.cellPhone + "</td><td>";
                resultado += items.email + "</td><td>";
                resultado += items.password + "</td><td>";
                resultado += items.zone + "</td><td>";
                resultado += items.type + "</td><td>";
                resultado += "<button onclick=\"editar(" + items.id + ")\" class=\"btn btn-light btn-lg action-button botones\">Editar</button><button onclick=\"borrar(" + items.id + ")\" class=\"btn btn-light btn-lg action-button botones\">Borrar</button></td></tr>";
            });
            $(".cuerpoTabla").html(resultado);

        },
        error: function (xhr, status) {
            //console.log(xhr,responseText);
        },
        complete: function (xhr, status) {
            //  console.log(xhr,responseText);
        }
    });
}

function borrar(idBorrar) {
    let id = idBorrar;
    let direccion = 'http://localhost:8080/api/user/' + idBorrar;
    /* let direccion = 'http://129.151.98.9:8080/api/user/' + idBorrar; */
    let mydata = {
        id: id,
    };
    let dataToSend = JSON.stringify(mydata);

    $.ajax({
        url: direccion,
        type: 'DELETE',
        data: dataToSend,
        contentType: 'application/json',
        dataType: 'json',
        statusCode: {
            204: function (respuesta) {
                cargarTabla();
                $("#respuesta").empty();
                alert("Usuario borrado de la BD")
            }
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(xhr, responseText);
            alert("");

        },
        complete: function (xhr, status) {
            console.log(xhr, status)

        }
    });

}

function editar(idEditar) {

    $.ajax({
        url: 'http://localhost:8080/api/user/all',
        /* url: 'http://129.151.98.9:8080/api/user/all', */
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            var resultado = "";
            response.forEach(function (items) {
                if (items.id == idEditar) {
                    resultado += "<label class=\"labeleditar\">Id<input id=\"ideditado\" value=" + items.id + "></label><label id=\"labeleditar\">Identification<input class=\"identificationeditado\" value=";
                    resultado += items.identification + "></label><label class=\"labeleditar\">Name<input id=\"nameeditado\"  value=";
                    resultado += items.name + "></label><label class=\"labeleditar\">Address<input id=\"addresseditado\"  value=";
                    resultado += items.address + "></label><label class=\"labeleditar\">CellPhone<input id=\"cellPhoneeditado\"  value=";
                    resultado += items.cellPhone + "></label><label class=\"labeleditar\">Email<input id=\"emaileditado\"  value=";
                    resultado += items.email + "></label><label class=\"labeleditar\">Password<input id=\"passwordeditado\"  value=";
                    resultado += items.password + "></label><label class=\"labeleditar\">Zone<input id=\"zoneeditado\"  value=";
                    resultado += items.zone + "></label><label class=\"labeleditar\">Type<input id=\"typeeditado\"  value=";
                    resultado += items.type + "></label>";
                    resultado += "<button onclick=\"editar2(" + idEditar + ")\" class=\"btn btn-light btn-lg action-button botones\">Editar</button>";
                }
                $(".cuerpo").html(resultado);

            });


        },
        error: function (xhr, status) {
            console.log(xhr, responseText);
        },
        complete: function (xhr, status) {
            //  console.log(xhr,responseText);
        }
    });

}

function editar2(idEditar) {
    let editado = {
        id: $("#ideditado").val(),
        identification: $("#identificationeditado").val(),
        name: $("#nameeditado").val(),
        address: $("#addresseditado").val(),
        cellPhone: $("#cellPhoneeditado").val(),
        email: $("#emaileditado").val(),
        password: $("#passwordeditado").val(),
        zone: $("#zoneeditado").val(),
        type: $("#typeeditado").val()
    };
    let dataToSend = JSON.stringify(editado);
    $.ajax({
        url: 'http://129.151.98.9:8080/api/Lib/update',
        type: "PUT",
        data: dataToSend,
        contentType: "application/json",
        datatype: "json",
        success: function (respuesta) {
            $("respuesta").empty;
            $("#ideditado").val("");
            $("#targeteditado").val("");
            $("#capacityeditado").val("");
            $("#category_ideditado").val("");
            $("#nameeditado").val("");
            alert("se actualizo el dato");
            cargarTabla()
        }
    });
}


/* 
$(document).ready(function () {

    cargarTabla();
});

 */


//SCRIPTS PARA LA CREACION DE NUEVOS USUARIOS

/**
 * CREAR NUEVO - OJO CAMBIAR CAMPOS
 */
function newUser() {

    let mydata = {
        name: $("#name").val(),
        description: $("#description").val()
    };

    $.ajax({
        url: "http://localhost:8080/api/user/new",
        /* url: "http://129.151.98.9:8080/api/user/new", */
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(mydata),

        statusCode: {
            201: function (respuesta) {
                alert("agregado");
                window.location.href = "http://127.0.0.1:5500/Category.html";
            }

        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(mydata);

        },

    });
}