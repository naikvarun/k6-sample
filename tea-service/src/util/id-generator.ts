import {customAlphabet} from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')

export function generateId() {
    return nanoid(10)
}