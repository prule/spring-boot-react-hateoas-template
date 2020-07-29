package com.example.demo.common;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
public class ApplicationVersion {

    @Setter @Getter @Value("${git.commit.id:}") String version;

}
