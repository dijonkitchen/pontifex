const FIRSTLETTERCHARCODE = 'a'.charCodeAt(0)
const LASTLETTERCHARCODE = 'z'.charCodeAt(0)
const NUMLETTERS = LASTLETTERCHARCODE - FIRSTLETTERCHARCODE + 1
const CARDSPERSUIT = 13
const SUITS = 4
const JOKERS = 2
const DECKSIZE = CARDSPERSUIT * SUITS + JOKERS

const deck = [...Array(DECKSIZE + 1).keys()].slice(1)

const toNumber = letter => {
    const lowerCase = letter.toLowerCase()
    return lowerCase.charCodeAt(0) - FIRSTLETTERCHARCODE + 1
}

const toNumbers = plaintext => {
    const noWhiteSpace = plaintext.replace(/ /g, '')
    const letters = noWhiteSpace.split('')
    return letters.map( char => toNumber(char))
}

const toLetter = number => {
    return String.fromCharCode(number % NUMLETTERS + FIRSTLETTERCHARCODE - 1)
}

const toText = numbers => {
    return numbers.map(num => toLetter(num)).join('')
}

const encrypt = (plaintext, key) => {
    const plaintextNumbers = toNumbers(plaintext)
    const keyNumbers = toNumbers(key)
    const cipherNums = plaintextNumbers.map( (num, index) => {
        return (num + keyNumbers[index]) % NUMLETTERS
    })
    const cipherText = toText(cipherNums)

    return cipherText.toUpperCase()
}

const decrypt = (cipherText, key) => {
    const cipherTextNumbers = toNumbers(cipherText.toLowerCase())
    const keyNumbers = toNumbers(key)
    const textNums = cipherTextNumbers.map( (num, index) => {
        let grossNum = num
        const keyNum = keyNumbers[index]
        if (grossNum < keyNum) {
            grossNum += NUMLETTERS
        }
        return (grossNum - keyNum) % NUMLETTERS
    })
    const plaintext = toText(textNums)

    return plaintext.toUpperCase()
}

module.exports = {
    deck,
    toNumber,
    toNumbers,
    toLetter,
    toText,
    encrypt,
    decrypt
}
