let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // tamanho em pixels de um quadrado
let snake = [];

snake[0] = {  // posição inicial da cobrinha 
    x: 8 * box,
    y: 8 * box
};

let direction = "right";

function gerarComida(){
    return {        
        x:Math.floor(Math.random() * 15 + 1) * box,
        y:Math.floor(Math.random() * 15 + 1) * box
    };
};

let food = gerarComida();
                    //Math.floor arredonda o numero pra baixo; 
                    //Math.ceil arredonda pra cima; 
                    //Math.round arredenda pro mais próximo; 
                    //Math.random escolhe um número aleatório entre 0 e 1
                    //Math é uma biblioteca de funções matemáticas


function criarBG(){
    context.fillStyle= "lightgreen"
    context.fillRect(0, 0, 16 * box, 16 * box); // background onde acontecerá o jogo
};

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle= "green";
        context.fillRect(snake[i].x, snake[i].y, box, box); 
    }           
};

function drawFood(){
    context.fillStyle= "red";
    context.fillRect(food.x, food.y, box, box); //coordenadas da comidinha
};

document.addEventListener("keydown", update);

function update(event){   // chama a função update e nesta função há um objeto passado por parâmetro(event)
                          // esse parâmetro é um objeto que possui uma propriedade chamada keycode

    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction ="right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
   
   document.getElementById("keydown_log").innerHTML= event.key + " (" + event.keyCode + ")";
}

function iniciarJogo(){     
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box;
    
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        };
    };

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();  /* retira o último quadrado */
    }
    else{
        food = gerarComida();
    };
    
    let newHead = {     /* novo quadrado */
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);     /* adiciona um novo elemento no começo de uma array */

}

let jogo = setInterval(iniciarJogo, 100);

