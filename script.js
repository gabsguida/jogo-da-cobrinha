let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // tamanho em pixels de um quadrado
let snake = [];

snake[0] = {  // posição inicial da cobrinha 
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

function criarBG(){
    context.fillStyle= "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box); // background onde acontecerá o jogo
};

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle= "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); // 
    }           
};

document.addEventListener("keydown", update);

function update(event){   // chama a função update e nesta função há um objeto passado por parâmetro(event)
                          // esse parâmetro é um objeto que possui uma propriedade chamada keycode

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction ="right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
   
   document.getElementById("keydown_log").innerHTML=event.key + " (" + event.keyCode + ")";
}

function iniciarJogo(){     
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
        
    criarBG();
    criarCobrinha();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    
    snake.pop();  /* retira o último quadrado */
    
    let newHead = {     /* novo quadrado */
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);     /* adiciona um novo elemento no começo de uma array */

}

let jogo = setInterval(iniciarJogo, 100);

