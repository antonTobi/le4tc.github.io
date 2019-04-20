Balls = []

function varyingradius() {
  return (20 + 10*sin(0.05*frameCount))
}

function Ball(p,v,r,color) {
  this.p = p
  this.v = v
  this.r = r
  this.m = r**2
  this.color = color
  this.bounceof = function(other) {
    if ((this.p.x - other.p.x)**2 + (this.p.y - other.p.y)**2 > (this.r + other.r)**2) return
    normal = p5.Vector.sub(other.p, this.p).normalize()
    v1 = p5.Vector.dot(this.v, normal)
    v2 = p5.Vector.dot(other.v, normal)
    if (v2 > v1) return
    x = (this.m*v1 + other.m*v2)/(this.m + other.m)
    this.v.add(p5.Vector.mult(normal, 2*(x-v1)))
    other.v.add(p5.Vector.mult(normal, 2*(x-v2)))
  }
  this.wallbounce = function() {
    for (c of ['x', 'y']) if (this.p[c] < this.r || this.p[c] > {x: width, y: height}[c]-this.r) this.v[c] *= -1
  }
  this.draw = function() {
    fill(this.color)
    circle(this.p.x, this.p.y, this.r)
  }
  Balls.push(this)
}
function setup() {
  createCanvas(windowWidth, windowHeight-50)
  // createButton('hey!')
}

function draw() {
  background('black')
  for (i = 0; i < Balls.length; i++) {
    b = Balls[i]
    b.wallbounce()
    fill('white')
    for (j = i+1; j < Balls.length; j++) {
      b.bounceof(Balls[j])
    }
    b.draw()
    b.p.add(b.v)
    b.v.mult(0.999)
  }
  if (mouseIsPressed) {
    stroke('white')
    strokeWeight(5)
    line(origin.x, origin.y, mouseX, mouseY)
    noStroke()
    fill(color)
    circle(origin.x, origin.y, varyingradius())
  }
}

function mousePressed() {
  origin = createVector(mouseX, mouseY)
  color = random(['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'cyan', 'pink'])
  // return false
}

function mouseReleased() {
  new Ball(origin, p5.Vector.sub(origin, createVector(mouseX,mouseY)).mult(0.03), varyingradius(), color)
}

function touchMoved() {
  //return false
}
