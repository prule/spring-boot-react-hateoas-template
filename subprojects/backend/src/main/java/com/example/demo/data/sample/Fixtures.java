package com.example.demo.data.sample;

import com.example.demo.common.Address;
import com.example.demo.common.Key;
import com.example.demo.person.Person;
import com.example.demo.person.PersonName;
import lombok.Getter;

import java.time.LocalDate;

public class Fixtures {
    public enum Persons {
        Fred(new Person(
                new Key("fred"),
                new PersonName("Fred", "Flinstone", "Freddy"),
                new Address("line1", "line2", "city", "state", "country", "postcode"),
                LocalDate.now()
            ));

        @Getter
        private final Person person;

        Persons(Person person) {
            this.person = person;
        }
    }
}
