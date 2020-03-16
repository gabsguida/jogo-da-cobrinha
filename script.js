let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

function criarBG(){
    context.fillStyle= "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box);
};

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle= "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); 
    }           
            /* cobrinha criada. Agora é necessário adicionar uma variável 
            que irá se acrescentar a este quadrado */
};

function iniciarJogo(){
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

    /* Agora precisamos adicionar um elemento que irá fazer com que
    a cobrinha passe do outro lado da box */

    
}

let jogo = setInterval(iniciarJogo, 100);

