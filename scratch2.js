
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
