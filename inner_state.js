
var fsm = new StateMachine({
    init: 'start',
    transitions: [
        {name: 'try', from: 'start', to: 'middle'},
        {name: 'try', from: 'middle', to: 'end'},
        {name: 'try', from: 'end', to: 'start'}
    ],
    methods: {
        onLeaveMiddle: function() {
            console.log('Try transition');
            return(this.flag1);
        },
        onLeaveEnd: function() {
            console.log('Will we reach the end?');
            return(this.flag2);
        }
    },
    data: {
        flag1: true,
        flag2: false
    }
});
