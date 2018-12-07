package com.example.demo.index;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/1/index")
public class IndexApi {

    @GetMapping
    public IndexResource index() {

        return new IndexResource();

    }

}
