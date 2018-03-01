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

test('decrypt text with a key', () => {
    const plaintext = 'DONOTUSEPC'
    const numbers = [4, 15, 14, 15, 20, 21, 19, 5, 16, 3]
    const key = 'kdwuponowt'
    const ciphertext = 'OSKJJJGTMW'
    expect(Cipher.decrypt(ciphertext, key)).toEqual(plaintext)
})
