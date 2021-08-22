package com.exProg.servBase;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.mockito.BDDMockito.given;

class locationsControllerTest {

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getAlllocations() throws Exception {
        location location = new location();
        location.setName("Nani");

        List<location> allLocations = singletonList(location);

        given(locationsController.getAlllocations()).willReturn(allLocations);

    }

    @Test
    void getlocationByID() throws Exception {
        location location = new location();
        location.setName("Naniga");

        given(locationsController.getlocationByID(location.getID())).willReturn(location);
    }
}