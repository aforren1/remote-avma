
var fsm = StateMachine.create({
    initial: 'pretrial',
    events: [
        {name: 'try_next', from: 'pretrial', to: 'intrial'},
        {name: 'try_next', from: 'intrial', to: 'posttrial'},
        {name: 'try_next', from: 'posttrial', to: 'feedback'}
    ],
    callbacks: {
        onbeforetry_next: function(event, from, to, flags) { }
    }
})