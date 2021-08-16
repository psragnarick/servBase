package com.exProg.servBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

//Class to implement the abstract methods and allow private repository object
@Service
public class locationServiceImpl implements locationService {

    @Autowired
    private locationRepository locationRepository;

    @Override
    public List<location> findAlllocations() {
        return locationRepository.findAll();
    }

    @Override
    public location findByID(String id) {
        return locationRepository.findByID(id);
    }
}