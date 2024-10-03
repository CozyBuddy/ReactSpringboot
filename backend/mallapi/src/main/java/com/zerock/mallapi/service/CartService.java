package com.zerock.mallapi.service;

import java.util.List;

import com.zerock.mallapi.domain.Cart;
import com.zerock.mallapi.dto.CartItemDTO;
import com.zerock.mallapi.dto.CartItemListDTO;

import jakarta.transaction.Transactional;

@Transactional
public interface CartService {

    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) ;

    public List<CartItemListDTO> getCartItems(String email) ;

    public List<CartItemListDTO> remove(Long cino) ;
}
