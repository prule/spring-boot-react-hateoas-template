package com.example.demo.debug;

import lombok.Getter;
import lombok.Setter;
import org.springframework.hateoas.RepresentationModel;

@Getter
@Setter
public class DebugResource extends RepresentationModel<DebugResource> {

    private String message;
    private String applicationVersion;

}
