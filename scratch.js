
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-ex',
                           {create: create, update: update, render: render});

var rectangle;
var keys;

function create() {
    rectangle = game.add.graphics(game.world.centerX, game.world.centerY);
    rectangle.lineStyle(8, 0xff700B, 1);
    rectangle.beginFill(0xff0000);
    rectangle.drawRoundedRect(0, 0, 100, 100, 8);
    rectangle.endFill();
    keys = game.input.keyboard.addKeys({'h': Phaser.KeyCode.H, 'u': Phaser.KeyCode.U,
        'i': Phaser.KeyCode.I, 'l': Phaser.KeyCode.L});
}


GameState = {};
GameState.init = function() {
    this.keys = this.game.input.keyboard.addKeys({
        h: Phaser.KeyCode.H,
        u: Phaser.KeyCode.U,
        I: Phaser.KeyCode.I,
        L: Phaser.KeyCode.L
    });
    this.keys
};

GameState.update = function() {
    this._handleInput();
}

GameState._handleInput = function() {
    if (this.keys.h.isDown) {
        // color in
    } else if (this.keys.h.)
}
