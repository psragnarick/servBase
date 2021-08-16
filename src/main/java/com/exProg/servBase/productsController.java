package com.exProg.servBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//Controller for handling product info in MongoDB
@RestController
@RequestMapping("/products")
public class productsController {

    @Autowired
    private productService productService;

    //Mapping for GET request to retrieve all products
    @GetMapping(value="/")
    public List<product> getAllProducts(){
        return productService.findAllProducts();
    }

    //Mapping for GET request to retrieve a product by its ID Number
    @GetMapping(value="/{id}")
    public product getProductByID(@PathVariable("id") String id){
        return productService.findByID(id);
    }

}