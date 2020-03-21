package com.example.demo.pet;

import com.example.demo.common.Key;
import com.example.demo.common.NotFoundException;
import com.example.demo.person.Person;
import com.example.demo.person.PersonRepository;
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
@RequestMapping("/api/1/pets")
public class PetApi {

    private final PetRepository repository;
    private final PersonRepository personRepository;

    public PetApi(PetRepository repository, PersonRepository personRepository) {
        this.repository = repository;
        this.personRepository = personRepository;
    }

    @GetMapping
    public HttpEntity<PagedModel<PetResource>> search(PetSearchCriteria criteria, Pageable pageable, PagedResourcesAssembler<Pet> assembler) {

        Page<Pet> page = repository.findAll(criteria.toPredicate(), pageable);

        return new ResponseEntity<>(assembler.toModel(page, (pet) -> {
                    PetResource resource = new PetResource();
                    resource.fromModel(pet);
                    return resource;
                }
        ), HttpStatus.OK);

    }

    @GetMapping("/{key}")
    public PetResource find(@PathVariable String key) {

        Pet model = repository.findByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Pet %s not found", key)));

        PetResource resource = new PetResource();
        resource.fromModel(model);

        return resource;

    }

    @PostMapping
    public PetResource create(@RequestBody PetResource resource) {

        Pet model = new Pet();
        resource.toModel(model);

        if (resource.getOwner() != null) {
            String key = resource.getOwner().getKey();
            Person owner = personRepository.findOneByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Person %s not found", key)));
            model.setOwner(owner);
        }
        repository.save(model);

        return find(model.getKey().getKey());

    }

    @PutMapping("/{key}")
    public PetResource update(@PathVariable String key, @RequestBody PetResource resource) {

        Pet model = repository.findByKey(new Key(key)).orElseThrow(() -> new NotFoundException(String.format("Pet %s not found", key)));
        resource.toModel(model);

        repository.save(model);

        return find(model.getKey().getKey());

    }

}
