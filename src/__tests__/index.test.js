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
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    const key = 'kdwuponowt'
    const ciphertext = 'OSKJJJGTMW'
    expect(Cipher.encrypt(plaintext, key)).toEqual(ciphertext)
})

test('encrypt text with a key with spaces', () => {
    const plaintext = 'PLAINTEXT'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    const key = ' kdwup onowt   '
    const ciphertext = 'APXDDISMQ'
    expect(Cipher.encrypt(plaintext, key)).toEqual(ciphertext)
})

test('decrypt text with a key', () => {
    const plaintext = 'DONOTUSEPC'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    const key = 'kdwuponowt'
    const ciphertext = 'OSKJJJGTMW'
    expect(Cipher.decrypt(ciphertext, key)).toEqual(plaintext)
})

test('decrypt text with a key with spaces', () => {
    const plaintext = 'PLAINTEXT'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
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
