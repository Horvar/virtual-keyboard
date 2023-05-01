document.addEventListener('DOMContentLoaded', () => {
  const keyboard = {
    keyRows: {
      en: [
        {
          key: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
          keyMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', null],
          code: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        },
        {
          key: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
          keyMod: [null, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '/', null],
          code: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'NumpadDecimal'],
        },
        {
          key: ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
          keyMod: [null, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', null],
          code: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        },
        {
          key: ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift'],
          keyMod: [null, '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', null],
          code: ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
        },
        {
          key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
          keyMod: [null, null, null, null, null, null, '←', '↓', '→'],
          code: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        },
      ],
      ru: [
        {
          key: ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
          keyMod: ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', null],
          code: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
        },
        {
          key: ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
          keyMod: [null, 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', null],
          code: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'NumpadDecimal'],
        },
        {
          key: ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
          keyMod: [null, 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', null],
          code: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
        },
        {
          key: ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift'],
          keyMod: [null, '|', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', null, null],
          code: ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
        },
        {
          key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
          keyMod: [null, null, null, null, null, null, null, null, null],
          code: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
        },
      ],
    },
    layout: localStorage.getItem('layout') === null ? 'en' : localStorage.getItem('layout'),
    isModified: false,
    isShiftPressed: false,
    isCapsPressed: false,
    classContainer: 'keyboard',
    classRow: 'keyboard__row',
    classButton: 'keyboard__btn',
  };
  keyboard.classStatePressed = `${keyboard.classButton}--pressed`;
  keyboard.classStateModified = `${keyboard.classContainer}--modified`;

  let arrRows = keyboard.layout ? keyboard.keyRows.ru : keyboard.keyRows.en;

  const
    numOfRows = arrRows.length;
  let createdContainer = document.createElement('div');
  const output = document.createElement('textarea');
  const description = document.createElement('div');
  
  // create description
  description.classList.add('description');
  document.querySelector('body').append(description);
  description.innerHTML = ('' +
      '<p>Клавиатура создана в ОС Windows</p>' +
      '<p>Для переключения языка: любой shift + любой alt</p>' +
      '<p>В качестве Del используется клавиша с NumPad</p>'
  )

  // create output
  output.classList.add('output');
  output.setAttribute('placeholder', 'Output...');
  document.querySelector('body').appendChild(output);

  function destroyKeyboard(source) {
    const currentKeyboard = document.querySelector(`.${source.classContainer}`);
    if (currentKeyboard) {
      currentKeyboard.remove();
    }
  }

  function setButtonTriggers(source) {
    const
      buttons = document.querySelectorAll(`.${source.classButton}`);

    let result = '';

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const
          buttonKey = button.getAttribute('key');
        const buttonKeyMod = button.getAttribute('keyMod');
        const buttonCode = button.getAttribute('code');

        if (buttonCode === 'ShiftRight' || buttonCode === 'ShiftLeft' || buttonCode === 'ShiftRight'
            || buttonCode === 'AltLeft' || buttonCode === 'AltRight' || buttonCode === 'ControlLeft'
            || buttonCode === 'ControlRight' || buttonCode === 'MetaLeft' || buttonCode === 'Space'
            || buttonCode === 'Tab' || buttonCode === 'Enter' || buttonCode === 'NumpadDecimal'
            || buttonCode === 'Backspace' || buttonCode === 'CapsLock') {
          const cursorPos = output.selectionStart;

          switch (buttonCode) {
            case 'Space':
              result = ' ';
              break;
            case 'Tab':
              result = '\t';
              break;
            case 'Enter':
              result = '\n';
              break;
            case 'Backspace':
              result = '';
              if (cursorPos > 0) {
                output.value = output.value.substring(0, cursorPos - 1)
                    + output.value.substring(cursorPos);
                output.selectionStart = cursorPos - 1;
                output.selectionEnd = cursorPos - 1;
              }
              break;
            case 'NumpadDecimal':
              result = '';
              if (cursorPos < output.value.length) {
                output.value = output.value.substring(0, cursorPos)
                    + output.value.substring(cursorPos + 1);
                output.selectionStart = cursorPos;
                output.selectionEnd = cursorPos;
              }
              break;
            default:
              result = '';
          }
        } else {
          result = source.isModified ? buttonKeyMod : buttonKey;
        }

        output.value += result;
      });
    });
  }

  function createKeyboard(source) { // generate keyboard
    function addSizeClass(arrButtons, classToAdd, code, button) {
      for (let k = 0; k < arrButtons.length; k += 1) {
        if (code === arrButtons[k]) {
          button.classList.add(classToAdd);
        }
      }
    }
    createdContainer = document.createElement('div');
    createdContainer.classList.add(source.classContainer);
    document.querySelector('body').append(createdContainer);

    arrRows = source.layout === 'ru' ? source.keyRows.ru : source.keyRows.en;

    for (let i = 0; i < numOfRows; i += 1) { // create rows cycle
      const
        currentRow = arrRows[i];
      const numOfButtons = currentRow.key.length;
      const createdRow = document.createElement('div');

      createdRow.classList.add(`${source.classRow}`);
      createdContainer.appendChild(createdRow);

      for (let j = 0; j < numOfButtons; j += 1) { // create buttons cycle
        const
          createdButton = document.createElement('button');
        const keyData = currentRow.key[j];
        const keyModData = currentRow.keyMod[j] == null ? currentRow.key[j] : currentRow.keyMod[j];

        createdButton.classList.add(`${source.classButton}`);
        createdButton.setAttribute('type', 'button');
        createdButton.setAttribute('key', currentRow.key[j]);
        createdButton.setAttribute('keyMod', currentRow.keyMod[j]);
        createdButton.setAttribute('code', currentRow.code[j]);
        createdButton.innerHTML = `<span>${keyData}</span><span>${keyModData}</span>`;
        createdRow.appendChild(createdButton);

        // set button size according to key code
        addSizeClass(['Enter'], `${source.classButton}--double`, currentRow.code[j], createdButton);
        addSizeClass(['Space', 'Backspace', 'ShiftLeft', 'CapsLock'], `${source.classButton}--fill`, currentRow.code[j], createdButton);
        addSizeClass(['Del', 'Tab'], `${source.classButton}--special`, currentRow.code[j], createdButton);

        // highlight caps lock
        if (keyboard.isCapsPressed && currentRow.code[j] === 'CapsLock') {
          createdButton.classList.add(`${keyboard.classStatePressed}`);
        }
      }
    }

    setButtonTriggers(keyboard);
  }

  createKeyboard(keyboard);

  function pressButtons(source) { // set style for- and get input from pressed buttons
    function toggleModifier() {
      keyboard.isModified = !keyboard.isModified;
    }
    ['keydown', 'keyup'].forEach((e) => {
      document.addEventListener(e, (event) => {
        for (let i = 0; i < numOfRows; i += 1) {
          for (let j = 0; j < arrRows[i].code.length; j += 1) {
            if (event.code === arrRows[i].code[j]) {
              const currentButton = document.querySelectorAll(`.${source.classRow}`)[i].querySelectorAll(`.${source.classButton}`)[j];

              if (event.type === 'keydown') {
                if (event.code === 'CapsLock') { // if key is caps lock
                  currentButton.classList.toggle(source.classStatePressed);
                  keyboard.isCapsPressed = !keyboard.isCapsPressed;
                  toggleModifier();
                } else { // push any other button
                  currentButton.classList.add(source.classStatePressed);

                  if (output !== document.activeElement) {
                    currentButton.click();
                  }

                  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                    keyboard.isModified = !keyboard.isCapsPressed;
                  }

                  if (event.shiftKey && event.altKey) {
                    keyboard.layout = keyboard.layout === 'en' ? 'ru' : 'en';
                    localStorage.removeItem('layout');
                    localStorage.setItem('layout', source.layout);
                    destroyKeyboard(source);
                    createKeyboard(source);
                  }
                }
              }

              if (event.type === 'keyup') {
                if (event.code !== 'CapsLock') { // pull any other button
                  currentButton.classList.remove(source.classStatePressed);

                  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                    keyboard.isModified = keyboard.isCapsPressed;
                  }
                }
              }
            }
          }
        }

        if (source.isModified) {
          createdContainer.classList.add(source.classStateModified);
        } else {
          createdContainer.classList.remove(source.classStateModified);
        }
      }, false);
    });
  }

  pressButtons(keyboard);
});
