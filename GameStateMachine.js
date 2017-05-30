function gofull() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

// do initial things
var bootState = {
    create: function() {
        game.state.start('load');
    }
};

//
var loadState = {
    preload: function() {
        // retrieve images, sounds,  etc. here
    },

    create: function() {
        game.stage.backgroundColor = '#4d4d4d';
        game.state.start('menu');
    }
};

var menuState = {
    create: function() {
        // menu items here

        // adjust volume

        // click or press (s) for start?

        // enter id
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.input.onDown.add(gofull, this);
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.S);

        wkey.onDown.addOnce(this.validate, this);
    },

    validate: function() {
        // check id, and retrieve trial table if valid

        game.state.start('play');
    }
};

var playState = {
    create: function() {
        // create perpetual things (keyboard feedback...)
        // initialize inner state machine (updated during update)

    },
    update: function() {
        // update state machine
    }
};