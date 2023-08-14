// Definición de la clase Censista
class Censista {
  constructor(unNombre, unNombreUsuario, unaContraseña) {
    this.nombre = unNombre;
    this.nombreusuario = unNombreUsuario;
    this.contraseña = unaContraseña;
  }
}


class Departamento {
  constructor(depto) {
    this.departamento = depto;
  }
}

class Censado {
  constructor(nombreApellidoC, edadC, cedulaC, departamentoC, ocupacionC, censadoC) {
    this.nombreApellido = nombreApellidoC;
    this.edad = edadC;
    this.cedula = cedulaC;
    this.departamento = departamentoC;
    this.ocupacion = ocupacionC;
    this.censado = censadoC;
  }
}


// Definición de la clase Invitado
class Invitado {
  constructor(nombre, edad, cedula, departamento, ocupacion) {
    this.nombre = nombre;
    this.edad = edad;
    this.cedula = cedula;
    this.departamento = departamento;
    this.ocupacion = ocupacion;
  }
}



// Definición de la clase Sistema
class Sistema {
  constructor() {
    this.invitados = [];
    this.censistas = [];
    this.departamentos = [
      new Departamento("Artigas"),
      new Departamento("Canelones"),
      new Departamento("Cerro Largo"),
      new Departamento("Colonia"),
      new Departamento("Durazno"),
      new Departamento("Flores"),
      new Departamento("Florida"),
      new Departamento("Lavalleja"),
      new Departamento("Maldonado"),
      new Departamento("Montevideo"),
      new Departamento("Paysandú"),
      new Departamento("Río Negro"),
      new Departamento("Rivera"),
      new Departamento("Rocha"),
      new Departamento("Salto"),
      new Departamento("San José"),
      new Departamento("Soriano"),
      new Departamento("Tacuarembó"),
      new Departamento("Treinta y Tres"),
    ];
    this.censados = [];
  }


  agregarInvitado(inv) {
    this.invitados.push(inv);
  }

  obtenerInvitados() {
    return this.invitados;
  }

  agregarCensista(censista) {
    this.censistas.push(censista);
  }

  obtenerCensistas() {
    return this.censistas;
  }
}

const sistema = new Sistema();

//// Datos precargados


// Array de censistas
let censistas = new Censista("Pepe", "pepito", "Pepe1");
sistema.agregarCensista(censistas);

let invitado = new Invitado("Juan Lopez", 35, 37683708, "Montevideo", "Dependiente");
sistema.agregarInvitado(invitado);

let censado = new Censado("Jorge Ramirez", 42, 37683708, "Durazno", "Dependiente", false);
sistema.censados.push(censado);


// Validaciones de los campos de registro
function validacionesCensista() {
  let nombreCensistaCampo = document.querySelector("#txtNombreCensista").value;
  let usuarioCensistaCampo = document.querySelector("#txtNombreUsuarioCensista").value;
  let contraseñaCensistaCampo = document.querySelector("#pswContraseñaCensista").value;

  // Validación de los campos
  let mensajeErrorRegistro = document.querySelector("#pErrorCamposObligatorios");
  if (nombreCensistaCampo === "" || usuarioCensistaCampo === "") {
    mensajeErrorRegistro.innerHTML = "Todos los campos son obligatorios";
    return;
  }

  let existeUsuario = existeElemento(sistema.censistas, "nombreusuario", usuarioCensistaCampo);
  if (existeUsuario) {
    mensajeErrorRegistro.innerHTML = "El nombre de usuario ya está en uso";
    return;
  }

  // Verificación de la contraseña
  if (verificarContraseña(contraseñaCensistaCampo) === true) {
    registrarCensista(nombreCensistaCampo, usuarioCensistaCampo, contraseñaCensistaCampo);
    cambiarSeccion('seccionOpcionesCensista');
  }
}

// Asignar la función con nombre al evento click
document.querySelector("#btnSeccionOpcionesCensista").addEventListener("click", validacionesCensista);

// Función para registrar un nuevo censista
function registrarCensista(nombreCensistaCampo, usuarioCensistaCampo, contraseñaCensistaCampo) {
  censistas = new Censista(nombreCensistaCampo, usuarioCensistaCampo, contraseñaCensistaCampo);
  sistema.agregarCensista(censistas);
  console.log(censistas);
}

// Función para verificar la contraseña
function verificarContraseña(contraseña) {
  let may = 0;
  let min = 0;
  let nums = 0;
  let mensajeErrorContra = document.querySelector("#pMensajeErrorContra");

  for (let i = 0; i < contraseña.length; i++) {
    let cod = contraseña.charCodeAt(i);
    if (cod >= 65 && cod <= 90 || cod >= 192 && cod <= 221) {
      may++;
    } else if (cod >= 97 && cod <= 122 || cod >= 224 && cod <= 255) {
      min++;
    } else if (cod >= 48 && cod <= 57) {
      nums++;
    }
  }

  if (may < 1 || min < 1 || nums < 1 || contraseña.length < 5) {
    mensajeErrorContra.innerHTML = "La contraseña no cumple con las condiciones";
    return false;
  } else {
    return true;
  }
}


// Función para verificar si existe un elemento en el array
function existeElemento(arr, prop, buscar) {
  let existe = false;
  for (let i = 0; i < arr.length; i++) {
    let unObj = arr[i];
    if (unObj[prop] === buscar) {
      existe = true;
      break;
    }
  }
  return existe;
}

/* DINÁMICA PARA CAMBIAR SECCIONES, OCULTAR Y MOSTRAR BOTONES */

// Ocultar todas las secciones al cargar la página
ocultarSecciones();

// Función para ocultar todas las secciones
function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    const seccion = secciones[i];
    seccion.style.display = "none";
  }
}

// Asignar evento click a los botones
let botones = document.querySelectorAll(".btn");
for (let i = 0; i < botones.length; i++) {
  const boton = botones[i];
  boton.addEventListener("click", function () {
    let unBoton = this.getAttribute("id");
    if (unBoton !== "btnSeccionIngresarInvitado" && unBoton !== "btnSeccionOpcionesCensista") {
      mostrarSeccion(unBoton);
    }
  });
}

// Función para mostrar una sección específica
function mostrarSeccion(unBoton) {
  let idSeccion = unBoton.charAt(3).toLowerCase() + unBoton.substring(4);
  cambiarSeccion(idSeccion);
}

// Cambiar a la sección "seccionPrincipal" al cargar la página
cambiarSeccion("seccionPrincipal");

// Función para cambiar a una sección específica
function cambiarSeccion(nuevaSeccion) {
  ocultarSecciones();
  document.querySelector("#" + nuevaSeccion).style.display = "block";
}

// Función para mostrar los botones según el perfil
function mostrarBotones(perfil) {
  let botones = document.querySelectorAll(".btn");
  for (let i = 0; i < botones.length; i++) {
    const boton = botones[i];
    boton.style.display = "none";
  }

  let botonesMostrar = document.querySelectorAll("." + perfil);
  for (let i = 0; i < botonesMostrar.length; i++) {
    const botonMostrar = botonesMostrar[i];
    botonMostrar.style.display = "block";
  }
}

// Función para cambiar a la sección anterior
function cambiarSeccionAnterior() {
  ocultarSecciones();


  // Obtener todas las secciones
  var secciones = document.querySelectorAll(".seccion");
  // Encontrar la sección actual
  var seccionActual = null;
  for (var i = 0; i < secciones.length; i++) {
    if (secciones[i].style.display === "block") {
      seccionActual = secciones[i];
      break;
    }
  }
  // Si se encontró la sección actual
  if (seccionActual) {
    // Mostrar la sección anterior
    var seccionAnterior = seccionActual.previousElementSibling;
    if (seccionAnterior) {
      seccionAnterior.style.display = "block";
      seccionAnterior.scrollIntoView();
    }
  }
}

// Evento click en el botón de la sección "btnSeccionIngresarInvitado"
function validacionesInvitado() {
  if (validarCedula()) {
    let cedulaIngreso = Number(document.querySelector("#nbrCedulaIngreso").value.trim());
    let invitadoEncontrado = null;

    for (let i = 0; i < sistema.invitados.length; i++) {
      if (sistema.invitados[i].cedula === cedulaIngreso) {
        invitadoEncontrado = sistema.invitados[i];
        break;
      }
    }

    if (invitadoEncontrado) {
      document.querySelector("#txtNombreApellidoInvitado").value = invitadoEncontrado.nombre;
      document.querySelector("#nbrEdadInvitado").value = invitadoEncontrado.edad;
      document.querySelector("#slcDepartamentoInvitado").value = invitadoEncontrado.departamento;
      document.querySelector("#slcOcupaciónInvitado").value = invitadoEncontrado.ocupacion;
    }else{
      document.querySelector("#txtNombreApellidoInvitado").value = "";
      document.querySelector("#nbrEdadInvitado").value = "";
      document.querySelector("#slcOcupaciónInvitado").value = "";
    }

    cambiarSeccion('seccionIngresarInvitado');
  }
}


// Asignar evento click a la función de validar la cédula
document.querySelector("#btnSeccionIngresarInvitado").addEventListener("click", validarCedula);


let mensajeError = document.querySelector("#pMensajeErrorCedula");
// Función para validar la cédula
function validarCedula() {
  let CI = document.querySelector("#nbrCedulaIngreso").value.trim();
  let mensajeError = document.querySelector("#pMensajeErrorCedula");

  
  if (CI === "") {
    mensajeError.innerHTML = "Por favor, ingrese su número de cédula sin puntos ni guiones e incluya el dígito verificador.";
    return false;
  }

  if (CI.length === 7) {
    CI = "0" + CI;
  }

  let digitoVerificar = Number(CI.charAt(CI.length - 1));
  let codigo = "2987634";
  let acumulador = 0;

  for (let i = 0; i < CI.length - 1; i++) {
    acumulador += Number(CI.charAt(i)) * Number(codigo.charAt(i));
  }

  let digitoVerificador = (10 - (acumulador % 10)) % 10;

  if (CI.length !== 8) {
    mensajeError.innerHTML = "El número de cédula debe tener exactamente 8 dígitos sin guiones ni puntos.";
    return false;
  }
  if (digitoVerificar === digitoVerificador) {
    return true;
  } else {
    mensajeError.innerHTML = "Por favor, ingrese un número de cédula válido.";
    return false;
  }

  
  
  
}

document.querySelector("#btnSeccionIngresarInvitado").addEventListener("click", validacionesInvitado);

document.querySelector(".btnInicioSesion").addEventListener("click", iniciarSesion);
function iniciarSesion() {
  // Obtener los valores ingresados por el usuario
  let usuarioCensistaCampo = document.querySelector("#txtUsuarioCensista").value;
  let contraseñaCensistaCampo = document.querySelector("#txtContraseñaCensista").value;

  mensajeErrorIngreso = document.querySelector("#pErrorIngresar");
  if (usuarioCensistaCampo === "" || contraseñaCensistaCampo === "") {
    mensajeErrorIngreso.innerHTML = "Todos los campos son obligatorios";
    return;
  }
  // Buscar el censista en el array
  let censistaEncontrado = null;
  for (let i = 0; i < sistema.censistas.length; i++) {
    if (sistema.censistas[i].nombreusuario === usuarioCensistaCampo) {
      censistaEncontrado = sistema.censistas[i];
      break;
    }
  }

  // Verificar si se encontró el censista
  if (censistaEncontrado) {
    // Verificar la contraseña
    if (censistaEncontrado.contraseña === contraseñaCensistaCampo) {
      // Contraseña correcta, cambiar a la sección "seccionOpcionesCensista"
      cambiarSeccion('seccionOpcionesCensista');
    } else {
      // Contraseña incorrecta, mostrar mensaje de error
      mensajeErrorIngreso.innerHTML = "Contraseña o usuario incorrecto";
    }
  } else {
    // Censista no encontrado, mostrar mensaje de error
    mensajeErrorIngreso.innerHTML = "Contraseña o usuario incorrecto";
  }
}

// Función para limpiar los campos y mensajes de error
function limpiarCamposYErrores() {
  let campos = document.querySelectorAll("input[type='text'], input[type='password'], input[type='number']");
  for (let i = 0; i < campos.length; i++) {
    const campo = campos[i];
    campo.value = "";
  }

  let mensajesError = document.querySelectorAll(".error");
  for (let i = 0; i < mensajesError.length; i++) {
    const mensajeError = mensajesError[i];
    mensajeError.innerHTML = "";
  }
}

armarCombo("slcDepartamento");
armarCombo("slcDepartamentoInvitado");

function armarCombo(idCombo) {
  document.querySelector("#" + idCombo).innerHTML = `<option value="-1">Seleccione...</option>`;
  for (let i = 0; i < sistema.departamentos.length; i++) {
    const unDepartamento = sistema.departamentos[i];
    document.querySelector("#" + idCombo).innerHTML += `
      <option value="${unDepartamento.departamento}">${unDepartamento.departamento}</option>`
  }
}

function agregarInvitado() {
  let nombreApellidoCampoInvi = document.querySelector("#txtNombreApellidoInvitado").value;
  let edadCampoInvi = Number(document.querySelector("#nbrEdadInvitado").value);
  let cedulaCampoInvi = Number(document.querySelector("#nbrCedulaIngreso").value);
  let departamentoCampoInvi = document.querySelector("#slcDepartamentoInvitado").value;
  let ocupacionCampoInvi = document.querySelector("#slcOcupaciónInvitado").value;
  let censoCompletoInvi = false;
  if (nombreApellidoCampoInvi !== "" && edadCampoInvi !== ""
    && cedulaCampoInvi !== "" && departamentoCampoInvi !== "" && ocupacionCampoInvi !== "") {
    censoCompletoInvi = true;
  };

  let existeCensadoInvi = existeElemento(sistema.invitados, "cedula", cedulaCampoInvi);
  if (!existeCensadoInvi && censoCompletoInvi === true) {
    let objInvitado = new Invitado(nombreApellidoCampoInvi, edadCampoInvi, cedulaCampoInvi, departamentoCampoInvi, ocupacionCampoInvi);
    sistema.invitados.push(objInvitado);
    console.log(sistema.invitados);
  }

}


document.querySelector("#btnSeccionEnviarDatosInvitado").addEventListener('click', agregarInvitado)
console.log(sistema.censados);

