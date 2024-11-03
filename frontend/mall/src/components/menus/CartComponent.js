
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import { useRecoilValue } from "recoil";
import { cartTotalState } from "../../atoms/cartState";


const CartComponent = () => {
    const {isLogin , loginState} = useCustomLogin() ;

    const {cartItems , changeCart} = useCustomCart()
   
    const totalValue = useRecoilValue(cartTotalState)


    return (
        <div className="w-full">
        {isLogin ? 
        <div className="flex flex-col">
        <div className="flex w-full">
        <div>
            {loginState.nickname}님의 장바구니
        </div>
        <div className="bg-orange-600 w-9 text-center text-white font-bold rounded-full m-2">
            {cartItems.length}
        </div>
        </div>
        <div>
            <ul>
                {cartItems.map(item => <CartItemComponent {...item} key={item.cino} 
                changeCart={changeCart} email={loginState.email} />)}
            </ul>


        </div>
        <div>

            <div className="text-2xl text-right font-extrabold">
                총금액 : {totalValue}
            </div>
        </div>
        </div>
        : <div></div>
    }
    </div>
    )
}

export default CartComponent;