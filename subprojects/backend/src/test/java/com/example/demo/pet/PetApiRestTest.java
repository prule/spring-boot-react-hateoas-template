package com.example.demo.pet;

import com.example.demo.common.Fields;
import com.example.demo.common.Key;
import com.example.demo.rest.RestProvider;
import com.example.demo.steps.LoginSteps;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.hateoas.PagedModel;
import org.springframework.test.context.ActiveProfiles;

import javax.inject.Inject;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PetApiRestTest {

    @LocalServerPort
    int port;

    @Inject private LoginSteps loginSteps;
    @Inject private PetSteps petSteps;
    @Inject private RestProvider restProvider;

    @BeforeEach
    public void setup() throws Exception {
        restProvider.init("http://localhost", port);
        loginSteps.login("bob", "password");
    }

    @Test
    public void should_find_jaws() {

        final Key jaws = new Key("jaws");

        final PetResource result = petSteps.get(jaws);

        assertThat(result.getName().getName()).isEqualTo("Jaws");
    }

    @Test
    public void should_update_pet() {

        Key key = new Key("fido");

        // change name
        Pet pet = new Pet(key, new PetName("KUJO"));
        pet.setDateOfBirth(LocalDate.now());

        PetResource resource = new PetResource().fromModel(pet, Fields.all());

        final PetResource result = petSteps.update(resource);

        // check update
        checkPet(result, resource);

        // check persisted version
        checkPet(petSteps.get(key), resource);
    }

    @Test
    public void should_search_pets_by_person() {

        final PetSearchCriteria criteria = new PetSearchCriteria();
        criteria.setPersonKey("homer");

        final PagedModel<PetResource> results = petSteps.search(criteria);

        assertThat(results.getMetadata().getTotalElements()).isEqualTo(2);

    }

    @Test
    public void should_return_all_pets() {

        final PetSearchCriteria criteria = new PetSearchCriteria();

        final PagedModel<PetResource> results = petSteps.search(criteria);

        assertThat(results.getMetadata().getTotalElements()).isGreaterThan(4);

    }


    private void checkPet(PetResource actual, PetResource expected) {
        assertThat(actual.getKey()).isEqualTo(expected.getKey());
        assertThat(actual.getName().getName()).isEqualTo(expected.getName().getName());
        assertThat(actual.getDateOfBirth()).isEqualTo(expected.getDateOfBirth());
    }
}
