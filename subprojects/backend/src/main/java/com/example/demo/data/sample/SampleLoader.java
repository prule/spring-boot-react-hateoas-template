package com.example.demo.data.sample;

import com.example.demo.person.Person;
import com.example.demo.person.PersonRepository;
import com.example.demo.pet.Pet;
import com.example.demo.pet.PetRepository;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.introspector.BeanAccess;

import java.io.InputStream;

@Component
public class SampleLoader {

    private final PersonRepository personRepository;
    private final PetRepository petRepository;

    public SampleLoader(PersonRepository personRepository, PetRepository petRepository) {
        this.personRepository = personRepository;
        this.petRepository = petRepository;
    }

    public void load() {
        createOrUpdatePersons();
    }

    private void createOrUpdatePersons() {

        // load a graph of sample Persons and associated Pets
        Iterable objects = loadData("data/sample/persons.yaml");

        // create or update accordingly
        for (Object obj : objects) {
            createOrUpdate((Person) obj);
        }

    }

    private Person createOrUpdate(Person newPerson) {
        final Person person = personRepository.findByKey(newPerson.getKey()).orElse(newPerson);

        // copy fields we wish to update
        person.setName(person.getName());
        person.setAddress(person.getAddress());
        person.setDateOfBirth(person.getDateOfBirth());
        personRepository.save(person);

        // create or update associated pets
        if (newPerson.hasPets()) {
            for (Pet pet : person.getPets()) {
                createOrUpdate(pet, person);
            }
        }

        return person;
    }

    private Pet createOrUpdate(Pet newPet, Person owner) {
        final Pet pet = petRepository.findByKey(newPet.getKey()).orElse(newPet);

        // copy fields we wish to update
        pet.setOwner(owner);
        pet.setDateOfBirth(newPet.getDateOfBirth());

        petRepository.save(pet);

        return pet;
    }

    private Iterable loadData(String path) {
        Yaml yaml = new Yaml();
        yaml.setBeanAccess(BeanAccess.FIELD);
        InputStream inputStream = this.getClass()
                .getClassLoader()
                .getResourceAsStream(path);
        return yaml.loadAll(inputStream);
    }
}
