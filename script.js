document.addEventListener('DOMContentLoaded', function() {
  const keyboard = {
    keyRows: [
      {
        key: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        keyMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', null],
        code: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace']
      },
      {
        key: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
        keyMod: [null, 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '/', null],
        code: ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'NumpadDecimal']
      },
      {
        key: ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter'],
        keyMod: [null, 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', null],
        code: ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter']
      },
      {
        key: ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'Shift'],
        keyMod: [null, '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', null, null],
        code: ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight']
      },
      {
        key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
        keyMod: [null, null, null, null, null, null, null, null, null],
        code: ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
      }
    ],
    isModified: false,
    isShiftPressed: false,
    isCapsPressed: false,
    classContainer: 'keyboard',
    classRow: 'keyboard__row',
    classButton: 'keyboard__btn'
  }
  keyboard.classStatePressed = `${keyboard.classButton}--pressed`
  keyboard.classStateModified = `${keyboard.classContainer}--modified`
  
  const
      arrRows = keyboard.keyRows,
      numOfRows = arrRows.length,
      createdContainer = document.createElement('div'),
      output = document.createElement('textarea')

  // create output
  output.classList.add('output')
  document.querySelector('body').appendChild(output)
  
  createButtons()
  pressButtons()
  triggerButton()
  
  function createButtons () { // generate keyboard
    createdContainer.classList.add(keyboard.classContainer)
    document.querySelector('body').append(createdContainer)
  
    for (let i = 0; i < numOfRows; i++) { // create rows cycle
      const
          currentRow = arrRows[i],
          numOfButtons = currentRow.key.length,
          createdRow = document.createElement('div')
  
      createdRow.classList.add(`${keyboard.classRow}`)
      createdContainer.appendChild(createdRow)
  
      for (let j = 0; j < numOfButtons; j++) { // create buttons cycle
  
        const
            createdButton = document.createElement('button'),
            keyData = currentRow.key[j],
            keyModData = currentRow.keyMod[j] == null ? currentRow.key[j] : currentRow.keyMod[j]
  
        createdButton.classList.add(`${keyboard.classButton}`)
        createdButton.setAttribute('type', 'button')
        createdButton.setAttribute('key', currentRow.key[j])
        createdButton.setAttribute('keyMod', currentRow.keyMod[j])
        createdButton.setAttribute('code', currentRow.code[j])
        createdButton.innerHTML = `<span>${keyData}</span><span>${keyModData}</span>`
        createdRow.appendChild(createdButton)
        
        addSizeClass(['Enter'], `${keyboard.classButton}--double`)
        addSizeClass(['Space', 'Backspace', 'ShiftLeft', 'CapsLock'], `${keyboard.classButton}--fill`)
        addSizeClass(['Del', 'Tab'], `${keyboard.classButton}--special`)
  
        function addSizeClass(arrButtons, classToAdd) { // set button size according to key code
          for (let k = 0; k < arrButtons.length; k++) {
            if (currentRow.code[j] === arrButtons[k]) {
              createdButton.classList.add(classToAdd)
            }
          }
        }
  
      }
    }
  }
  
  function pressButtons () { // set style for- and get input from pressed buttons
    ['keydown','keyup'].forEach(function (e) {
      document.addEventListener(e, function (event) {
        
        for (let i = 0; i < numOfRows; i++) {
          for (let j = 0; j < arrRows[i].code.length; j++) {
            if (event.code === arrRows[i].code[j]) {
  
              const currentButton = document.querySelectorAll(`.${keyboard.classRow}`)[i].querySelectorAll(`.${keyboard.classButton}`)[j]
  
              if (event.type === 'keydown') {
                
                if (event.code === 'CapsLock') { // if key is caps lock
                  currentButton.classList.toggle(keyboard.classStatePressed)
                  keyboard.isCapsPressed = !keyboard.isCapsPressed
                  toggleModifier()
                  
                } else { // push any other button
                  currentButton.classList.add(keyboard.classStatePressed)
                  currentButton.click()
  
                  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                    if (keyboard.isCapsPressed) {
                      keyboard.isModified = false
                    } else {
                      keyboard.isModified = true
                    }
                  }
                }
              }
  
              if (event.type === 'keyup') {
                if (event.code !== 'CapsLock') { // pull any other button
                  currentButton.classList.remove(keyboard.classStatePressed)
  
                  if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
                    if (keyboard.isCapsPressed) {
                      keyboard.isModified = true
                    } else {
                      keyboard.isModified = false
                    }
                  }
                }
              }
              
              function toggleModifier () {
                keyboard.isModified = !keyboard.isModified
              }
  
            }
          }
        }
        
        if (keyboard.isModified) {
          createdContainer.classList.add(keyboard.classStateModified)
        } else {
          createdContainer.classList.remove(keyboard.classStateModified)
        }
        
      }, false)
    })
  }

  function triggerButton () {
    const
        buttons = document.querySelectorAll(`.${keyboard.classButton}`)

    let result = ''
    
    buttons.forEach(function(button) {
      button.addEventListener('click', function () {
        
        const
            buttonKey = button.getAttribute('key'),
            buttonKeyMod = button.getAttribute('keyMod'),
            buttonCode = button.getAttribute('code')
        
        if (buttonCode === 'ShiftRight' || buttonCode === 'ShiftLeft' || buttonCode === 'ShiftRight'
            || buttonCode === 'AltLeft' || buttonCode === 'AltRight' || buttonCode === 'ControlLeft'
            || buttonCode === 'ControlRight' || buttonCode === 'MetaLeft' || buttonCode === 'Space'
            || buttonCode === 'Tab' || buttonCode === 'Enter' || buttonCode === 'NumpadDecimal'
            || buttonCode === 'ArrowUp' || buttonCode === 'ArrowLeft' || buttonCode === 'ArrowDown'
            || buttonCode === 'ArrowRight' || buttonCode === 'Backspace') {
          
          switch (buttonCode) {
            case 'Space':
              result = ' '
              break
            case 'Tab':
              result = '\t'
              break
            case 'Backspace':
              result = ''
              const cursorPos = output.selectionStart
              if (cursorPos > 0) {
                output.value = output.value.substring(0, cursorPos - 1) + output.value.substring(cursorPos)
                output.selectionStart = cursorPos - 1
                output.selectionEnd = cursorPos - 1
              }
              break
            default:
              result = ''
          }
          
        } else {
          result = keyboard.isModified ? buttonKeyMod : buttonKey
        }
        
        output.value += result
      })
    })
  }
  
})