const NGROK = `https://${window.location.hostname}`;
//const LOCAL = `http://localhost:5050`;
let socket = io(NGROK, { path: '/real-time' });
console.log('Server IP: ', NGROK);

let controllerX = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;
let balls=[]
let balls2=[]
let boom=[]
let boom2=[]
let vidas=[]
let cantidadVidas=4
let score=0
let perdidas=0
let bombasr=0
let oreor=0
let pantalla=5
let pantallaMupi
let derecha=false
let izquierda=false
let signal
let ultraSonic=false
let presionado
let estado_presionado
let mySound
let time = 0;
let mySignal
socket.on('arduino', undido=>{
  let {boton}=undido
 presionado=boton
  //console.log(presionado)
  let vid
})


function preload(){
  oreo=loadImage('img/oreo.png')
  fondoJuego=loadImage('img/fondo juego.png')
  bomba=loadImage('img/bomba.png')
  vaso=loadImage('img/vaso.png')
  instrucciones1=loadImage('img/i1.png')
  instrucciones2=loadImage('img/i2.png')
  instrucciones3=loadImage('img/i3.png')
  perdio=loadImage('img/perdio.png')
  des10=loadImage('img/10.png')
  des30=loadImage('img/30.png')
  des50=loadImage('img/50.png')
  vidass=loadImage('img/vidas.png')
  gracias=loadImage('img/gracias.png')
  qr=loadImage('img/mupi.png')
  soundFormats('mp3');
  mySound = loadSound('img/audio.mp3');
}

//let anima
//
function setup() {

  
  createCanvas(788,1067)
    background(0)
    frameRate(32 );

    /*anima=createVideo('img/animacion.mp4')
    anima.hide()*/

   vid=createVideo('img/oreo.mp4')
  

    
    controllerX = 788 / 2;
    controllerY = windowHeight / 2;
    mupiWidth = windowWidth;
    mupiHeight = windowHeight;
    background(0);


    for(let i=0;i<4;i++){
        balls[i]=new Ball(oreo)
      }

      for(let i=0;i<2;i++){
        balls2[i]=new Ball(oreo)
      }

      for(let i=0;i<3;i++){
        boom[i]=new Boom(bomba)
      }

      for(let i=0;i<2;i++){
        boom2[i]=new Boom(bomba)
      }

      for (let i=0;i<4;i++){
        vidass[i]=new Vida(vidas)
      }
}

function validateColissionOreo(){
balls.forEach((cookie,i) => {
  if(dist(cookie.x, cookie.y, controllerX+280, windowHeight-375)<40){
    balls.splice(i,1);
    puntaje(5)
    console.log(score)
  }
  
});
}

function validateColissionOreo2(){
  balls2.forEach((cookie,i) => {
    if(dist(cookie.x, cookie.y, controllerX+280, windowHeight-375)<40){
      balls2.splice(i,1);
      puntaje(5)
      oreorecogidas(1)
    }
    
  });
  }

function validateColissionBomba(){
  boom.forEach((bomb,i) => {
    if(dist(bomb.x, bomb.y, controllerX+280, windowHeight-375)<40){
      console.log("funciona")
      boom.splice(i,1);
      menosPuntaje(3)
      console.log(score);
      background(255,0,0,70);
    }
    
  });
  }

  function validateColissionBomba2(){
    boom2.forEach((bomb,i) => {
      if(dist(bomb.x, bomb.y, controllerX+280, windowHeight-375)<40){
        console.log("funciona")
        boom2.splice(i,1);
        menosPuntaje(3)
        console.log(score);
        background(255,0,0,50);
  
        bombasrecogidas(1)
      }
      
    });
    }

function puntaje(number){
  score+=number

}

function menosPuntaje(number){
  score-=number

}

function galletasPerdidas(number){
perdidas += number
console.log(perdidas)
}

function bombasrecogidas(number){
  bombasr += number
}
function oreorecogidas(number){
  oreor += number
}

function perderVidas(){
  cantidadVidas-=1
}

function moreCookies(){
  
  balls.forEach((cookie,i) => {
    if(cookie.y > 1060){
      for (let i = 0; i < 3; i++) {
        balls.push(new Ball(oreo));
      }
      balls.splice(i,1);
      galletasPerdidas(1)
      cantidadVidas-=1
      
    }
cookie.show()
  })
}

function moreBomba(){
  
  boom.forEach((bomb,i) => {
    if(bomb.y > 1060){
      for (let i = 0; i < 2; i++) {
      boom.push(new Boom(bomba));
      }
      boom.splice(i,1);
}
bomb.show()
  })
}


function draw() {
  background(255);
  //mySound.play()
  
    console.log(presionado)
 //asignacion de objetos en cada pantalla 

/*if(mySound.isPlaying()){
  pantalla=9
}*/

if(pantalla===1){
  image(vid,0,0,788,1067)
}
  


if(pantalla===2){
  if(derecha){
    controllerX+=2
  }
    else if(izquierda){
    controllerX-=2
  }
  image(instrucciones1,0,0,788,1067)
  image(vaso,controllerX-310, windowHeight-350,400,370)

  setTimeout(() => {
    pantalla=3
  }, 7000);
}

if(pantalla===3){
  if(derecha){
    controllerX+=2.5
  }
    else if(izquierda){
    controllerX-=2.5
  }
    image(instrucciones2,0,0,788,1067)
    image(vaso,controllerX, windowHeight-350,400,370)
    

  for(let i=0;i<balls2.length;i++){
    balls2[i].move()
    balls2[i].show()
  }

  for(let i=0;i<boom2.length;i++){
    boom2[i].move()
    boom2[i].show()
  }
  validateColissionOreo2()
  validateColissionBomba2()
  setTimeout(() => {
    pantalla=4
  }, 11000);
}

if(pantalla===4){
  score=0
  image(instrucciones3,0,0,788,1067)
}

if (pantalla===5){
  
    if(derecha){
    controllerX+=5
  }
    else if(izquierda){
    controllerX-=5
  }
    image(fondoJuego,0,0,788,1067)
    image(vaso,controllerX, windowHeight-350,400,370)
    
    let primeraVida=570
    for(let i=0; i<cantidadVidas; i++){
      image(vidass, primeraVida,60,45,45)
      primeraVida +=40
    }

  for(let i=0;i<balls.length;i++){
    balls[i].move()
    balls[i].show()
  }

  for(let i=0;i<boom.length;i++){
    boom[i].move()
    boom[i].show()
  }
  validateColissionOreo()
  validateColissionBomba()
  moreCookies()
  moreBomba()
  fill(255)
  textSize(50)
  text(score,210,60,50,50)
  
}

if(pantalla===6){
  image(perdio,0,0,788,1067)
  image(qr,300,310,250,250)
  cambioPantalla()
}

if(pantalla===7){
  image(des10,0,0,788,1067)
  image(qr,65,640,250,250)
  cambioPantalla()
}

if(pantalla===8){
  image(des30,0,0,788,1067)
  cambioPantalla()
}

if(pantalla===9){
  image(des50,0,0,788,1067)
  cambioPantalla()
}

if(pantalla===10){
  image(gracias,0,0,788,1067)
}
/*if(pantalla===0 && signal===1){
  
  reproducir()
}*/
/*if(pantallaMupi===2){
  pantalla=2
  console.log(pantallaMupi)
}*/







if(pantalla===4 && presionado==='1'){
  pantalla=5
}

if(pantalla===1 && presionado==='1'){
  pantalla=2
  vid.stop()
}






if (perdidas===4){

  if(pantalla===5&& score<14){
    console.log('perdiste')
    pantalla=6
  }
  if(pantalla===5 && score>14&&score<=39 ){
    console.log('14/39')
    pantalla=7
  }
  
  if(pantalla===5 && score>40&&score<=69){
    console.log('40/69')
   pantalla=8
  }
  
  if(pantalla===5 && score>70&&score<=99){
    console.log('70/99')
    pantalla=9
  }

}

if(pantallaMupi===3){
  pantalla=10

}
//console.log(time)
//counter()
}

/*function counter() { 
  if (frameCount % 60 === 0) { 
      time++;
      if(time>1){
        time=0
      }
      }
  }*/

function mousePressed(){
    vid.play()
    console.log('reproduce')
  
  
}


function cambioPantalla(){
  socket.emit('actual-pantalla',{pantallaController:pantalla})
}






/*socket.on('mupi-instructions', instructions => {

  let { interactions } = instructions;
  switch (interactions) {
      case 2:
          let { rotationX, rotationY, rotationZ } = instructions;
          controllerY = (rotationX * mupiHeight) / 90;
          controllerX = (rotationY * mupiWidth) / 90;
          break;
  }


});*/


socket.on('pantalla-mupi',message =>{
  let{screenController}=message;
pantallaMupi=screenController

console.log(pantallaMupi)

})

socket.on('mupi-size', deviceSize => {
    let { windowWidth, windowHeight } = deviceSize;
    deviceWidth = windowWidth;
    deviceHeight = windowHeight;
    console.log(`User is using a smartphone size of ${deviceWidth} and ${deviceHeight}`);
    pantalla=10
});

socket.on('arduino', ubijoy=>{
  let {ubiy}=ubijoy
  if(ubiy>50 && controllerX<788){
    derecha=true
  }
  else{
    derecha=false
  }
  if(ubiy<50 && controllerX>0){
    izquierda=true
  }
  else{
    izquierda=false
  }
  /*controllerX=//map(ubiy,100,0,0,windowWidth)
  (ubiy*mupiWidth)*/
  console.log(ubijoy)
  //console.log(controllerX)
})

socket.on('arduino', active=>{
  let {sensor}=active
  if(sensor==1){
    ultraSonic=true
  }
  else{
    ultraSonic=false
  }
  signal=sensor
})



/*function mousePressed(){
  if(pantalla==0){
    pantalla=1
  }
}*/

/*function mousePressed(){
  console.log("holaaa")
  mySound.play()
}*/

class Ball{
    constructor(image){
      this.image=image
      this.x=Math.random()*700
      this.y=(windowHeight-windowHeight) - Math.random()*600
      this.r=100
      this.dirX=1
      this.dirY=1
      this.aceleracion=2
      this.aceleration()
    }
    aceleration(){
      setTimeout(() =>{
        this.acelaracion += 3
      },2000)}

    move(){
      this.y+=(this.aceleracion)*(this.dirY)
    }
    
    
    show(){
      image(this.image,this.x, this.y,this.r, this.r)
    }

  }

  class Boom{
    constructor(image){
      this.image=image
      this.x=Math.random()*700
      this.y=(windowHeight-windowHeight) - Math.random()*600
      this.dirX=1
      this.dirY=1
      this.aceleracion=2
      
    }
  
    move(){
      this.y+=(this.aceleracion)*(this.dirY)
    }
  
    show(){
      image(this.image,this.x, this.y,87, 139)
    }

  }

  class Vida{
    constructor(image){
      this.image=image
      this.x=570
      this.y=0
      this.size=60
    }
    show(){
      image(this.image,this.x, this.y,this.size, this.size)
    }
  }

