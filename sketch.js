let field;
let particles = [];
let BG = 0;
let FG = 220;
let loop = true;
let image;

function preload() {
  image = loadImage("assets/girl-portrait.jpg");
}

function setup() {
  createCanvas(750, 800);
  background(BG);
  frameRate(60);
  stroke(FG);
  noFill();
  // pixelDensity(1);
  image.loadPixels();
  // loadPixels();
  particles = [...Array(2000).keys()].map(() =>
    Particle(createVector(randomWidth(), randomHeight()))
  );
  field = Matrix(32, 32);
  field.fill(
    (_, __, ix) =>
      // createVector(
      //   Math.sin(((ix + 8) / field.length) * 8) * 4,
      //   Math.cos(((ix + 8) / field.length) * 8) * 4
      // )
      createVector(
        Math.sin((ix + 8) / field.length) * 4,
        Math.cos(((ix + 8) / field.length) * 2)
      )
    // createVector(0, 1)
  );
  stroke(FG, 75);
}

function draw() {
  background(BG, 20);
  particles.forEach(particle => {
    let gradient = field.seek(particle.pos);
    let x = Math.round(particle.pos.x);
    let y = Math.round(particle.pos.y);
    let loc = (x + y * image.width) * 4;
    let r = image.pixels[loc];
    let g = image.pixels[loc + 1];
    let b = image.pixels[loc + 2];
    let a = image.pixels[loc + 3];
    let opa = (r + g + b) / 3;
    let s = opa / 100;
    let d = opa > 40 ? opa : 0;
    // console.log(b);
    // stroke((b / 10) ** 3, 50);
    stroke(r, g, b, d);
    particle.update(gradient.val);
    ellipse(particle.pos.x, particle.pos.y, s, s);
    if (!particle.isAlive() || !d) {
      particle.pos.y = randomHeight();
      particle.pos.x = randomWidth();
      particle.vel = gradient.val.copy();
    }
  });
}

window.addEventListener("mousedown", () => {
  loop = !loop;
});
