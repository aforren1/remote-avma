var fsm = new StateMachine({
  init: 'neutral',
  transitions: [{name: 'try', from: 'neutral', to: 'intrial'}, 
                {name: 'try', from: 'intrial', to: function() {
                                                     if (this.key_array[0][1] === 'h') {
                                                       return 'correct';
                                                     }
                                                     return 'incorrect';
                                                     }}, 
                {name: 'try', from: 'incorrect', to: 'intrial'}, 
                {name: 'try', from: 'correct', to: 'neutral'}
                ],
  methods: {
    onEnterNeutral: function() {
    // doesn't execute the very first time
      console.log('Entering neutral');
      this.t_wait = this.perf.now() + 500;
    },
    onLeaveNeutral: function() {
      return (this.perf.now()) >= this.t_wait;
    },
    onEnterIntrial: function() {
      console.log('Entering intrial');
      // draw image now, beep now
      this.trial_start = game.time.now;
      this.key_array.length = 0; // clear prev keys
      this.key_array = [0, 0];
      game.stage.backgroundColor = '0xaaaaaa';
    },
    onLeaveIntrial: function() {
      // check if any key press
      var res = this.key_array[0] !== 0;
      if (res) {
        console.log('Pressed ' + this.key_array[0][1]);
        console.log(this.key_array[0][0] - this.perf.timing.navigationStart - this.trial_start);
      }
      return res;
    },
    onEnterCorrect: function() {
      console.log('Enter correct');
      this.t_wait = this.perf.now() + 1000;
      game.stage.backgroundColor = '0x00ef00';
    },
    onLeaveCorrect: function() {
      var res = (this.perf.now() + this.fps) >= this.t_wait;
      if (res) {
        game.stage.backgroundColor = '0x000000';
      }
      return res;
    },
    onEnterIncorrect: function() {
      console.log('Enter incorrect');
      this.t_wait = this.perf.now() + 1000;
      game.stage.backgroundColor = '0xff00aa';
    },
    onLeaveIncorrect: function() {
      var res = (this.perf.now()) >= this.t_wait;
      if (res) {
        game.stage.backgroundColor = '0x000000';
      }
      return res;
    }

  },

  data: {
    perf: performance,
    fps: (1 / 60) * 1000,
    t_wait: 0,
    key_array: Array([0, 0]),
    trial_start: 0
  }

});