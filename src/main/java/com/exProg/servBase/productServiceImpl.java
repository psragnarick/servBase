package com.exProg.servBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Class to implement the abstract methods and allow private repository object
@Service
public class productServiceImpl implements productService {

    @Autowired
    private productRepository productRepository;

    @Override
    public List<product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public product findByID(String id) {
        return productRepository.findByID(id);
    }
}