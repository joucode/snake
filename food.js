function Food() {
  this.pos = createVector(round(random(0, 19)), round(random(0, 19)));

  this.render = function() {
    push();
    fill(255, 0, 0);
    rect(this.pos.x * 32, this.pos.y * 32, 32, 32);
    pop();
  }
}
