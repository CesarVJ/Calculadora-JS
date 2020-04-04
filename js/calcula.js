window.onload = function() { //Acciones tras cargar la página
    pantalla = document.getElementById("textoPantalla"); //elemento pantalla de salida
}
x = "0"; //número en pantalla
xi = 1; //iniciar número en pantalla: 1=si; 0=no;
coma = 0; //estado coma decimal 0=no, 1=si;
ni = 0; //número oculto o en espera.
op = "no"; //operación en curso; "no" =  sin operación.


function operacionCientifica(operacion) {
    if (operacion === 'log') {
        x = log(x);
    } else if (operacion === 'ln') {
        x = ln(x);
    } else if (operacion === 'cuadrado') {
        x = cuadrado(x);
    } else if (operacion === 'cubo') {
        x = cubo(x);
    } else if (operacion === 'diezX') {
        x = diez(x);
    } else if (operacion === 'factorial') {
        x = factorial(x);
    } else if (operacion === 'absoluto') {
        x = absoluto(x);
    }
    pantalla.innerHTML = x;
    op = 'no';
    xi = 1;
}

function log(valor) {
    return Math.log10(valor);
}

function ln(valor) {
    return Math.log(valor);
}

function cuadrado(valor) {
    return Math.pow(valor, 2);
}

function cubo(valor) {
    return Math.pow(valor, 3);
}

function diez(valor) {
    return Math.pow(10, valor);
}

function factorial(valor) {
    var factor = 1;
    if (valor <= 0) {
        return 0;
    } else {
        while (valor !== 0) {
            factor *= valor;
            valor--;
        }
        return factor;
    }
}

function absoluto(valor) {
    return Math.abs(valor);
}
//Funciones de BINARIO,OCTAL Y HEXADECIMAL
function binario() {
    var resultado = '';
    var valor = Math.floor(x);
    while (valor > 0) {
        resultado += esPar(valor) ? '0' : '1';
        valor = Math.floor(valor / 2);
    }
    resultado = resultado.split('').reverse().join('');
    x = x + '';
    if (x.includes('.')) {
        resultado += '.' + calcularParteDecimal(x);
    }
    pantalla.innerHTML = resultado;
    op = 'no';
    xi = 1;
}

function esPar(numero) {
    if (numero % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

function calcularParteDecimal(numero) {
    numero = "." + (numero + "").split(".")[1];
    var residuo = numero % 1;
    var resultado = '';
    while (residuo != 0) {
        numero = residuo * 2;
        resultado += (numero + "").split('.')[0];
        residuo = numero % 1;
    }
    return resultado;
}

function octal() {
    var resultado = '';
    var valor = Math.floor(x);
    var residuo = 0;
    while (valor > 0) {
        residuo = valor % 8;
        valor = Math.floor(valor / 8);
        resultado += residuo;
    }
    resultado = resultado.split('').reverse().join('');
    x = x + '';
    if (x.includes('.')) {
        resultado += '.' + calcularParteDecimalOctal(x);
    }
    pantalla.innerHTML = resultado;
    op = 'no';
    xi = 1;
}

function calcularParteDecimalOctal(numero) {
    var residuo = "." + (numero + "").split(".")[1];
    var producto = residuo * 8;
    resultado = '';
    while (residuo != 0) {
        resultado += (producto + "").split('.')[0];
        residuo = producto % 1;
        producto = residuo * 8;
    }
    return resultado;
}

function hexadecimal() {
    var resultado = '';
    var valor = Math.floor(x);
    var residuo = 0;
    while (valor > 0) {
        residuo = valor % 16;
        valor = Math.floor(valor / 16);
        residuo = evaluarResiduo(residuo);
        resultado += residuo;
    }
    resultado = resultado.split('').reverse().join('');
    x = x + '';

    if (x.includes('.')) {
        resultado += '.' + calcularParteDecimalHexade(x);
    }
    pantalla.innerHTML = resultado;
    op = 'no';
    xi = 1;
}

function calcularParteDecimalHexade(numero) {
    var residuo = "." + (numero + "").split(".")[1];
    var producto = residuo * 16;
    resultado = '';
    while (residuo != 0) {
        resultado += evaluarResiduo((producto + "").split('.')[0]);
        residuo = producto % 1;
        producto = residuo * 16;
    }
    return resultado;
}

function evaluarResiduo(residuo) {
    if (residuo <= 9) {
        return residuo;
    } else {
        return residuo == 10 ? 'A' : residuo == 11 ? 'B' : residuo == 12 ? 'C' : residuo == 13 ? 'D' : residuo == 14 ? 'E' : 'F';
    }
}
//mostrar número en pantalla según se va escribiendo:
function numero(xx) { //recoge el número pulsado en el argumento.
    if (x == "0" || xi == 1) { // inicializar un número, 
        pantalla.innerHTML = xx; //mostrar en pantalla
        x = xx; //guardar número
        if (xx == ".") { //si escribimos una coma al principio del número
            pantalla.innerHTML = "0."; //escribimos 0.
            x = xx; //guardar número
            coma = 1; //cambiar estado de la coma
        }
    } else { //continuar escribiendo un número
        if (xx == "." && coma == 0) { //si escribimos una coma decimal pòr primera vez
            pantalla.innerHTML += xx;
            x += xx;
            coma = 1; //cambiar el estado de la coma  
        }
        //si intentamos escribir una segunda coma decimal no realiza ninguna acción.
        else if (xx == "." && coma == 1) {}
        //Resto de casos: escribir un número del 0 al 9: 	 
        else {
            pantalla.innerHTML += xx;
            x += xx
        }
    }
    xi = 0 //el número está iniciado y podemos ampliarlo.
}

function operar(s) {
    igualar() //si hay operaciones pendientes se realizan primero
    ni = x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
    op = s; //guardamos tipo de operación.
    xi = 1; //inicializar pantalla.
}

function igualar() {
    if (op == "no") { //no hay ninguna operación pendiente.
        pantalla.innerHTML = x; //mostramos el mismo número	
    } else { //con operación pendiente resolvemos
        sl = ni + op + x; // escribimos la operación en una cadena
        sol = eval(sl) //convertimos la cadena a código y resolvemos
        pantalla.innerHTML = sol //mostramos la solución
        x = sol; //guardamos la solución
        op = "no"; //ya no hay operaciones pendientes
        xi = 1; //se puede reiniciar la pantalla.
    }
}

function raizc() {
    x = Math.sqrt(x) //resolver raíz cuadrada.
    pantalla.innerHTML = x; //mostrar en pantalla resultado
    op = "no"; //quitar operaciones pendientes.
    xi = 1; //se puede reiniciar la pantalla 
}

function porcent() {
    x = x / 100 //dividir por 100 el número
    pantalla.innerHTML = x; //mostrar en pantalla
    igualar() //resolver y mostrar operaciones pendientes
    xi = 1 //reiniciar la pantalla
}

function opuest() {
    nx = Number(x); //convertir en número
    nx = -nx; //cambiar de signo
    x = String(nx); //volver a convertir a cadena
    pantalla.innerHTML = x; //mostrar en pantalla.
}

function inve() {
    nx = Number(x);
    nx = (1 / nx);
    x = String(nx);
    pantalla.innerHTML = x;
    xi = 1; //reiniciar pantalla al pulsar otro número.
}

function retro() { //Borrar sólo el último número escrito.
    cifras = x.length; //hayar número de caracteres en pantalla
    br = x.substr(cifras - 1, cifras) //describir último caracter
    x = x.substr(0, cifras - 1) //quitar el ultimo caracter
    if (x == "") { x = "0"; } //si ya no quedan caracteres, pondremos el 0
    if (br == ".") { coma = 0; } //Si el caracter quitado es la coma, se permite escribirla de nuevo.
    pantalla.innerHTML = x; //mostrar resultado en pantalla	 
}

function borradoParcial() {
    pantalla.innerHTML = 0; //Borrado de pantalla;
    x = 0; //Borrado indicador número pantalla.
    coma = 0; //reiniciamos también la coma				
}

function borradoTotal() {
    pantalla.innerHTML = 0; //poner pantalla a 0
    x = "0"; //reiniciar número en pantalla
    coma = 0; //reiniciar estado coma decimal 
    ni = 0 //indicador de número oculto a 0;
    op = "no" //borrar operación en curso.
}