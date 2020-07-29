package com.example.demo.index;

import com.example.demo.Features;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.togglz.core.manager.FeatureManager;

@Slf4j
@RestController
@RequestMapping("/api/1/index")
public class IndexApi {

    private final FeatureManager manager;

    public IndexApi(FeatureManager manager) {
        this.manager = manager;
    }

    @GetMapping
    public IndexResource index() {

        if (manager.isActive(Features.SAMPLE)) {
            log.info("Sample feature is active");
        } else {
            log.info("Sample feature is NOT active");
        }

        return new IndexResource();

    }

}
