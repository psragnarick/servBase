package com.exProg.servBase;

import java.util.List;

public interface locationService {

    List<location> findAlllocations();

    location findByID(String id);
}