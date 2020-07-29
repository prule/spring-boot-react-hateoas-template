package com.example.demo.person;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class PersonNameTest {

    @Test
    public void should_be_equal() {
        final PersonName name1 = new PersonName("1", "2", "3");
        final PersonName name2 = new PersonName("1", "2", "3");
        assertThat(name1).isEqualTo(name2);
    }

    @Test
    public void should_not_be_equal() {
        final PersonName name1 = new PersonName("1", "2", "3");
        final PersonName name2 = new PersonName("1a", "2", "3");
        assertThat(name1).isNotEqualTo(name2);
    }
}