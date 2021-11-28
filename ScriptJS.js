/**
 * Funcion para página INDEX y validar si el usuario está creado o no
 */
 function validarUsuario() {
    let respuesta = new XMLHttpRequest();
    let emailUser = $("#emailUser").val();
    let passw = $("#password").val();
    let url = 'http://localhost:8080/api/user/' + emailUser + "/" + passw;
    /* let url = 'http://129.151.98.9:8080/api/user/' + emailUser + "/" + passw; */

    if (emailUser != "" && passw != "") {
        respuesta.open('GET', url);

        respuesta.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let respuestaJson = JSON.parse(this.responseText);
                console.log(respuestaJson["name"]);
                if (respuestaJson["name"] != "NO DEFINIDO") {
                    alert("Bienvenido " + respuestaJson["name"]);
                    window.location.href = "home.html";
                } else {
                    alert("No existe un usuario");
                }
            }
        }
        respuesta.send();
    } else {
        alert("Por favor diligencie todos los campos")
    }
}

/**
 * Función para Validar campos y crear nueva cuenta de usuario
 */
function registrarNuevoUsuario() {
    let contra1 = $("#contraNuevo1").val();
    let contra2 = $("#contraNuevo2").val();
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let boolEmail = expReg.test(document.getElementById("emailNewUser").value);

    if (document.getElementById("nameNewUser").value == "") {
        alert("campo de nombre está vacío");
    } else if (document.getElementById("emailNewUser").value == "") {
        alert("campo de e-mail está vacío");
    } else if (boolEmail == true) {
        if ((contra1.length < 6) == true || (contra2.length < 6) == true) {
            alert("las contraseñas deben tener por lo menos 6 caracteres");
        } else {
            if (contra1 == contra2) {

                let respuesta = new XMLHttpRequest();
                let emailUser = $("#emailNewUser").val();
                let url = 'http://localhost:8080/api/user/' + emailUser;
                /* let url = 'http://129.151.98.9:8080/api/user/' + emailUser; */
                respuesta.open('GET', url);
                respuesta.onreadystatechange = function () {
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                        let respuestaJson = JSON.parse(this.responseText);
                        console.log(respuestaJson);
                        if (respuestaJson == true) {
                            alert("No fue posible crear la cuenta");
                        } else {

                            let respuesta = new XMLHttpRequest();
                            let emailUser = $("#emailNewUser").val();
                            let passw = $("#password").val();
                            let url = 'http://localhost:8080/api/user/' + emailUser + "/" + passw;
                            /* let url = 'http://129.151.98.9:8080/api/user/' + emailUser + "/" + passw; */
                            respuesta.open('GET', url);

                            respuesta.onreadystatechange = function () {
                                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                                    let respuestaJson = JSON.parse(this.responseText);
                                    console.log(respuestaJson["name"]);
                                    if (respuestaJson["name"] != "NO DEFINIDO") {
                                        alert("No fue posible crear la cuenta");
                                    } else {
                                        newUser();
                                    }
                                }
                            }
                            respuesta.send();

                        }
                    }
                }
                respuesta.send();
            } else {
                alert("contraseñas no coinciden");
            }
        }
    } else {
        alert('El correo electrónico no cumple con los parámetros');
    }
}

/**
 * Función para hacer el POST en la página de crear Cuenta
 */
 function newUser() {
    let myData = {
        identification: $("#identification").val(),
        name: $("#nameNewUser").val(),
        address: $("#UserAddress").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#emailNewUser").val(),
        zone: $("#Zona").val(),
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
                window.location.href = "http://localhost:8080/index.html";
                //window.location.href = "http://129.151.98.9:8080/index.html";
            }
        }, error: function (jqXHR, textStatus, errorThrown) {
            console.log(myData);
        }
    })
}


// FUNCIONES DE PRUEBAS!!!!

/**
 * Función para validar los campos en la página crear cuenta
 */
function validarCampos() {
    let contra1 = $("#contraNuevo1").val();
    let contra2 = $("#contraNuevo2").val();
    let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let boolEmail = expReg.test(document.getElementById("emailNewUser").value);

    if (document.getElementById("nameNewUser").value == "") {
        alert("campo de nombre está vacío");
    } else if (document.getElementById("emailNewUser").value == "") {
        alert("campo de e-mail está vacío");
    } else if (boolEmail == true) {
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

function valEmail() {
    let respuesta = new XMLHttpRequest();
    let emailUser = $("#emailUser").val();
    let url = 'http://localhost:8080/api/user/' + emailUser;
    /* let url = 'http://129.151.98.9:8080/api/user/' + emailUser; */
    respuesta.open('GET', url);
    respuesta.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let respuestaJson = JSON.parse(this.responseText);
            console.log(respuestaJson);
            if (respuestaJson == true) {
                alert("ojo ya existe");
            } else {
                alert("No existe un usuario");
            }
        }
    }
    respuesta.send();
}

function valEmailPassw() {
    let respuesta = new XMLHttpRequest();
    let emailUser = $("#emailUser").val();
    let passw = $("#password").val();
    let url = 'http://localhost:8080/api/user/' + emailUser + "/" + passw;
    /* let url = 'http://129.151.98.9:8080/api/user/' + emailUser + "/" + passw; */
    respuesta.open('GET', url);

    respuesta.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let respuestaJson = JSON.parse(this.responseText);
            console.log(respuestaJson["name"]);
            if (respuestaJson["name"] != "NO DEFINIDO") {
                alert("No fue posible crear la cuenta");
            } else {
                alert("No existe un usuario");
            }
        }
    }
    respuesta.send();
}