
import {describe, test} from 'node:test'
import assert from "node:assert/strict"

function compare(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Not a number')
    }

    if (a > b) return 1;
    if (a < b) return -1
    return 0
}

// The test suite
describe('compare() 関数のテストを行う', () => {
    test('a が b より大きい場合、1 を返す', () => {
        const result = compare(2, 1)
        assert.equal(result, 1)
    })
})
