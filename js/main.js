let screen = document.getElementById('screen');
const equal = document.getElementById('equal');
const contentShow = document.getElementById('contentShow');
const buttons = document.querySelectorAll("#buttons button");

const numbers = "1234567890.";
const op = "+*/-%";
let teclaPulsada;
let operacion1;
let resultado;
let localStorageDatos = [];

// Recorremos cada boton
for (const button of buttons) {
    // le asignamos el evento click a cada boton
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Cancela cualquier evento si este es cancelable
        addNumber(e);
        calcular(e);
        clear(e);
    });
}

/* Función que obtiene los datos y los inserta en el input */
function addNumber(btn) {
    /* let bt = btn.target.textContent; */
    if (numbers.includes(btn.target.textContent)) {
        screen.value += btn.target.textContent;
    }
    if (op.includes(btn.target.textContent)) {
        screen.value += btn.target.textContent;
    }
}

/* Función que limpia el input */
function clear(clear) {
    if (clear.target.textContent == 'C') {
        screen.value = '';
    }
}

/* document.addEventListener('keypress', (e) => {
    teclaPulsada = e.key;
})
console.log(teclaPulsada); */

/* Función que obtiene la operacion ingresada en el input y luego hace la operación */
function calcular(cal){
    if (cal.target.textContent === '=') {// Validamos si el boton de igual fue pulsado
        if (screen.value == '') { // Validamos si hay algún dato ingresado en el input
            alert("Debes ingresar algo"); // Si no hay ningun dato mandamos un mensaje avisando que no hay datos para operrar
        }else {
            operacion1 = screen.value;
            screen.value = eval(screen.value); // Despues de obtener los datos ingesado se opera con la función eval() y lo mostramos en el input
            resultado = screen.value;
            if (screen.value.length > 8) {
                screen.value = eval(screen.value).toFixed(8);
            }
        }
        console.log(operacion1 + " " + " " + resultado);
        // Creamos un objeto el cual obtiene la operación y el resultado
        let data = {
            operacion: operacion1,
            result: resultado
        }
        // colocamos esos datos en la variable de tipo array
        localStorageDatos.push(data);
        // Enviamos los datos a la función saveInLocalStorage el cual va a hacer el proceso de guardarlo en le local storage
        saveInLocalStorage(localStorageDatos);
    }
}

// Función para obtener los datos del local storage
function showDataLocalStorage() {
    // obtenemos los datos y los almacenamos en la variable obtenerDato
    let obtenerDato = localStorage.getItem('MisDatos');

    // Despues de obtener la info del local storage, verificamos si los datos vienen vacidos
    if (obtenerDato == null) {
        localStorageDatos = [];
    }else {
        // Si hay info en el local storage lo convertimos en objeto y lo asignamos a la variable de tipo array 
        localStorageDatos = JSON.parse(obtenerDato);
    }

    // Luego retornamos los datos
    return localStorageDatos;
}

function saveInLocalStorage(data) {
    // Obtenemos los datos y los al macenamos en el local storage
    localStorage.setItem('MisDatos', JSON.stringify(data));
}

// Obtenemos los datos retornados por la función y lo asignamos a la variable res
let res = showDataLocalStorage();
contentShow.innerHTML = '';
for (let i = 0; i < res.length; i++) {
    let dato1 = res[i].operacion;
    let dato2 = res[i].result;
    contentShow.innerHTML = `<div class="content2">
    <span class="operacion" id="operacion">${dato1}</span>
    <span class="igual">=</span><span class="resultado" id="resultado">${dato2}</span>
    </div>`;

    console.log(dato1 + " " + dato2);
}

