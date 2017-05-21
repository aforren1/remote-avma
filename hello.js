
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-ex',
                           {create: create, update: update, render: render});

var rectangle;
var circle;

function create() {
    rectangle = game.add.graphics(game.world.centerX, game.world.centerY);
    rectangle.lineStyle(8, 0xff700B, 1);
    rectangle.beginFill(0xff0000);
    rectangle.drawRoundedRect(0, 0, 100, 100, 8);
    rectangle.endFill();

    circle = game.add.graphics(0, 0);
    circle.lineStyle(6, 0xff800a, 0.5);
    circle.beginFill(0x00ffdd);
    circle.drawCircle(100, 300, 80);
    circle.endFill();
    game.stage.backgroundColor = '#4d4d4d';
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // maintain aspect ratio
    game.input.onDown.add(gofull, this);
}

function gofull() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

function update() {

}

function render () {
    game.debug.inputInfo(32, 32);
}
