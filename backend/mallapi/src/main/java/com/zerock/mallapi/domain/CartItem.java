package com.zerock.mallapi.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString(exclude = "cart")
@Table ( name = "tbl_cart_item" , indexes = {
    @Index(columnList = "cart_cno" , name="idx_cartitem_cart") ,
    @Index(columnList = "product_pno , cart_cno" , name="idx_cartitem_pno_cart" )
})
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cino ;

    @ManyToOne
    @JoinColumn(name = "product_pno")
    private Product product ;

    @ManyToOne
    @JoinColumn(name = "cart_cno")
    private Cart cart ;

    private int qty ;

    public void changeQty(int qty) {
        this.qty = qty ; 
    }
}
