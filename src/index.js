const NUMLETTERS = 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1
const CARDSPERSUIT = 13
const SUITS = 4
const JOKERS = 2
const DECKSIZE = CARDSPERSUIT * SUITS + JOKERS

export const deck = [...Array(DECKSIZE + 1).keys()].slice(1)

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
    return String.fromCharCode(number % NUMLETTERS + firstLetterChar - 1)
}

export const toText = numbers => {
    return numbers.map(num => toLetter(num)).join('')
}

export const encrypt = (plaintext, key) => {
    const plaintextNumbers = toNumbers(plaintext)
    const keyNumbers = toNumbers(key)
    const cipherNums = plaintextNumbers.map( (num, index) => {
        return (num + keyNumbers[index]) % NUMLETTERS
    })
    const letters = toText(cipherNums)

    return letters.toUpperCase()
}

export const decrypt = (ciphertext, key) => {
    const ciphertextNumbers = toNumbers(ciphertext.toLowerCase())
    const keyNumbers = toNumbers(key)
    const textNums = ciphertextNumbers.map( (num, index) => {
        let grossNum = num
        const keyNum = keyNumbers[index]
        if (grossNum < keyNum) {
            grossNum += NUMLETTERS
        }
        return (grossNum - keyNum) % NUMLETTERS
    })

    return toText(textNums).toUpperCase()
}
