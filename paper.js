function paper(in_val) {
  background(220);
  noStroke();
  for (var i = 0; i < width - 1; i += 2) {
    for (var j = 0; j < height - 1; j += 2) {
      fill(random(235 - 40, 235 + 30), in_val);
      rect(i, j, 2, 2);
    }
  }

  for (var i = 0; i < 30; i++) {
    fill(random(60, 170), random(in_val * 2.5, in_val * 3));
    rect(
      random(0, width - 2),
      random(0, height - 2),
      random(1, 3),
      random(1, 3)
    );
  }
}
