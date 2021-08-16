package com.exProg.servBase;

import org.springframework.data.annotation.Id;

public class location {

    @Id
    private String id;
    private String name;
    private String value;

    public String getID(){
        return id;
    }

    public void setID(String id){
        this.id = id;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getValue(){
        return value;
    }

    public void setValue(String value){
        this.value = value;
    }

}