document.addEventListener('DOMContentLoaded', () => {
  const keyLayoutRU = [
    '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'sl', 'del',
    'caps lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
    'lShift', 'sl', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'arrorUp', 'rShift',
    'lCtrl', 'win', 'lAlt', 'space', 'rAlt', 'rCtrl', 'arrowLeft', 'arrowDown', 'arrowRight',
  ];

  const keyLayoutEN = [
    '~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
    'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'sl', 'del',
    'caps lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'ap', 'enter',
    'lShift', 'sl', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', 'arrorUp', 'rShift',
    'lCtrl', 'win', 'lAlt', 'space', 'rAlt', 'rCtrl', 'arrowLeft', 'arrowDown', 'arrowRight',
  ];
  let keyLayout = keyLayoutEN;
  let caps = false;

  const keyboard = document.createElement('div');

  function createLineBreak() {
    const brake = document.createElement('br');
    return brake;
  }
  // setup elements
  function createKeyboard() {
    keyLayout.forEach((element) => {
      const key = document.createElement('button');
      key.classList.add('keyboard__key');
      key.innerHTML = element;
      if (element === 'backspace' || element === 'enter' || element === 'lShift' || element === 'caps lock') {
        key.classList.add('keyboard__key_extra-wide');
      } else if (element === 'tab' || element === 'lCtrl' || element === 'rCtrl') {
        key.classList.add('keyboard__key_wide');
      } else if (element === 'space') {
        key.classList.add('keyboard__key_space');
      } else {
        key.classList.add('keyboard__key_regular');
      }

      keyboard.appendChild(key);

      if (element === 'backspace' || element === 'del' || element === 'enter' || element === 'rShift' || element === 'arrowRight') {
        keyboard.appendChild(createLineBreak());
      }
    });
    keyboard.classList.add('keyboard');
  }
  createKeyboard();
  // add to DOM

  document.body.appendChild(keyboard);

  // event handlers

  function switchLayout() {
    if (keyLayout === keyLayoutEN) {
      keyLayout = keyLayoutRU;
    } else {
      keyLayout = keyLayoutEN;
    }

    while (keyboard.childNodes.length !== 0) {
      keyboard.firstChild.remove();
    }
    createKeyboard();
  }
});
