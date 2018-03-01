import {
    deck
} from '../'

test('deck exists', () => {
    expect(deck).toBeTruthy()
})

test('deck has 54 cards', () => {
    expect(deck.length).toEqual(54)
})

test('deck has all 54 cards', () => {
    for (let i=1; i <= 54; i++) {
        expect(deck.includes(i)).toEqual(true)
    }
})
