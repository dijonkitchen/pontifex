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

export const toText = numbers => {
    return numbers.map(num => toLetter(num)).join('')
}

export const encrypt = (plaintext, key) => {
    const plaintextNumbers = toNumbers(plaintext)
    const keyNumbers = toNumbers(key)
    const cipherNums = plaintextNumbers.map( (num, index) => {
        return (num + keyNumbers[index]) % 26
    })
    const letters = toText(cipherNums)

    return letters.toUpperCase()
}
