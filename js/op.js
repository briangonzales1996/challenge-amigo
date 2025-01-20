const usuarios = [];

const addNames = (name)=>{
    usuarios.push(name)
    const winnerConatiner = document.getElementById('cartel-winner')
    winnerConatiner.innerHTML='';
    const contenedor = document.getElementById('usuarios');
    let fragment = document.createDocumentFragment();
    contenedor.innerHTML ='';
    usuarios.forEach((usuario)=>{
        fragment = agregarHTML(fragment,usuario);
        
    })
    contenedor.appendChild (fragment);
}



const agregarHTML = (fragment='',name='',texto='') =>{
    const parrafo = document.createElement('P');
    parrafo.textContent =  texto + name ;
    fragment.appendChild(parrafo);
    return fragment;
}

//add cartel of winner
const agregarHtmlWinner = (usuarios,winner) =>{
    let fragment = document.createDocumentFragment();
   // alert('el ganador del sorteo es '+ usuarios[winner]);
    const winnerConatiner = document.getElementById('cartel-winner');
    winnerConatiner.innerHTML='';
    fragment= agregarHTML(fragment,usuarios[winner],'El ganador del sorteo es: ');
    winnerConatiner.appendChild(fragment);
    
}

const selectUser = ()=>{
    const winner = Math.floor(Math.random()*usuarios.length)
    agregarHtmlWinner(usuarios,winner)
}


//boton de sortear usuario
const sortearUser = (e)=>{
    usuarios.length>=5?selectUser():alert("debe por lo menos 5 participantes")
}


//agregar usuario para el sorteo
function handleClick(e) {
    e.preventDefault();
    const name = document.querySelector('#valueNombre');
    if(name.value.length>1 && typeof name !== Number){
        addNames(name.value)
        name.value = "";
    }
    else alert("ingrese un nombre valido" );
}



//INCIO DEL PROGRAMA
const add = document.querySelector("#agregar");
const sortear = document.querySelector('#sortear');
add.addEventListener('click',handleClick);
sortear.addEventListener('click',sortearUser)
