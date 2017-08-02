
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
    create: create,
    update: update
},
 false,
 false);

function gofull() {
    game.scale.startFullScreen();
}

var sprite;
var sprite2;
var sprite3;

function create() {
    sprite = createStimulus([game.width, game.height], [0, 1, 2], [0, 1, 2]);
    sprite.scale.setTo(0.3, 0.3);
    sprite2 = createStimulus([game.width, game.height], [0, 2, 4], [0, 1, 2]);
    sprite2.scale.setTo(0.3, 0.3);
    sprite3 = createStimulus([game.width, game.height], [], []);
    sprite3.scale.setTo(0.3, 0.3);
    sprite.visible = false;
    sprite2.visible = false;

    //game.input.onDown.add(changeTint, this);
    game.time.advancedTiming = true;
    game.time.desiredFps = (1 / game.time.suggestedFps) * 1000;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.input.onDown.add(gofull, this);
    keys = game.input.keyboard.addKeys({
        'h': Phaser.Keyboard.H,
        'u': Phaser.Keyboard.U
    });
    keys.h.onDown.add(onDownFn, this);
    keys.u.onDown.add(onDownFn, this);
}

function onDownFn(key) {
  if (fsm.key_array[0] === 0) {
    fsm.key_array[0] = [key.timeDown, key.event.key];
  } else {
    fsm.key_array.push([key.timeDown, key.event.key]);
  }
}

function update() {
    //sprite.rotation += 0.02;
    fsm.try();
}
