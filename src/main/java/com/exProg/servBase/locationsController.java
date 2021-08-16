package com.exProg.servBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//Controller for handling location info in MongoDB
@RestController
@RequestMapping("/locations")
public class locationsController {

    @Autowired
    private locationService locationService;

    //Mapping for GET request to retrieve all locations
    @GetMapping(value="/")
    public List<location> getAlllocations(){
        return locationService.findAlllocations();
    }

    //Mapping for GET request to retrieve a location by its ID Number
    @GetMapping(value="/{id}")
    public location getlocationByID(@PathVariable("id") String id){
        return locationService.findByID(id);
    }

}