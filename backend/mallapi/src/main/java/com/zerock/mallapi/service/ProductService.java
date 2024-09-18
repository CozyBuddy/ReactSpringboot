package com.zerock.mallapi.service;

import com.zerock.mallapi.dto.PageRequestDTO;
import com.zerock.mallapi.dto.PageResponseDTO;
import com.zerock.mallapi.dto.ProductDTO;

import jakarta.transaction.Transactional;

@Transactional
public interface ProductService {
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(ProductDTO productDTO);

    ProductDTO get(Long pno);

    void modify(ProductDTO productDTO);

    void remove(Long pno);
}
