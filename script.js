const keyboard = {
  keyRows: [
    {
      key: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
      keyMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''],
      code: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''],
      codeMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '']
    },
    {
      key: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
      keyMod: ['', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '/', ''],
      code: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
      codeMod: ['', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '/', '']
    },
    {
      key: ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter'],
      keyMod: ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', ''],
      code: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter'],
      codeMod: ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '']
    },
    {
      key: ['ShiftL', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'ShiftR'],
      keyMod: ['', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '', ''],
      code: ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'ShiftR'],
      codeMod: ['', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '', '']
    },
    {
      key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
      keyMod: ['', '', '', '', '', '', '', '', ''],
      code: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
      codeMod: ['', '', '', '', '', '', '', '', '']
    }
  ],
  isModified: false,
  classContainer: 'keyboard',
  classRow: 'keyboard__row',
  classButton: 'keyboard__btn'
}
keyboard.classStatePressed = `${keyboard.classButton}--pressed`
keyboard.classStateModified = `${keyboard.classContainer}--modified`

const
    arrRows = keyboard.keyRows
    numOfRows = arrRows.length,
    createdContainer = document.createElement('div')

createButtons()
pressButtons()

function createButtons () {
  createdContainer.classList.add(`${keyboard.classContainer}`)
  document.querySelector('body').append(createdContainer)

  for (let i = 0; i < numOfRows; i++) { // create rows cycle
    const
        currentRow = arrRows[i],
        numOfButtons = currentRow.key.length,
        createdRow = document.createElement('div')

    createdRow.classList.add(`${keyboard.classRow}`)
    createdContainer.appendChild(createdRow)

    for (let j = 0; j < numOfButtons; j++) { // create buttons cycle

      const createdButton = document.createElement('button')

      createdButton.classList.add(`${keyboard.classButton}`)
      createdButton.setAttribute('type', 'button')
      createdButton.setAttribute('key', currentRow.key[j])
      createdButton.setAttribute('mod', currentRow.keyMod[j])
      createdButton.innerHTML = `<span>${currentRow.key[j]}</span><span>${currentRow.keyMod[j]}</span>`
      createdRow.appendChild(createdButton)
      
      addSizeClass(['Enter'], `${keyboard.classButton}--double`)
      addSizeClass(['Space', 'Backspace', 'ShiftL', 'Caps Lock'], `${keyboard.classButton}--fill`)
      addSizeClass(['Del', 'Tab'], `${keyboard.classButton}--special`)

      function addSizeClass(arrButtons, classToAdd) { // set button size according to lowercase key data
        for (let k = 0; k < arrButtons.length; k++) {
          if (currentRow.key[j] === arrButtons[k]) {
            createdButton.classList.add(classToAdd)
          }
        }
      }

    }
  }
}

function pressButtons () {
  ['keydown','keyup'].forEach(function (e) {
    document.addEventListener(e, function (event) {
      for (let i = 0; i < numOfRows; i++) {
        for (let j = 0; j < arrRows[i].code.length; j++) {
          if (event.key === arrRows[i].code[j]) {

            const currentButton = document.querySelectorAll(`.${keyboard.classRow}`)[i].querySelectorAll(`.${keyboard.classButton}`)[j]

            if (event.type === 'keydown') {
              if (event.key === 'CapsLock') {
                if (event.getModifierState('CapsLock')) { // interact Caps Lock
                  currentButton.classList.add(keyboard.classStatePressed)
                  createdContainer.classList.add(keyboard.classStateModified)
                  keyboard.isModified = true
                } else {
                  currentButton.classList.remove(keyboard.classStatePressed)
                  createdContainer.classList.remove(keyboard.classStateModified)
                  keyboard.isModified = false
                }
              } else { // push any other button
                currentButton.classList.add(`${keyboard.classButton}--pressed`)
                currentButton.click()
              }
            }

            if (event.type === 'keyup') {
              if (event.key !== 'CapsLock') { // pull any other button
                currentButton.classList.remove('keyboard__btn--pressed')
              }
            }

          }
        }
      }
    }, false)
  })
}

const btns = document.querySelectorAll('.keyboard__btn')
btns.forEach((button) => {
  button.addEventListener('click', () => {
    if (keyboard.isModified) {
      document.querySelector('output').innerText += button.getAttribute('mod')
    } else {
      document.querySelector('output').innerText += button.getAttribute('key')    
    }
  })
})


// toggle caps