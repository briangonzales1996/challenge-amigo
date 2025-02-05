const usuarios = [];

const limpiarHTML = () => {
    const winnerConatiner = document.getElementById('cartel-winner')
    winnerConatiner.innerHTML = '';
    const contenedor = document.getElementById('usuarios');
    contenedor.innerHTML = '';
    return contenedor;
}

const limpiarInput = (advertencia) => {
    const valueName = document.getElementById("valueNombre");
    valueName.value = '';
    if (advertencia) alert(advertencia);
}

const addNames = (name) => {
    let fragment = document.createDocumentFragment();
    usuarios.push(name);
    const contenedor = limpiarHTML();
    usuarios.forEach((usuario) => {
        fragment = agregarHTML(fragment, usuario);
    })
    contenedor.appendChild(fragment);
}



const agregarHTML = (fragment = '', name = '', texto = '') => {
    const parrafo = document.createElement('P');
    parrafo.textContent = texto + name;
    fragment.appendChild(parrafo);
    return fragment;
}

//add cartel of winner
const agregarHtmlWinner = (usuarios, winner) => {
    let fragment = document.createDocumentFragment();
    // alert('el ganador del sorteo es '+ usuarios[winner]);
    const winnerConatiner = document.getElementById('cartel-winner');
    winnerConatiner.innerHTML = '';
    fragment = agregarHTML(fragment, usuarios[winner], 'El ganador del sorteo es: ');
    winnerConatiner.appendChild(fragment);

}

const selectUser = () => {
    const winner = Math.floor(Math.random() * usuarios.length)
    agregarHtmlWinner(usuarios, winner)
}


//boton de sortear usuario
const sortearUser = (e) => {
    usuarios.length >= 5 ? selectUser() : alert("debe por lo menos 5 participantes")
}

const verificarLetras = (verificar) => {
    let comprobar = true;
    for (let i = 0; i < verificar.length; i++) {
        if (!isNaN(parseInt(verificar[i]))){
            return false
        }
    }
    return comprobar;
}

//evaluar el nombre valido
const agregarParticipantes = (verificar) => {
    const input = document.querySelector('#valueNombre');

    if (verificar.length > 1 && verificarLetras(verificar) && isNaN(verificar)) {
        addNames(verificar);
        input.value = '';

    }
    else {
        limpiarInput();
        alert("ingrese un nombre valido y que no contenga numeros");
    }
}

const verificarNameRepeat = (verificar, condicion) => {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i] === verificar) condicion = true;
    }
    return condicion
}




//agregar usuario para el sorteo
function handleClick(e) {
    e.preventDefault();
    const name = document.querySelector('#valueNombre');
    const verificar = name.value.toLowerCase();
    let condicion = false;
    condicion = verificarNameRepeat(verificar, condicion);
    condicion ?
        limpiarInput('El nombre ya se encuentra registrado')
        : agregarParticipantes(verificar);
}



//INCIO DEL PROGRAMA
const add = document.querySelector("#agregar");
const sortear = document.querySelector('#sortear');
add.addEventListener('click', handleClick);
sortear.addEventListener('click', sortearUser);
