const setupDeck = [...Array(55).keys()]
setupDeck.splice(0,1)

export const deck = setupDeck

export const toNumber = letter => {
    const firstLetterChar = 'a'.charCodeAt(0)
    return letter.charCodeAt(0) - firstLetterChar + 1
}
