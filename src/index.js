const setupDeck = [...Array(55).keys()]
setupDeck.splice(0,1)

export const deck = setupDeck

export const toNumber = letter => {
    const firstLetterChar = 'a'.charCodeAt(0)
    return letter.charCodeAt(0) - firstLetterChar + 1
}

export const toNumbers = plaintext => {
    const noWhiteSpace = plaintext.replace(/ /g, '')
    const letters = noWhiteSpace.split('')
    return letters.map( char => toNumber(char))
}

export const toLetter = number => {
    const firstLetterChar = 'a'.charCodeAt(0)
    return String.fromCharCode(number % 26 + firstLetterChar - 1)
}
