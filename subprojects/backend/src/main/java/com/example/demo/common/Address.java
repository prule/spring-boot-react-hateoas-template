package com.example.demo.common;

import lombok.Data;

import javax.persistence.Embeddable;

@Data
@Embeddable
public class Address {

    private String line1;
    private String line2;
    private String city;
    private String state;
    private String country;

    private String postcode; // zipcode etc

}
