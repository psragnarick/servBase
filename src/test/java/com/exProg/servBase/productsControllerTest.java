package com.exProg.servBase;

import org.junit.jupiter.api.Test;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.mockito.BDDMockito.given;

class productsControllerTest {

    @Test
    void getAllProducts() {
        product product = new product();
        product.setName("Nani");

        List<product> allproducts = singletonList(product);

        given(productsController.getAllProducts()).willReturn(allproducts);
    }

    @Test
    void getProductByID() {
        product product = new product();
        product.setName("Naniga");

        given(productsController.getProductByID(location.getID())).willReturn(product);
    }
}