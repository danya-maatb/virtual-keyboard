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
    'lShift', 'sl', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', 'comma', '/', 'arrorUp', 'rShift',
    'lCtrl', 'win', 'lAlt', 'space', 'rAlt', 'rCtrl', 'arrowLeft', 'arrowDown', 'arrowRight',
  ];

  const keyLayoutFunctional = [
    'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
    'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
    'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
    'ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Period', 'Comma', 'Slash', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
  ];

  let keyLayout;
  if (localStorage.getItem('keyLayout') === null) {
    keyLayout = keyLayoutEN;
  } else {
    keyLayout = localStorage.getItem('keyLayout').split(',');
  }
  let caps = false;

  const keyboard = document.createElement('div');
  const textarea = document.createElement('textarea');
  textarea.readOnly = true;

  function createLineBreak() {
    const brake = document.createElement('br');
    return brake;
  }

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
    localStorage.setItem('keyLayout', keyLayout.toString());
  }

  function switchCase() {
    if (caps === false) {
      caps = true;
    } else {
      caps = false;
    }

    console.log(`switchCase ${caps}`);
  }

  document.addEventListener('keyup', (event) => {
    if (event.key === 'Shift') {
      switchCase();
    }
  });

  function deleteCharacter() {
    console.log('del');
  }

  function keyPress(key) {
    key.classList.add('pressed');
    setTimeout(() => {
      key.classList.remove('pressed');
    }, 100);
  }

  // setup elements
  function createKeyboard() {
    let i = 0;
    const keys = [];
    keyLayout.forEach((element) => {
      const key = document.createElement('button');
      keys.push(key);
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

      key.classList.add(keyLayoutFunctional[i]);
      key.addEventListener('click', () => {
        textarea.value += key.innerHTML;
        keyPress(key);
      });
      i += 1;
    });

    keyboard.classList.add('keyboard');
    document.addEventListener('keydown', (event) => {
      for (let j = 0; j < keys.length; j += 1) {
        if (keys[j].classList.contains(event.code)) {
          keyPress(keys[j]);
        }
      }
    });
  }

  textarea.classList.add('textarea');
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
      deleteCharacter();
    } else if (event.key === 'CapsLock') {
      switchCase();
    } else if (event.key === 'Tab') {
      textarea.value += '   ';
    } else if (event.key === 'Enter') {
      textarea.value += '\r\n';
    } else if (event.key === 'Shift') {
      switchCase();
    } else if (event.location === 0 && !(event.key === 'Escape' || event.key === 'F1' || event.key === 'F2' || event.key === 'F3' || event.key === 'F4' || event.key === 'F5' || event.key === 'F6' || event.key === 'F7' || event.key === 'F8' || event.key === 'F9' || event.key === 'F10' || event.key === 'F11' || event.key === 'F12')) {
      textarea.value += event.key;
    }

    if (event.altKey && event.ctrlKey) {
      switchLayout();
      createKeyboard();
    }
  });

  // add to DOM
  createKeyboard();
  document.body.appendChild(textarea);
  document.body.appendChild(keyboard);
});
