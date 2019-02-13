package com.example.demo.data.sample;

import com.example.demo.person.Person;
import com.example.demo.person.PersonRepository;
import com.example.demo.pet.Pet;
import com.example.demo.pet.PetRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.introspector.BeanAccess;

import java.io.InputStream;
import java.util.function.Function;

@Component
public class SampleLoader {

    private final PersonRepository personRepository;
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SampleLoader(PersonRepository personRepository, PetRepository petRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.personRepository = personRepository;
        this.petRepository = petRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void load() {
        createOrUpdate("data/sample/users.yaml", obj -> createOrUpdateUser((User) obj));
        createOrUpdate("data/sample/persons.yaml", obj -> createOrUpdatePerson((Person) obj));
    }

    private void createOrUpdate(String path, Function runnable) {
        // load object graph
        Iterable objects = loadData(path);
        // create or update accordingly
        for (Object obj : objects) {
            runnable.apply(obj);
        }

    }

    private User createOrUpdateUser(User newUser) {
        final User user = userRepository.findByKey(newUser.getKey()).orElse(newUser);
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(user);
        return user;
    }

    private Person createOrUpdatePerson(Person newPerson) {
        final Person person = personRepository.findByKey(newPerson.getKey()).orElse(newPerson);

        // copy fields we wish to update
        person.setName(person.getName());
        person.setAddress(person.getAddress());
        person.setDateOfBirth(person.getDateOfBirth());
        personRepository.save(person);

        // create or update associated pets
        if (newPerson.hasPets()) {
            for (Pet pet : person.getPets()) {
                createOrUpdatePet(pet, person);
            }
        }

        return person;
    }

    private Pet createOrUpdatePet(Pet newPet, Person owner) {
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
