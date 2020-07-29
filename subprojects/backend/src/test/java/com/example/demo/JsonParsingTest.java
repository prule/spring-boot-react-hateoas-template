package com.example.demo;

import com.example.demo.support.SearchResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import javax.inject.Inject;
import java.io.IOException;
import java.io.StringWriter;

@ActiveProfiles({"dev", "db-test", "db-init"})
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JsonParsingTest {

    @Inject ObjectMapper objectMapper;

    @Test
    public void should_deserialize_to_search_result() throws IOException {
        final SearchResult searchResult = objectMapper.readValue(this.getClass().getClassLoader().getResourceAsStream("sample-search-result.json"), SearchResult.class);
        System.out.println(searchResult);
    }

    @Test
    public void should_serialize_search_result() throws IOException {
        final SearchResult<Object> searchResult = new SearchResult<>();
        searchResult.setTest("hello");

        final StringWriter stringWriter = new StringWriter();
        objectMapper.writeValue(stringWriter, searchResult);

        System.out.println(stringWriter.toString());
    }
}
