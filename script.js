keyboard = [
  {
    key: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    keyMod: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '']
  },
  {
    key: ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'Del'],
    keyMod: ['', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '']
  },
  {
    key: ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', `'`, '\\', 'Enter'],
    keyMod: ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '|', '']
  },
  {
    key: ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', `/`, '↑', 'Shift'],
    keyMod: ['', '|', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '', '']
  },
  {
    key: ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', '←', '↓', '→'],
    keyMod: ['', '', '', '', '', '', '', '']
  }
]

createButtons()

function createButtons () {
  const
      numOfRows = keyboard.length,
      appendContainer = document.querySelector('body'),
      classRow = 'keyboard-row',
      classButton = 'keyboard-btn'
  
  for (let i = 0; i < numOfRows; i++) {
    const
        currentRow = keyboard[i],
        numOfButtons = keyboard[i].key.length,
        keyboardRow = document.createElement('ul')
    
    keyboardRow.classList.add(`${classRow}`)
    appendContainer.appendChild(keyboardRow)

    for (let j = 0; j < numOfButtons; j++) {
      const keyboardBtn = document.createElement('li')

      keyboardBtn.classList.add(`${classButton}`)
      keyboardRow.appendChild(keyboardBtn)
      
      keyboardBtn.innerHTML = `<span>${currentRow.key[j]}</span><span>${currentRow.keyMod[j]}</span>`
      
      if (currentRow.key[j] === 'Enter' || currentRow.key[j] === 'Backspace' || currentRow.key[j] === 'Caps Lock' || currentRow.key[j] === 'Tab' || currentRow.key[j] === 'Shift') {
        keyboardBtn.classList.add(`${classButton}--double`)
      }
      if (currentRow.key[j] === 'Space') {
        keyboardBtn.classList.add(`${classButton}--long`)
      }
    }
    
  }
}