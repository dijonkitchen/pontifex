import {
    deck
} from '../'

test('deck exists', () => {
    expect(deck).toBeTruthy()
})

test('deck has 54 cards', () => {
    expect(deck.length).toEqual(54)
})
