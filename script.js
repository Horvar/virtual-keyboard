keyboard = [
  {
    key: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    keyMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', ''],
    keyCodeLower: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '']
  },
  {
    key: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
    keyCodeLower: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
    keyMod: ['', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '/', '']
  },
  {
    key: ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter'],
    keyCodeLower: ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, 'Enter'],
    keyMod: ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '']
  },
  {
    key: ['ShiftL', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'ShiftR'],
    keyCodeLower: ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'ShiftR'],
    keyMod: ['', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '', '']
  },
  {
    key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
    keyCodeLower: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
    keyMod: ['', '', '', '', '', '', '', '']
  }
]

createButtons()

function createButtons () {
  const
      numOfRows = keyboard.length,
      keyboardContainer = document.createElement('div'),
      classContainer = 'keyboard',
      classRow = 'keyboard__row',
      classButton = 'keyboard__btn'

  keyboardContainer.classList.add(`${classContainer}`)
  document.querySelector('body').append(keyboardContainer)
  
  for (let i = 0; i < numOfRows; i++) {
    const
        currentRow = keyboard[i],
        numOfButtons = keyboard[i].key.length,
        keyboardRow = document.createElement('div')
    
    keyboardRow.classList.add(`${classRow}`)
    keyboardContainer.appendChild(keyboardRow)

    for (let j = 0; j < numOfButtons; j++) {
      const keyboardBtn = document.createElement('button')

      keyboardBtn.classList.add(`${classButton}`)
      keyboardBtn.setAttribute('type', 'button')
      keyboardRow.appendChild(keyboardBtn)
      
      keyboardBtn.innerHTML = `<span>${currentRow.key[j]}</span><span>${currentRow.keyMod[j]}</span>`
      keyboardBtn.setAttribute('key', currentRow.key[j])
      keyboardBtn.setAttribute('keyUpper', currentRow.keyMod[j])
      
      if (currentRow.key[j] === 'Enter') {
        keyboardBtn.classList.add(`${classButton}--double`)
      }
      if (currentRow.key[j] === 'Space' || currentRow.key[j] === 'Backspace' || currentRow.key[j] === 'ShiftL' || currentRow.key[j] === 'Caps Lock') {
        keyboardBtn.classList.add(`${classButton}--fill`)
      }
      if (currentRow.key[j] === 'Del' || currentRow.key[j] === 'Tab') {
        keyboardBtn.classList.add(`${classButton}--special`)
      }
    }
    
  }
}

function toggleUpper () {
  
}

highlightPressed()

function highlightPressed () {
  document.addEventListener('keydown', function(event) {
    for (let i = 0; i < keyboard.length; i++) {
      for (let j = 0; j < keyboard[i].keyCodeLower.length; j++) {
        if (event.key === keyboard[i].keyCodeLower[j]) {
          console.log(event.key)
          if (event.key === 'CapsLock') {
            document.querySelectorAll('.keyboard__row')[i].querySelectorAll('.keyboard__btn')[j].classList.toggle('keyboard__btn--pressed')
            document.querySelectorAll('.keyboard__row')[i].querySelectorAll('.keyboard__btn')[j].click()
          } else {
            document.querySelectorAll('.keyboard__row')[i].querySelectorAll('.keyboard__btn')[j].classList.add('keyboard__btn--pressed')
            document.querySelectorAll('.keyboard__row')[i].querySelectorAll('.keyboard__btn')[j].click()
          }
        }
      }
    }
    
  })
  document.addEventListener('keyup', function(event) {
    for (let i = 0; i < keyboard.length; i++) {
      for (let j = 0; j < keyboard[i].keyCodeLower.length; j++) {
        if (event.key === keyboard[i].keyCodeLower[j]) {
          if (event.key !== 'CapsLock') {
            document.querySelectorAll('.keyboard__row')[i].querySelectorAll('.keyboard__btn')[j].classList.remove('keyboard__btn--pressed')
          }
        }
      }
    }
    
  })
}


const btns = document.querySelectorAll('.keyboard__btn')
btns.forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('output').innerText += button.getAttribute('key')
  })
})


