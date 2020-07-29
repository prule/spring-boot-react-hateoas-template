package com.example.demo.person;

import com.example.demo.common.Fields;
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
import org.springframework.security.access.prepost.PreAuthorize;
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
    public HttpEntity<PagedModel<PersonResource>> search(PersonSearchCriteria criteria, Fields fields, Pageable pageable, PagedResourcesAssembler<Person> assembler) {
        Page<Person> page = repository.findAll(criteria.toPredicate(), pageable);

        return new ResponseEntity<>(assembler.toModel(page, (person) -> {
                    PersonResource resource = new PersonResource();
                    resource.fromModel(person, fields);
                    return resource;
                }
        ), HttpStatus.OK);

    }

    @GetMapping("/{key}")
    public PersonResource find(@PathVariable String key, Fields fields) {

        Person model = repository.findOneByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Person %s not found", key)));

        PersonResource resource = new PersonResource();
        resource.fromModel(model, fields);

        return resource;

    }

    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public PersonResource create(@RequestBody PersonResource resource, Fields fields) {

        Person model = new Person();
        resource.toModel(model);

        repository.save(model);

        return find(model.getKey().getKey(), fields);

    }

    @PutMapping("/{key}")
    @PreAuthorize("hasRole('Admin')")
    public PersonResource update(@PathVariable String key, Fields fields, @RequestBody PersonResource resource) {

        Person model = repository.findByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Person %s not found", key)));
        resource.toModel(model);

        repository.save(model);

        return find(model.getKey().getKey(), fields);

    }

}
