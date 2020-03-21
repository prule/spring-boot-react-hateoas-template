package com.example.demo.person;

import com.example.demo.common.AbstractEntity;
import com.example.demo.common.Address;
import com.example.demo.common.Key;
import com.example.demo.pet.Pet;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.Date;
import java.util.Set;

@Entity
public class Person extends AbstractEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @Getter @Setter @Embedded @Valid private PersonName name;
    @Getter @Setter @Embedded private Address address;
    @Basic @Getter @Setter private Date dateOfBirth;

    @OneToMany(mappedBy = "owner") @Getter private Set<Pet> pets;

    public Person() {
        super();
    }

    public Person(Key key, PersonName name, Address address) {
        super(key);
        this.name = name;
        this.address = address;
    }

    public boolean hasPets() {
        return getPets() != null && !getPets().isEmpty();
    }
}
