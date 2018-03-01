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
