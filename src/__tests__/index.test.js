const Cipher = require('../')

test('deck exists', () => {
    expect(Cipher.deck).toBeTruthy()
})

test('deck has 54 cards', () => {
    expect(Cipher.deck.length).toEqual(54)
})

test('deck has all 54 cards', () => {
    for (let i=1; i <= 54; i++) {
        expect(Cipher.deck.includes(i)).toEqual(true)
    }
})

test('convert letter to number', () => {
    expect(Cipher.toNumber('a')).toEqual(1)
    expect(Cipher.toNumber('A')).toEqual(1)
})

test('convert all letters to numbers', () => {
    const firstLetterChar = 'a'.charCodeAt(0)
    const letters = Cipher.deck.map( num => String.fromCharCode(num + firstLetterChar - 1))
    letters.forEach( (letter, index) => {
        expect(Cipher.toNumber(letter)).toEqual(index + 1)
    })
})

test('convert all numbers to letters', () => {
    const firstLetterChar = 'a'.charCodeAt(0)
    const letters = Cipher.deck.map( num => String.fromCharCode(num % 26 + firstLetterChar - 1))
    Cipher.deck.forEach( (number, index) => {
        expect(Cipher.toLetter(number)).toEqual(letters[index])
    })
})

test('convert numbers greater than 26 to letters', () => {
    expect(Cipher.toLetter(27)).toEqual('a')
    expect(Cipher.toLetter(29)).toEqual('c')
})

test('convert text to numbers', () => {
    const plaintext = 'do not use pc'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    expect(Cipher.toNumbers(plaintext)).toEqual(numbers)
})

test('convert numbers to text', () => {
    const plaintext = 'donotusepc'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    expect(Cipher.toText(numbers)).toEqual(plaintext)
})

test('encrypt text with a key', () => {
    const plaintext = 'do not use pc'
    const key = 'kdwuponowt'
    const ciphertext = 'OSKJJJGTMW'
    expect(Cipher.encrypt(plaintext, key)).toEqual(ciphertext)
})

test('encrypt text with a key with spaces', () => {
    const plaintext = 'PLAINTEXT'
    const key = ' kdwup onowt   '
    const ciphertext = 'APXDDISMQ'
    expect(Cipher.encrypt(plaintext, key)).toEqual(ciphertext)
})

test('decrypt text with a key', () => {
    const plaintext = 'DONOTUSEPC'
    const key = 'kdwuponowt'
    const ciphertext = 'OSKJJJGTMW'
    expect(Cipher.decrypt(ciphertext, key)).toEqual(plaintext)
})

test('decrypt text with a key with spaces', () => {
    const plaintext = 'PLAINTEXT'
    const key = ' kdwup onowt'
    const ciphertext = 'APXDD ISMQ'
    expect(Cipher.decrypt(ciphertext, key)).toEqual(plaintext)
})

test('does not moves a card by 1 place if it does not exist', () => {
    const card = 1
    const deck = [card,2,3,4,5]

    const subject = Cipher.move({deck, card: 6, numToMove: 1})

    expect(subject).toEqual(deck)
})

test('moving a single card deck stays the same', () => {
    const card = 1
    const deck = [card]

    const subject = Cipher.move({deck, card, numToMove: 3})

    const expected = deck
    expect(subject).toEqual(expected)
})

test('moves a card by 1 place', () => {
    const card = 1
    const deck = [card,2]

    const subject = Cipher.move({deck, card, numToMove: 1})

    const expected = [2,card]
    expect(subject).toEqual(expected)
})

test('moves a card by 2 places', () => {
    const card = 1
    const deck = [card,2]

    const subject = Cipher.move({deck, card, numToMove: 2})

    const expected = [2, card]
    expect(subject).toEqual(expected)
})

test('moves a card by 1 place', () => {
    const card = 1
    const deck = [card,2,3,4,5]

    const subject = Cipher.move({deck, card, numToMove: 1})

    const expected = [2,card,3,4,5]
    expect(subject).toEqual(expected)
})

test('moves a card by 1 place', () => {
    const card = 53
    const deck = [card,7,2,54,9,4,1]

    const subject = Cipher.move({deck, card, numToMove: 1})

    const expected = [7,card,2,54,9,4,1]
    expect(subject).toEqual(expected)
})

test('moves a card by 1 place', () => {
    const card = 53
    const deck = [7,2,54,9,4,card,1]

    const subject = Cipher.move({deck, card, numToMove: 1})

    const expected = [7,2,54,9,4,1,card]
    expect(subject).toEqual(expected)
})

test('moves a card by 2 places', () => {
    const card = 54
    const deck = [7,53,2,card,9,4,1]

    const subject = Cipher.move({deck, card, numToMove: 2})

    const expected = [7,53,2,9,4,card,1]
    expect(subject).toEqual(expected)
})

test('moves a card beyond the deck size', () => {
    const card = 54
    const deck = [7,53,2,card,9,4,1]

    const subject = Cipher.move({deck, card, numToMove: 4})

    const expected = [7,card,53,2,9,4,1]
    expect(subject).toEqual(expected)
})

test('moves a card by more than the deck size', () => {
    const card = 54
    const deck = [7,53,2,card,9,4,1]

    const subject = Cipher.move({deck, card, numToMove: 10})

    const expected = [7,card,53,2,9,4,1]
    expect(subject).toEqual(expected)
})

test('moves a card by more than the deck size beyond existing index', () => {
    const card = 54
    const deck = [7,53,2,card,9,4,1]

    const subject = Cipher.move({deck, card, numToMove: 13})

    const expected = [7,53,2,9,card,4,1]
    expect(subject).toEqual(expected)
})

test('triple cut function exists', () => {
    const subject = Cipher.tripleCut

    expect(subject).toBeTruthy()
})

test('triple cuts deck', () => {
    const deck = [2,4,5,46,34,3]

    const subject = Cipher.tripleCut(deck,34,5)

    const expected = [3,5,46,34,2,4]
    expect(subject).toEqual(expected)
})

test('triple cuts deck', () => {
    const deck = [23,4,5,46,34,3]

    const subject = Cipher.tripleCut(deck,5,34)

    const expected = [3,5,46,34,23,4]
    expect(subject).toEqual(expected)
})

test('triple cuts deck irrespective of order', () => {
    const deck = [23,4,5,46,34,3]

    const subject = Cipher.tripleCut(deck,34,5)

    const expected = [3,5,46,34,23,4]
    expect(subject).toEqual(expected)
})

test('count cut deck', () => {
    const deck = [23,4,5,46,34,3]

    const subject = Cipher.countCut(deck)

    const expected = [46,34,23,4,5,3]
    expect(subject).toEqual(expected)
})

test('count cut deck', () => {
    const deck = [23,4,5,46,34,2]
    const subject = Cipher.countCut(deck)

    const expected = [5,46,34,23,4,2]
    expect(subject).toEqual(expected)
})

test('topOutput function exists', () => {
    const subject = Cipher.topOutput

    expect(subject).toBeTruthy()
})

test('find top card output', () => {
    const deck = [3,4,5,46,34,2]
    const subject = Cipher.topOutput(deck)

    expect(subject).toEqual(46)
})

test('find top card output', () => {
    const deck = [4,3,5,16,34,2]
    const subject = Cipher.topOutput(deck)

    expect(subject).toEqual(34)
})

test('find top card output of joker', () => {
    const deck = [54,3,5,16,34,2]
    deck[53] = 9

    const subject = Cipher.topOutput(deck)

    expect(subject).toEqual(9)
})

test('find top card output of joker', () => {
    const deck = [53,3,5,16,34,2]
    deck[53] = 9

    const subject = Cipher.topOutput(deck)

    expect(subject).toEqual(9)
})

test('outputStream function exists', () => {
    const subject = Cipher.outputStream

    expect(subject).toBeTruthy()
})

test('check first output of unkeyed deck', () => {
    const unkeyedDeck = Cipher.deck

    const subject = Cipher.outputStream({deck: unkeyedDeck})

    expect(subject.output).toEqual(4)
})

test('check second output of unkeyed deck', () => {
    const unkeyedDeck = Cipher.deck

    const deck = Cipher.outputStream({deck: unkeyedDeck}).deck
    const subject = Cipher.outputStream({deck})

    expect(subject.output).toEqual(49)
})

test('check first 10 outputs of unkeyed deck', () => {
    let deck = Cipher.deck
    const subject = []

    for (let i = 0; i <= 10; i++) {
        const returnObj = Cipher.outputStream({deck})
        subject.push(returnObj.output)
        deck = returnObj.deck
    }

    expect(subject).toEqual([4,49,10,53,24,8,51,44,6,4,33])
})

test('shuffle function exists', () => {
    const subject = Cipher.shuffle

    expect(subject).toBeTruthy()
})

test('shuffles deck', () => {
    const deck = [1,2,3,4,5]
    const subject = Cipher.shuffle(deck)

    expect(subject).not.toEqual(deck)
    expect(subject.length).toEqual(deck.length)
})
