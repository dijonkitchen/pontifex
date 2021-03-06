const FIRSTLETTERCHARCODE = 'a'.charCodeAt(0)
const LASTLETTERCHARCODE = 'z'.charCodeAt(0)
const NUMLETTERS = LASTLETTERCHARCODE - FIRSTLETTERCHARCODE + 1
const CARDSPERSUIT = 13
const SUITS = 4
const JOKERS = 2
const DECKSIZE = CARDSPERSUIT * SUITS + JOKERS

const deck = Object.freeze([...Array(DECKSIZE + 1).keys()].slice(1))

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
    let remainder = number % NUMLETTERS
    if (number !== 0 && remainder === 0) {
        remainder = NUMLETTERS
    }
    return String.fromCharCode(remainder + FIRSTLETTERCHARCODE - 1)
}

const toText = numbers => {
    return numbers.map(num => toLetter(num)).join('')
}

const encrypt = (plaintext, key) => {
    const plaintextNumbers = toNumbers(plaintext)
    const keyNumbers = toNumbers(key)
    const cipherNums = plaintextNumbers.map( (num, index) => {
        const remainder = (num + keyNumbers[index]) % NUMLETTERS
        if (num !== 0 && remainder === 0) {
            return NUMLETTERS
        } else {
            return remainder
        }
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
        const higherIndex = cardIndex + numToMove;
        let newIndex = higherIndex % newDeck.length

        if (higherIndex !== 0 && higherIndex % newDeck.length === 0) {
            newIndex = newDeck.length
        }
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

const topOutput = (deck) => {
    const firstCardVal = Math.min(53, deck[0])

    return Math.min(53, deck[firstCardVal])
}

const outputStream = (inputs) => {
    const initialDeck = inputs.deck

    const step1deck = move({
        deck: initialDeck,
        card: 53,
        numToMove: 1
    })
    const step2deck = move({
        deck: step1deck,
        card: 54,
        numToMove: 2
    })
    const step3deck = tripleCut(step2deck, 53, 54)
    const step4deck = countCut(step3deck)
    const output = topOutput(step4deck)

    return {
        deck: step4deck,
        output
    }
}

const shuffle = (deck) => {
    const newDeck = deck.slice()

    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        const tempSwapValue = newDeck[randomIndex]
        newDeck[randomIndex] = newDeck[i]
        newDeck[i] = tempSwapValue
    }

    return newDeck
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
    topOutput,
    outputStream,
    shuffle,
}
