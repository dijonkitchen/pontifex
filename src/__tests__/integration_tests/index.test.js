const Cipher = require('../../')

describe('Integration tests', () => {
    test('generates proper output given a fresh deck', () => {
        let deck = Cipher.deck
        const outputs = []
        const expected = 'EXKYIZSGEHUNTIQ'

        for (let i = 0; i <= expected.length; i++) {
            const returnObj = Cipher.outputStream({deck})
            outputs.push(returnObj.output)
            deck = returnObj.deck
        }
        const sanitized = []

        outputs.forEach(output => {
            if (output !== 53) {
                sanitized.push(output % 26)
            }
        })
        const key = Cipher.toText(sanitized)
        const subject = Cipher.encrypt('AAAAA AAAAA AAAAA', key)

        expect(subject).toEqual(expected)
    })
})
