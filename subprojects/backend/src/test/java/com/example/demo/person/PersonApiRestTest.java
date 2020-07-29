package com.example.demo.person;

import com.example.demo.common.Key;
import com.example.demo.rest.RestProvider;
import com.example.demo.steps.LoginSteps;
import com.example.demo.support.SearchResult;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.hateoas.PagedModel;
import org.springframework.test.context.ActiveProfiles;

import javax.inject.Inject;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

@RequiredArgsConstructor
@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PersonApiRestTest {

    @LocalServerPort
    int port;

    @Inject private LoginSteps loginSteps;
    @Inject private PersonSteps personSteps;
    @Inject private RestProvider restProvider;

    @BeforeEach
    public void setup() throws Exception {
        restProvider.init("http://localhost", port);
        loginSteps.login("bob", "password");
    }

    @Test
    public void should_find_homer() {
        final Key key = new Key("homer");

        final PersonResource homer = personSteps.get(key);

        // TODO less brittle tests - ditch YAML in favour of JAVA or access the YAML so it can be used for the expected results

        assertThat(homer.getKey()).isEqualTo(key.getKey());
        assertThat(homer.getName().getFirstName()).isEqualTo("Homer");
        assertThat(homer.getName().getLastName()).isEqualTo("Simpson");
        assertThat(homer.getName().getOtherNames()).isEqualTo("Jay");
    }

    @Test
    public void should_update_maggie() {

        Key key = new Key("maggie");

        // change name
        Person person = new Person(key, new PersonName("Test", "User", "X"), null, LocalDate.now());
        PersonResource resource = new PersonResource().fromModel(person);

        final PersonResource maggie = personSteps.update(resource);

        // check the response from the update
        checkPerson(maggie, resource);

        // check the persisted version
        checkPerson(maggie, personSteps.get(key));

    }

    @Test
    public void should_search_by_filter() {

        final PersonSearchCriteria criteria = new PersonSearchCriteria();
        criteria.setFilter("homer");

        final SearchResult<PersonResource> result = personSteps.search(criteria);

        assertThat(result.getPage().getTotalElements()).isEqualTo(1);

    }

    @Test
    public void should_search_by_dob_from() {

        // given
        final PersonSearchCriteria criteria = new PersonSearchCriteria();
        criteria.setFrom(2000);
        // when
        final SearchResult<PersonResource> result = personSteps.search(criteria);
        // then all years should be > 2000
        final Set<Integer> dobYears = result.getContent().stream().map(resource -> resource.getDateOfBirth().getYear()).collect(Collectors.toSet());

        assertThat(dobYears)
            .isNotEmpty()
            .hasSizeGreaterThan(1)
            .allMatch(year -> year >= 2000);

    }

    @Test
    public void should_return_all_persons() {

        final PersonSearchCriteria criteria = new PersonSearchCriteria();

        final SearchResult<PersonResource> result = personSteps.search(criteria);

        assertThat(result.getPage().getTotalElements()).isGreaterThan(4);

    }

    private void checkPerson(PersonResource actual, PersonResource expected) {
        assertThat(actual.getKey()).isEqualTo(expected.getKey());
        assertThat(actual.getName().getFirstName()).isEqualTo(expected.getName().getFirstName());
        assertThat(actual.getName().getLastName()).isEqualTo(expected.getName().getLastName());
        assertThat(actual.getName().getOtherNames()).isEqualTo(expected.getName().getOtherNames());
        assertThat(actual.getDateOfBirth()).isEqualTo(expected.getDateOfBirth());
    }

}
