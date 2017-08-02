var fsm = new StateMachine({
  init: 'begin',
  transitions: [{ name: 'try', from: 'begin', to: 'neutral' },
  { name: 'try', from: 'neutral', to: 'intrial' },
  {
    name: 'try', from: 'intrial', to: function () {
      if (this.key_array[0][1] === 'h') {
        return 'correct';
      }
      return 'incorrect';
    }
  },
  { name: 'try', from: 'incorrect', to: 'intrial' },
  { name: 'try', from: 'correct', to: 'neutral' }
  ],
  methods: {
    onLeaveBegin: function () {
      return game.scale.isFullScreen;
    },
    onEnterNeutral: function () {
      console.log('Entering neutral');
      this.t_wait = this.perf.now() + 500;
      sprite_stimulus.visible = false;
      sprite_default.visible = true;
    },
    onLeaveNeutral: function () {
      return (this.perf.now()) >= this.t_wait;
    },
    onEnterIntrial: function () {
      console.log('Entering intrial');
      // draw image now, beep now
      this.trial_start = game.time.now;
      this.key_array.length = 0; // clear prev keys
      this.key_array = [0, 0];
      sprite_default.visible = false;
      sprite_stimulus.visible = true;
      sprite_stimulus.tint = '0xffffff';
    },
    onLeaveIntrial: function () {
      // check if any key press
      var res = this.key_array[0] !== 0;
      if (res) {
        console.log('Pressed ' + this.key_array[0][1]);
        console.log(this.key_array[0][0] - this.perf.timing.navigationStart - this.trial_start);
      }
      return res;
    },
    onEnterCorrect: function () {
      console.log('Enter correct');
      this.t_wait = this.perf.now() + 1000;
      sprite_stimulus.tint = '0x00ef00';
    },
    onLeaveCorrect: function () {
      return this.perf.now() >= this.t_wait && game.scale.isFullScreen;
    },
    onEnterIncorrect: function () {
      console.log('Enter incorrect');
      this.t_wait = this.perf.now() + 1000;
      sprite_stimulus.tint = '0xff00aa';
    },
    onLeaveIncorrect: function () {
      return this.perf.now() >= this.t_wait && game.scale.isFullScreen;
    }

  },

  data: {
    perf: performance,
    t_wait: 0,
    key_array: Array([0]),
    trial_start: 0
  }

});