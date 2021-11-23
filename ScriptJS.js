/**
 * Función para validar los campos en la página crear cuenta
 */
function validarCampos() {
    let contra1 = $("#contraNuevo1").val();
    let contra2 = $("#contraNuevo2").val();
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let boolEmail = expReg.test(document.getElementById("emailNewUser").value);

    if (document.getElementById("nameNewUser").value == "") {
        alert("campo de nombre está vacío");
    } else if (document.getElementById("emailNewUser").value == "") {
        alert("campo de e-mail está vacío");
    }  else if ( boolEmail == true){
        if ((contra1.length < 6) == true || (contra2.length < 6) == true) {
            alert("las contraseñas deben tener por lo menos 6 caracteres");
            /* console.log(contra1.length, contra2.length); */
        } else {
            if (contra1 == contra2) {
                newUser();
            } else {
                alert("contraseñas no coinciden");
            }
        }
    } else { 
        alert('El correo electrónico no cumple con los parámetros');
    }
    
    
}

/**
 * Función para la página de crear Cuenta
 */
function newUser() {
    let myData = {
        name: $("#nameNewUser").val(),
        email: $("#emailNewUser").val(),
        password: $("#contraNuevo1").val()
    }

    $.ajax({
        url: "http://localhost:8080/api/user/new",
        //url: "http://129.151.98.9:8080/api/user/new",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(myData),

        statusCode: {
            201: function (respuesta) {
                alert("Cuenta creada de forma correcta");
                window.location.href = "http://localhost:8080/crearCuenta.html";
                //window.location.href = "http://129.151.98.9:8080/crearCuenta.html";
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(myData);
        }
    })
}

/**
 * Funcion para página INDEX y validar si el usuario está creado o no
 */
function validarUsuario() {
    let emailUser = $("#emailUser").val();
    let passw = $("#password").val();

    let dataUser = {
        email: emailUser,
        password: passw
    }

    $.ajax({
        url: "http://localhost:8080/api/user/" + emailUser + "/" + passw,
        //url: "http://129.151.98.9:8080/api/user/" + emailUser + "/" + passw,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(dataUser),

        statusCode: {
            201: function (respuesta) {
                let userName = "";
                respuesta.forEach(function(items){
                    userName = items.name;
                });
                alert("Bienvenido "+ userName);
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(myData);
        }
    })
}
