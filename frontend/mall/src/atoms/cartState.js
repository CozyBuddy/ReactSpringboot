
import { atom, selector } from 'recoil';

export const cartState = atom( {
    key : 'cartState' ,
    default : []
})

export const cartTotalState = selector({
    key : 'cartTotalState' ,
    get : ({get}) => {
        const arr = get(cartState)

        const initalValue = 0

        const total = arr.reduce((total , current) => total + current.price * current.qty , initalValue)

        return total
    }
})