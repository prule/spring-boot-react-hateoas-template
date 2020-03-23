package com.example.demo;

import com.example.demo.data.sample.SampleLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class Main {

	private final SampleLoader sampleLoader;

	public Main(SampleLoader sampleLoader) {
		this.sampleLoader = sampleLoader;
	}

	@EventListener(ApplicationReadyEvent.class)
	public void postStartup() {
	    sampleLoader.load();
	}

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
