package com.exProg.servBase;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface productRepository extends CrudRepository<product, String> {
    //Repository function to get all products
    List<product> findAll();
    //Repository function to retrieve one product info
    product findByID(String id);
}