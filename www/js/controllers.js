angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /* co-created with Rémi -> https://github.com/strowbeary
 thank you */

class SineCanvas{
    constructor() {
        this.canvas = document.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.drawers = [];

        this.addEventListener();
    }

    update() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        for (let child of this.drawers) {
            child.update();
        }
        requestAnimationFrame(() => this.update())
    }

    onResize() {
        this.canvas.width = window.innerWidth = 600;
        this.canvas.height = window.innerHeight;
        for (let drawer of this.drawers) (
            drawer.init()
        )
    }

    addChild(child) {
        this.drawers.push(child);
        this.onResize();
        this.update();
    }

    addEventListener() {
        window.addEventListener('resize', () => this.onResize());
    }
}

class SineWave {
    constructor(options, canvas) {
        this.options = {
            pointSpacing: 10,
            amplitude: 55,
            lineNumber: 6,
            particuleAlpha: 0.8,
            dx: 0.20, //taille d'une periode
            lineSpacing: 20,
            theta: 0.02, //vitesse
            periodOffset: 0,
            dotColor: "white",
            maxDotSize: 3,
            minDotSize: 0.1
        };
        this.curveOffset = 0;
        this.canvas = canvas;
        this.options = Object.assign(this.options, options);
        this.points = [];
        this.pointsZ = [];
    }

    init() {
        let canvasHeight = this.canvas.canvas.height;
        this.points = Array(Math.floor(canvasHeight / this.options.pointSpacing))
            .fill(0, 0, Math.floor(canvasHeight / this.options.pointSpacing) - 1);
        this.pointsZ = Array(Math.floor(canvasHeight / this.options.pointSpacing))
            .fill(0, 0, Math.floor(canvasHeight / this.options.pointSpacing) - 1);
    }

    update(){
        this.curveOffset += this.options.theta;
        let x = this.curveOffset;
        for(let i = 0; i < this.points.length; i++) {
            this.points[i] = Math.sin(x + this.options.periodOffset) * this.options.amplitude;  // Math.log(i / 50);
            this.pointsZ[i] = (Math.sin(x + this.options.periodOffset + Math.PI / 2) + 1 + this.options.minDotSize)/ 2;
            x += this.options.dx;
        }
        this.draw();
    }

    draw(){
        let canvasWidth = this.canvas.canvas.width;
        let ctx = this.canvas.ctx;

        ctx.fillStyle = this.options.dotColor;
        for (let i = 0; i < this.options.lineNumber; i++) {
            for (let n = 0; n < this.points.length; n++) {
                ctx.beginPath();
                ctx.ellipse(
                    (canvasWidth - (this.options.lineNumber * this.options.pointSpacing / 2)) / 2 + this.points[n] - i * 10,
                    n * this.options.lineSpacing - i * 10,
                    this.options.maxDotSize * this.pointsZ[n],
                    this.options.maxDotSize * this.pointsZ[n],
                    0,
                    0,
                    2 * Math.PI
                );
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}


let sineCanvas = new SineCanvas();

sineCanvas.addChild(
    new SineWave({
        lineNumber: 1,
        amplitude: 55,
        theta: 0.035,
        maxDotSize: 2.5,
        minDotSize: 0.4
    }, sineCanvas)
);

sineCanvas.addChild(
    new SineWave({
        periodOffset: Math.PI,
        lineNumber: 1,
        amplitude: 55,
        theta: 0.035,
        maxDotSize: 2.5,
        minDotSize: 0.4
    }, sineCanvas)
);

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true

  };
  $(document).ready(function(){
    
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://s-media-cache-ak0.pinimg.com/originals/30/9b/58/309b58c5153182dc480d429d21bb1ec1.png",
"https://s-media-cache-ak0.pinimg.com/originals/4b/ae/6c/4bae6cba8ec4060b5c4059ad2ce9c329.png",
"https://s-media-cache-ak0.pinimg.com/originals/b6/df/d7/b6dfd79c625f9ebe14709a9b75224962.png",
"https://s-media-cache-ak0.pinimg.com/originals/76/e7/a3/76e7a392abff7c8a22969f7c95f37d4c.png",
"https://s-media-cache-ak0.pinimg.com/originals/cb/ca/50/cbca50fc5156fb15b68bd3ab5dae6e06.png",
"https://s-media-cache-ak0.pinimg.com/originals/de/b9/70/deb9709e87f1d5b7f6457e8286113012.png",
"https://s-media-cache-ak0.pinimg.com/originals/29/9e/c7/299ec7c3cd62b88dd4905ffc6a71d8f9.png",
"https://s-media-cache-ak0.pinimg.com/originals/74/11/00/74110094c67aa9a519c70ecb7cec7d76.png",
"http://diysolarpanelsv.com/images/neville-clipart-4.png",
"https://s-media-cache-ak0.pinimg.com/originals/30/9b/58/309b58c5153182dc480d429d21bb1ec1.png",
"https://s-media-cache-ak0.pinimg.com/originals/4b/ae/6c/4bae6cba8ec4060b5c4059ad2ce9c329.png",
"https://s-media-cache-ak0.pinimg.com/originals/b6/df/d7/b6dfd79c625f9ebe14709a9b75224962.png",
"https://s-media-cache-ak0.pinimg.com/originals/76/e7/a3/76e7a392abff7c8a22969f7c95f37d4c.png",
"https://s-media-cache-ak0.pinimg.com/originals/cb/ca/50/cbca50fc5156fb15b68bd3ab5dae6e06.png",
"https://s-media-cache-ak0.pinimg.com/originals/de/b9/70/deb9709e87f1d5b7f6457e8286113012.png",
"https://s-media-cache-ak0.pinimg.com/originals/29/9e/c7/299ec7c3cd62b88dd4905ffc6a71d8f9.png",
"https://s-media-cache-ak0.pinimg.com/originals/74/11/00/74110094c67aa9a519c70ecb7cec7d76.png",
"http://diysolarpanelsv.com/images/neville-clipart-4.png"
];
// verificacion de los clicks
function clicked() { 
    if ($(this).find(".inner-wrap").hasClass("flipped")) {
        return;
    }
    $(this).find(".inner-wrap").toggleClass("flipped");
    checkArray.push($(this).find("img").attr("src"));
    idArray.push($(this).attr("id"));
    check();
}

$(".carta").on("click", clicked);
    
//reiniciar el juego
function reiniciar() {
    $(".atras").find("img").remove(); //quitar todas las imagenes actuales
    $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
    checkArray = []; 
    idArray = [];
    contador = 0; 
    fin = 0;
    iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
    if (fin === 18) { //si todas las cartas estan volteadas
        alert("Juego finalizado, lo has logrado en " + contador + " intentos");
        reiniciar();
    }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

    

    var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
    for (var i = 0; i < fields.length; i++) {
        var img = document.createElement("img");
        img.src = arr[i];
        fields[i].appendChild(img);
    }


}

function check() {
  //si los fields se  han hecho dos clicks 
    if (checkArray.length === 2) {
        $(".carta").off("click", clicked); 
        setTimeout(function(){
      //si no hay match
            if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
                $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
                $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
                contador++;
                //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
                idArray = []; 
        //habilitar el click de nuevo
                $(".carta").on("click", clicked);
            } else {

                contador++;
        
                fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
                //vaciar los dos arrays
        checkArray = []; 
                idArray = []; 
                verificarFin(); 
                $(".carta").on("click", clicked); 
            }
            document.querySelector(".counter").innerHTML = contador;
        }, 800);    
    }
}



iniciarJuego();

});
});
