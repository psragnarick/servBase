package com.exProg.servBase;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "locations", path = "locations")
public interface locationRepository extends CrudRepository<location, String> {
    //Repository function to get all locations
    List<location> findAll();
    //Repository function to retrieve one location info
    location findByID(String id);
}