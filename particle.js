const Particle = position => {
  let pos = position;
  let vel = createVector(random(-1, 1), random(-1, 1));
  let acc = createVector(0, 0);
  let att = 0.05;

  const render = () => {
    // let v = p5.Vector.mult(vel, 2);
    // line(pos.x, pos.y, pos.x + v.x, pos.y + v.y);
    // ellipse(pos.x, pos.y, 2, 2);
    // point(pos.x, pos.y);
  };

  const update = val => {
    if (!val) {
      return;
    }
    // stroke(
    //   (width / pos.x) * 100,
    //   map(pos.x, 0, width, 0, 255),
    //   val.mag() * 200,
    //   map(Math.abs(pos.y - height / 2), 0, height / 2, 100, 0)
    // );
    acc.add(val).mult(Math.random() * 0.33);
    vel.add(acc);
    vel.limit(0.75);
    pos.add(vel);
    // render();
  };

  const isAlive = () =>
    1 < pos.x && pos.x < width - 1 && 1 < pos.y && pos.y < height - 1;

  return {
    pos,
    update,
    render,
    isAlive
  };
};
