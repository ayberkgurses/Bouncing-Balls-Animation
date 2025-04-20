function Ball(x, y, r) {
    this.x = x;
    this.y = y;
    this.velx = random(3, 4);
    this.vely = random(3, 4);
    this.r = r;
    this.mass = this.r**2 * 10
    this.R = random(20, 80);
    this.G = random(100, 180);
    this.B = random(100, 180);
  
    this.display = function() {
      noStroke();
      fill(this.R, this.G, this.B);
      circle(this.x, this.y, this.r * 2);
    };
  
    this.update = function() {
      this.x += this.velx;
      this.y += this.vely;
    }
  
    this.intersects = function(other) {
          let d = dist(this.x, this.y, other.x, other.y);
      if (d <= this.r + other.r && this != other) {
        return true;
      } else {
        return false;
      }
    };
    this.changeDirection = function(other) {
      let initialX = this.velx;
      let initialY = this.vely
      this.velx = other.velx;
      this.vely = other.vely;
      other.velx = initialX;
      other.vely = initialY
    };
  
    this.bounceWalls = function() {
      if (this.x > width - this.r && this.velx > 0) {
        this.velx = -this.velx;
      }
      if (this.x < this.r && this.velx < 0) {
        this.velx = -this.velx;
      }
  
      if (this.y > height - this.r && this.vely > 0) {
        this.vely = -this.vely;
      }
      if (this.y < this.r && this.vely < 0) {
        this.vely = -this.vely;
      }
    };
    
    
  this.fixVelocity = function(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
  
    if (distance === 0) return;
  
    let nx = dx / distance;
    let ny = dy / distance;
  
    let tx = -ny;
    let ty = nx;
  
    let dpTan1 = this.velx * tx + this.vely * ty;
    let dpTan2 = other.velx * tx + other.vely * ty;
  
    let dpNorm1 = this.velx * nx + this.vely * ny;
    let dpNorm2 = other.velx * nx + other.vely * ny;
  
    let m1 = this.mass;
    let m2 = other.mass;
  
    let momentum1 = (dpNorm1 * (m1 - m2) + 2 * m2 * dpNorm2) / (m1 + m2);
    let momentum2 = (dpNorm2 * (m2 - m1) + 2 * m1 * dpNorm1) / (m1 + m2);
  
    this.velx = tx * dpTan1 + nx * momentum1;
    this.vely = ty * dpTan1 + ny * momentum1;
    other.velx = tx * dpTan2 + nx * momentum2;
    other.vely = ty * dpTan2 + ny * momentum2;
  };
  
  
    this.fixDistance = function(other) {
      let d = dist(this.x, this.y, other.x, other.y);
      let overlap = this.r + other.r - d;
      let phi = asin((this.y - other.y) / d);
      let overlapY = abs(sin(phi) * overlap);
      let overlapX = abs(cos(phi) * overlap);
      if (this.x > other.x) {
        this.x = this.x + overlapX;
        other.x = other.x - overlapX;
      } else {
        this.x = this.x - overlapX / 2;
        other.x = other.x + overlapX / 2;
      }if (this.y > other.y){
        this.y = this.y + overlapY /2;
        other.y = other.y - overlapY /2;
      }
    };
    
    this.fixDistance2 = function(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist = this.r + other.r;
  
    if (distance === 0) {
      dx = random(-1, 1);
      dy = random(-1, 1);
      distance = sqrt(dx * dx + dy * dy);
    }
  
    let overlap = minDist - distance;
    let offsetX = (dx / distance) * overlap / 2;
    let offsetY = (dy / distance) * overlap / 2;
  
    this.x += ((this.x - other.x)/abs(this.x - other.x)) * abs(offsetX);
    this.y += ((this.x - other.x)/abs(this.x - other.x)) * abs(offsetY);
    other.x += ((this.x - other.x)/abs(this.x - other.x)) * abs(offsetX);
    other.y += ((this.x - other.x)/abs(this.x - other.x)) * abs(offsetY);
    }
    
    
    this.velFixed = function(other) {
            let dx = other.x - this.x;
            let dy = other.y - this.y;
            let dvx = other.velx - this.velx;
            let dvy = other.vely - this.vely;
  
            return (dx * dvx + dy * dvy) < 0;
  
    }
  }
  