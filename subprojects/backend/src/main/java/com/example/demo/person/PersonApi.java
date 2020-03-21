package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.common.NotFoundException;
import com.example.demo.pet.PetSearchCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@Transactional
@RequestMapping("/api/1/persons")
public class PersonApi {

    private final PersonRepository repository;

    public PersonApi(PersonRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public HttpEntity<PagedModel<PersonResource>> search(PersonSearchCriteria criteria, Pageable pageable, PagedResourcesAssembler<Person> assembler) {
        Page<Person> page = repository.findAll(criteria.toPredicate(), pageable);

        return new ResponseEntity<>(assembler.toModel(page, (person) -> {
                    PersonResource resource = new PersonResource();
                    resource.fromModel(person);
                    return resource;
                }
        ), HttpStatus.OK);

    }

    @GetMapping("/{key}")
    public PersonResource find(@PathVariable String key) {

        Person model = repository.findOneByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Person %s not found", key)));

        PersonResource resource = new PersonResource();
        resource.fromModel(model);

        return resource;

    }

    @PostMapping
    public PersonResource create(@RequestBody PersonResource resource) {

        Person model = new Person();
        resource.toModel(model);

        repository.save(model);

        return find(model.getKey().getKey());

    }

    @PutMapping("/{key}")
    public PersonResource update(@PathVariable String key, @RequestBody PersonResource resource) {

        Person model = repository.findByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Person %s not found", key)));
        resource.toModel(model);

        repository.save(model);

        return find(model.getKey().getKey());

    }

}
