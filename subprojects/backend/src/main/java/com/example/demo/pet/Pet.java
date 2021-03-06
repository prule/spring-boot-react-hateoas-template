package com.example.demo.pet;

import com.example.demo.common.AbstractEntity;
import com.example.demo.common.Key;
import com.example.demo.person.Person;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import java.util.Date;

@Entity
public class Pet extends AbstractEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @Basic @Getter @Setter @Embedded @Valid private PetName name;
    @Basic @Getter @Setter private Date dateOfBirth;

    @ManyToOne @Getter @Setter private Person owner;

    Pet() {
        super();
    }

    public Pet(Key key, PetName name) {
        super(key);
        this.name = name;
    }
}
