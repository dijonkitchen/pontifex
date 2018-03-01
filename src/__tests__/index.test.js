import * as Cipher from '../'

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
    const letters = Cipher.deck.map( num => String.fromCharCode(num + firstLetterChar - 1))
    Cipher.deck.forEach( (number, index) => {
        expect(Cipher.toLetter(number)).toEqual(letters[index])
    })
})
