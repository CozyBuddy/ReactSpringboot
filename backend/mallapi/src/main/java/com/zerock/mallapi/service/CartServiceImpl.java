package com.zerock.mallapi.service;

import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.zerock.mallapi.domain.Cart;
import com.zerock.mallapi.domain.CartItem;
import com.zerock.mallapi.domain.Member;
import com.zerock.mallapi.domain.Product;
import com.zerock.mallapi.dto.CartItemDTO;
import com.zerock.mallapi.dto.CartItemListDTO;
import com.zerock.mallapi.repository.CartItemRepository;
import com.zerock.mallapi.repository.CartRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RequiredArgsConstructor
@Service
@Log4j2
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository ;

    @Override
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO)  {

        String email = cartItemDTO.getEmail() ;

        Long pno = cartItemDTO.getPno() ;

        int qty = cartItemDTO.getQty() ;

        Long cino = cartItemDTO.getCino() ;

        if (cino != null) {
               Optional<CartItem> cartItemResult = cartItemRepository.findById(cino);
               
               CartItem cartItem = cartItemResult.orElseThrow() ;

               cartItem.changeQty(qty);

               cartItemRepository.save(cartItem) ;

               return getCartItems(email) ;
        }

        Cart cart = getCart(email) ;

        CartItem cartItem = null ;

        cartItem = cartItemRepository.getItemOfPno(email, pno) ;

        if (cartItem == null ) {
            Product product = Product.builder().pno(pno).build();

            cartItem = CartItem.builder().product(product).cart(cart).qty(qty).build();


        } else {
            cartItem.changeQty(qty);
        }

        cartItemRepository.save(cartItem) ;

        return getCartItems(email) ;
    }

    private Cart getCart(String email) {
        Cart cart = null ;

        Optional<Cart> result = cartRepository.getCartOfMember(email);

        if (result.isEmpty()) {
            log.info("Cart of the member is not exist");

            Member member = Member.builder().email(email).build();

            Cart tempCart = Cart.builder().owner(member).build();

            cart = cartRepository.save(tempCart);

        } else {
            cart = result.get();
        }
        return cart ;
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long cino) {
        Long cno = cartItemRepository.getCartFromItem(cino);

        log.info("cart no:" + cno);
        cartItemRepository.deleteById(cino);

        return cartItemRepository.getItemsOfCartDTOByCart(cno);
    }
}
