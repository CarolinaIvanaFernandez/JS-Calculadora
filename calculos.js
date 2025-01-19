console.log("El archivo JavaScript se ha cargado correctamente.");
const pantalla = document.getElementById('pantalla');
const botones = document.querySelectorAll('#calculadora button');

let operacion = '';

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const valor = boton.id;

        if (valor === 'C') {
            pantalla.value = '';
            operacion = '';
        } else if (valor === 'DE') {
            operacion = operacion.slice(0, -1);
            pantalla.value = operacion;
        } else if (valor === '=') {
            pantalla.value = realizarOperacion(operacion);
            operacion = pantalla.value;
        } else {
            operacion += valor;
            pantalla.value = operacion;
        }
    });
});

function realizarOperacion(op) {
    let num1 = 0;
    let actual = '';
    let operador = null;

    for (let i = 0; i < op.length; i++) {

        if (isNaN(op[i]) && op[i] !== '.') {
            if (operador === null) {
                num1 = parseFloat(actual);
            } else {
                num1 = calcularResultado(num1, parseFloat(actual), operador);
            }
            operador = op[i];
            actual = '';
        } else {
            actual += op[i];
        }
    }

    if (actual !== '') {
        num1 = calcularResultado(num1, parseFloat(actual), operador);
    }

    return num1;
}

function calcularResultado(a, b, operador) {
    switch (operador) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}