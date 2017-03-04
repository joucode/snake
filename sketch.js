var grid;
var dir;
var snake = [];
var food;
var score = 0;
var growing = false;
var up;
var down;
var right;
var left;
var frameCount = 0;
var hasMoved = false;

function setup() {
  createCanvas(640, 640);
  frameRate(60);

  up = createVector(0, -1);
  down = createVector(0, 1);
  right = createVector(1, 0);
  left = createVector(-1, 0);

  dir = createVector(1, 0);
  snake.push(createVector(5, 5));
  grid = new Array(32);
  for(var i = 0; i < 32; i++) {
    grid[i] = new Array(32);
    for(var j = 0; j < 32; j++) {
      grid[i][j] = 0;
    }
  }
  grid[10][10] = 1;
  food = new Food();

}

function keyPressed() {
  if(hasMoved) {
    return;
  }
  if(keyCode == UP_ARROW) {
    if(dir.equals(left) || dir.equals(right)) {
      dir = createVector(0, -1);
      hasMoved = true;
    }
  } else if(keyCode == LEFT_ARROW) {
    if(dir.equals(up) || dir.equals(down)) {
      dir = createVector(-1, 0);
      hasMoved = true;
    }
  } else if(keyCode == RIGHT_ARROW) {
    if(dir.equals(up) || dir.equals(down)) {
      dir = createVector(1, 0);
      hasMoved = true;
    }
  } else if(keyCode == DOWN_ARROW) {
    if(dir.equals(left) || dir.equals(right)) {
      dir = createVector(0, 1);
      hasMoved = true;
    }
  }
}

function draw() {
  frameCount++;
  background(20);
  food.render();
  snake.forEach(function(block) {
    rect(block.x * 32, block.y * 32, 32, 32);
  });


  if(snake[0].x == food.pos.x && snake[0].y == food.pos.y) {
    score++;
    food = new Food();
    // var done = false;
    // var found = false;
    // while(!done) {
    //   for(var i = 0; i < snake.length; i++) {
    //     if (snake[i].x === food.pos.x && snake[i].y === food.pos.y) {
    //       food = new Food();
    //       found = true;
    //       break;
    //     }
    //   }
    //   if(!found) {
    //     done = true;
    //   }
    // }
    growing = true;

  }
  var dead = false;
  snake.forEach(function(block) {

    if(block != snake[0]) {
      if(block.x == snake[0].x && block.y == snake[0].y) {
        dead = true;
        score = 0;
      }
    }
  });
  if(dead) {
    snake = [];
    snake.push(createVector(5, 5));
  }

  if(frameCount % 8 == 0) {
    move();
    hasMoved = false;
  }
  if(snake[0].x > 19 || snake[0].x < 0 || snake[0].y > 19 || snake[0].y < 0) {
    snake = [];
    snake.push(createVector(5, 5));
    score = 0;
  }
  fill(255);
  textSize(30);
  text(score, 20, 40);

}

function move() {
  snake.unshift(createVector(snake[0].x + dir.x, snake[0].y + dir.y));
  if(!growing) {
    snake.splice(snake.length - 1, 1);
  }
  growing = false;
}
