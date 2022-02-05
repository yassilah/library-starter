import { describe, expect, it } from 'vitest'
import { myExample } from './index'

describe('basic test', () => {
    it('should return a message', () => {
        expect(myExample()).toBe('Hellow World!')
    })
})
