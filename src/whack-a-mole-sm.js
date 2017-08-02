var fsm = new StateMachine({
  init: 'begin',
  transitions: [{name: 'try', from: 'begin', to: 'neutral'},
                {name: 'try', from: 'neutral', to: 'intrial'},
                {name: 'try', from: 'intrial', to: function() {
                                                     if (this.key_array[0] === 0) {
                                                       return 'no';
                                                     } else if (this.key_array[0][1] === 'h') {
                                                       return 'correct';
                                                     }
                                                     return 'incorrect';
                }},
                {name: 'try', from: 'no', to: 'neutral'},
                {name: 'try', from: 'correct', to: 'neutral'},
                {name: 'try', from: 'incorrect', to: 'neutral'}],
  methods: {
    onLeaveBegin: function() {
      return game.scale.isFullScreen;
    },
    onEnterNeutral: function() {
      console.log('Entering neutral');
      this.t_wait = this.perf.now() + 500;
      game.stage.backgroundColor = '0x000000';
      sprite_stimulus.tint = '0xffffff';
      sprite_default.visible = true;
      this.key_array.length = 0; // clear prev keys
      this.key_array = [0, 0];
      this.trial_start = game.time.now;
    },
    onLeaveNeutral: function() {
      return (this.perf.now()) >= this.t_wait;
    },
    onEnterIntrial: function() {
      console.log('Entering intrial');
      // draw image now, beep now
      this.t_wait = this.trial_start + 500 + randInt(200, 500);
      sprite_default.visible = false;
      sprite_stimulus.visible = true;
    },
    onLeaveIntrial: function() {
      var res = game.time.now >= this.t_wait || this.key_array[0] !== 0;
      if (res) {
        console.log('Pressed ' + this.key_array[0][1]);
        console.log(this.key_array[0][0] - this.perf.timing.navigationStart - this.trial_start);
      }
      return res;
    },
    onEnterNo: function() {
      console.log('Entering none');
      game.stage.backgroundColor = '0xff0000';
      sprite_stimulus.visible = false;
      this.t_wait = this.perf.now() + 500;
    },
    onLeaveNo: function() {
      // wait for time elapsed AND keypress
      return this.perf.now() >= this.t_wait && game.scale.isFullScreen && this.key_array[0] !== 0;
    },
    onEnterCorrect: function() {
      console.log('Entering correct');
      sprite_stimulus.tint = '0x00ff00';
      this.t_wait = this.perf.now() + 500;
    },
    onLeaveCorrect: function() {
      return this.perf.now() >= this.t_wait && game.scale.isFullScreen;
    },
    onEnterIncorrect: function() {
      console.log('Entering incorrect');
      sprite_stimulus.tint = '0x0000ff';
      this.t_wait = this.perf.now() + 500;
    },
    onLeaveIncorrect: function() {
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

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}