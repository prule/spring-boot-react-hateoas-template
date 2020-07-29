package com.example.demo.debug;

import com.example.demo.common.ApplicationVersion;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/1/debug")
@Profile("dev")
public class DebugApi {

    private final ApplicationVersion applicationVersion;

    public DebugApi(ApplicationVersion applicationVersion) {
        this.applicationVersion = applicationVersion;
    }

    @PutMapping("/version")
    public DebugResource setApplicationVersion() {
        applicationVersion.setVersion(UUID.randomUUID().toString());

        final DebugResource resource = new DebugResource();
        resource.setMessage("Application version set");
        resource.setApplicationVersion(applicationVersion.getVersion());

        return resource;
    }
}
