package com.example.demo.data.sample;

import com.example.demo.person.Person;
import com.example.demo.person.PersonRepository;
import com.example.demo.pet.Pet;
import com.example.demo.pet.PetRepository;
import com.example.demo.user.User;
import com.example.demo.user.UserGroup;
import com.example.demo.user.UserGroupRepository;
import com.example.demo.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.introspector.BeanAccess;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.function.Function;

@RequiredArgsConstructor
@Component
public class SampleLoader {

    private final PersonRepository personRepository;
    private final PetRepository petRepository;
    private final UserGroupRepository userGroupRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void load() {
        createOrUpdate("data/sample/userGroups.yaml", obj -> createOrUpdateUserGroup((UserGroup) obj));
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

    private UserGroup createOrUpdateUserGroup(UserGroup newUserGroup) {
        final UserGroup userGroup = userGroupRepository.findByKey(newUserGroup.getKey()).orElse(newUserGroup);
        userGroupRepository.save(userGroup);
        return userGroup;
    }

    private User createOrUpdateUser(User newUser) {
        final List<UserGroup> newGroups = new ArrayList<>(newUser.getGroups());
        for (int i = 0; i < newGroups.size(); i++) {
            newGroups.set(i, createOrUpdateUserGroup(newGroups.get(i)));
        }

        final User user = userRepository.findByKey(newUser.getKey()).orElse(newUser);
        user.setPassword(passwordEncoder.encode(newUser.getPassword()));
        user.getGroups().clear();
        user.getGroups().addAll(newGroups);

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
