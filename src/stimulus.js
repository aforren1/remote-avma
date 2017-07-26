function createStimulus(window_dims, inner_on_inds = [], outer_on_inds = [],
                        line_width = 20, circle_width = 40) {
// window_dims = [window.innerWidth, window.innerHeight]
//
  console.log(window_dims);
  var scaling_factor = window_dims.min();
  var graphics = game.add.graphics(0, 0);
  var indices = [
    [1 * scaling_factor, 0],
    [0.5 * scaling_factor, 0.5 * Math.sqrt(3) * scaling_factor],
    [-0.5 * scaling_factor, 0.5 * Math.sqrt(3) * scaling_factor],
    [-1 * scaling_factor, 0],
    [-0.5 * scaling_factor, -0.5 * Math.sqrt(3) * scaling_factor],
    [0.5 * scaling_factor, -0.5 * Math.sqrt(3) * scaling_factor]
  ];

  var colours = [0x000000, 0xffffff];

  // outer lines
  graphics.moveTo(indices[0][0], indices[0][1]);
  for (ii = 0; ii < indices.length; ii++) {
    graphics.lineStyle(line_width, colours[outer_on_inds.indexOf(ii) == -1 ? 0 : 1], 1);
    if (ii === indices.length - 1) {
      end_inds = indices[0];
    } else {
      end_inds = indices[ii + 1];
    }
    graphics.lineTo(end_inds[0], end_inds[1]);
  }
  // inner lines
  for (ii = 0; ii < indices.length; ii++) {
    graphics.lineStyle(line_width, colours[inner_on_inds.indexOf(ii) == -1 ? 0 : 1], 1);
    graphics.moveTo(0, 0);
    graphics.lineTo(indices[ii][0], indices[ii][1]);
  }
  // draw concealer circles (for connection points)
  graphics.beginFill(0xffffff);
  graphics.lineStyle(1, 0xffffff, 1);
  graphics.drawCircle(0, 0, circle_width);
  for (ii = 0; ii < indices.length; ii++) {
    graphics.drawCircle(indices[ii][0], indices[ii][1], circle_width);
  }

  // convert to image (easy manipulation/movement)
  // use image rather than sprite, don't need physics
  var sprite = game.add.image(window_dims[0], window_dims[1], graphics.generateTexture());
  sprite.anchor.set(0.5);
  graphics.destroy();
  return sprite;
}