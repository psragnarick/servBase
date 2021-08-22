package com.exProg.servBase;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.mockito.BDDMockito.given;

class productServiceTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findAllProducts() {
        product product = new product();
        product.setName("Nani");

        List<product> allproducts = singletonList(product);

        given(productsController.getAllProducts()).willReturn(allproducts);
    }

    @Test
    void findByID() {
        product product = new product();
        product.setName("Naniga");

        given(productsController.getProductByID(location.getID())).willReturn(product);
    }
}