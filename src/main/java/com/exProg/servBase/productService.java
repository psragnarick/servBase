package com.exProg.servBase;

import java.util.List;

public interface productService {

    List<product> findAllProducts();

    product findByID(String id);
}