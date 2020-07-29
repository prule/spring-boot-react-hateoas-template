package com.example.demo.person;

import com.example.demo.common.Address;
import com.example.demo.common.Key;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class PersonResourceTest {

    @Test
    public void should_map_entity_to_resource() {
        // given
        Person person = new Person(
            new Key("test"),
            new PersonName("Test", "User", "X"),
            new Address("line1", "line2", "city", "state", "country", "postcode"),
            LocalDate.now()
        );
        // when
        PersonResource resource = new PersonResource().fromModel(person);
        // then
        assertThat(resource.getKey()).isEqualTo(person.getKey().getKey());
        assertThat(resource.getName().getFirstName()).isEqualTo(person.getName().getFirstName());
        assertThat(resource.getName().getLastName()).isEqualTo(person.getName().getLastName());
        assertThat(resource.getName().getOtherNames()).isEqualTo(person.getName().getOtherNames());
        assertThat(resource.getDateOfBirth()).isEqualTo(person.getDateOfBirth());

    }

}