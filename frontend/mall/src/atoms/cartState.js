
import { atom, selector } from 'recoil';

export const cartState = atom( {
    key : 'cartState' ,
    default : []
})

export const cartTotalState = selector({
    key : 'cartTotalState' ,
    get : ({get}) => {
        const arr = get(cartState)
        if (!Array.isArray(arr)) {
            return 0; // 또는 빈 배열의 합계인 0을 반환
        }
        const initalValue = 0

        const total = arr.reduce((total , current) => total + current.price * current.qty , initalValue)

        return total
    }
})