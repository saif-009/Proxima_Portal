import { atom } from 'recoil'

export const activeAccountAtom =atom<any> ({
    key: 'activeAccountAtom',
    default:[]
})


export const userDetailsAtom = atom<any>({
    key: 'userDetailsAtom',
    default: {}
})


