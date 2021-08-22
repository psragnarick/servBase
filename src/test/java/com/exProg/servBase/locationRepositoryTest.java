package com.exProg.servBase;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class locationRepositoryTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void findAll() {
        List<location> items = locationRepository.findAll();
        assertEquals(3,items.size());
    }

    @Test
    void findByID() {
        location location = locationRepository.findById(10001).get();

        assertEquals("Item1",location.getName());
    }
}