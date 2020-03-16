let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; // tamanho em pixels de um quadrado
let snake = [];

snake[0] = {  // posição inicial da cobrinha 
    x: 8 * box,
    y: 8 * box
};

let direction = "right";
let ponto = 0;

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
    context.fillStyle= "lightpink"
    context.fillRect(0, 0, 16 * box, 16 * box); // background onde acontecerá o jogo
};

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle= "black";
        context.fillRect(snake[i].x, snake[i].y, box, box); 
    }           
    
    document.getElementById("snakeX").innerHTML = snake[0].x / box;
    document.getElementById("snakeY").innerHTML = snake[0].y / box;
};

function drawFood(){
    //context.fillStyle= "red"; 
    //context.fillRect(food.x, food.y, box, box); //coordenadas da comidinha
    let apple = document.getElementById("apple");
    context.drawImage(apple, food.x, food.y);
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
    if(snake[0].x > 15 * box ) snake[0].x = 0;
    if(snake[0].x < 0) snake[0].x = 15 * box;
    if(snake[0].y > 15 * box ) snake[0].y = 0;
    if(snake[0].y < 0) snake[0].y = 15 * box;
    
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :(');
        };
    };
  
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
        ponto++;
        document.getElementById("pontos").innerHTML= ponto;
    };
    
    let newHead = {     /* novo quadrado */
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);     /* adiciona um novo elemento no começo de uma array */
    criarBG();
    criarCobrinha();
    drawFood();
}

let jogo = setInterval(iniciarJogo, 100);

