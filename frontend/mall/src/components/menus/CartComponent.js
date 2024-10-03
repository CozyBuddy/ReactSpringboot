import { useDispatch, useSelector } from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin";
import { useEffect, useMemo } from "react";
import { getCartItemsAsync } from "../../slices/cartSlice";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";


const CartComponent = () => {
    const {isLogin , loginState} = useCustomLogin() ;

    const {refreshCart , cartItems , changeCart} = useCustomCart()
   
    const total = useMemo(() => {
        let total = 0 
        for(const item of cartItems) {
            total += item.price * item.qty
        }
        return total ;
    },[cartItems])

    useEffect(() => {
        if(isLogin) {
           refreshCart()
        }
    },[isLogin])

    return (
        <div className="w-full">
        {isLogin ? 
        <div className="flex flex-col">
        <div className="flex w-full">
        <div>
            {loginState.nickname}'s Cart
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
                TOTAL : {total}
            </div>
        </div>
        </div>
        : <div></div>
    }
    </div>
    )
}

export default CartComponent;