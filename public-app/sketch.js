const NGROK = `https://${window.location.hostname}`;
console.log('Server IP: ', NGROK);
let socket = io(NGROK, { path: '/real-time' });

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;
let usuario = {nombre:'',
              correo: '',
            edad: ''}
let userInput
let screen=2
let btn
let pantallaCelular
let btnenviar
let btnterminar

function preload(){
    
    datagano=loadImage('img/datagano.png')
    dataperdio=loadImage('img/dataperdio.png')
    gracias=loadImage('img/gracias.png')
    
    
  }

function setup() {
    frameRate(60);

    createCanvas(428, 926);
    

userInput = createInput('')
userInput.position(27, 335)
userInput.size(315,33)
userInput.input(myInputEvent)

nameInput = createInput('')
nameInput.position(27, 396)
nameInput.size(315,33)
nameInput.input(myInputEvent)

edadInput = createInput('')
edadInput.position(27, 457)
edadInput.size(315,33)
edadInput.input(myInputEvent)

    controllerX = windowWidth / 2;
    controllerY = windowHeight / 2;
    angleMode(DEGREES);

    socket.emit('device-size', {windowWidth, windowHeight});
    
	}
    


function draw() {
    rect(0,0,360,700)
    
    //console.log("X: " + parseInt(mouseX) + " Y: " + parseInt(mouseY));
    if (screen===1){
        //image(datagano,35,0,windowWidth,windowHeight);
        image(datagano,35,0,360,700);
        userInput.style('display', 'block');
        nameInput.style('display', 'block');
        edadInput.style('display', 'block');
       
        }

     if(screen===2){
        image(dataperdio,35,0,360,700);
        userInput.style('display', 'block');
        nameInput.style('display', 'block');
        edadInput.style('display', 'block');
     }

     if(screen===3){
        image(gracias,35,0,360,700)
        userInput.style('display', 'none');
        nameInput.style('display', 'none');
        edadInput.style('display', 'none');
        cambioPantalla()
     }

     if(pantallaCelular===6){
        screen=2
        pantallaCelular = 0
     }

     if(pantallaCelular===7 ||pantallaCelular===8 ||pantallaCelular===9){
        screen=1
        pantallaCelular = 0

     }


socket.emit('info', usuario);

    }



function myInputEvent(){
    usuario.correo=this.value()
    console.log(usuario.correo)
}

function myInputEvent(){
    usuario.nombre=this.value()
    console.log(usuario.nombre)
}
function myInputEvent(){
    usuario.edad=this.value()
    console.log(usuario.edad)
}

function cambioPantalla(){
    socket.emit('actual-screen',{screenController:screen})
}
 




/*function deviceMoved() {
    switch (interactions) {
        case 2:
            socket.emit('mobile-instructions', { interactions, rotationY, rotationZ });
            background(0, 255, 0);
            break;
    }
    
}*/

socket.on('pantalla-cel', message =>{
    let {pantallaController}=message
    pantallaCelular=pantallaController
    console.log(pantallaCelular)
})

function mousePressed(){
    if (mouseX > 61 && mouseX < 371 && mouseY > 518 && mouseY < 546 &&
        screen===1) {
    screen =3
    pantallaCelular=0
      }

      if (mouseX > 61 && mouseX < 371 && mouseY > 518 && mouseY < 546 &&
        screen===2) {
    screen =3
    pantallaCelular=0
      }
 }

