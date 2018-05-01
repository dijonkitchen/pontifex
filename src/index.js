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

const move = (args) => {
    const {
        deck,
        card,
        numToMove
    } = args
    const cardIndex = deck.indexOf(card)
    if (cardIndex === -1) {
        return deck
    } else {
        const newDeck = deck.slice()
        newDeck.splice(cardIndex, 1)
        const newIndex = (cardIndex + numToMove) % (deck.length - 1)
        newDeck.splice(newIndex, 0, card)
        return newDeck
    }
}

const tripleCut = (deck, card1, card2) => {
    const cardIndex1 = deck.indexOf(card1)
    const cardIndex2 = deck.indexOf(card2)

    const lowerIndex = Math.min(cardIndex1, cardIndex2)
    const higherIndex = Math.max(cardIndex1, cardIndex2) + 1

    const topCut = deck.slice(0, lowerIndex)
    const midCut = deck.slice(lowerIndex, higherIndex)
    const botCut = deck.slice(higherIndex)

    return botCut.concat(midCut, topCut)
}

const countCut = (deck) => {
    const last = deck[deck.length - 1]
    const allButLast = deck.slice(0, -1)

    const topCut = allButLast.slice(0, last)
    const botCut = allButLast.slice(last)

    return botCut.concat(topCut, last)
}

const output = (deck) => {
    const first = deck[0]
    if (first === 53 || first === 54) {
        return undefined
    } else {
        return deck[first]
    }
}

module.exports = {
    deck,
    toNumber,
    toNumbers,
    toLetter,
    toText,
    encrypt,
    decrypt,
    move,
    tripleCut,
    countCut,
    output,
}
