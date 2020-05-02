package com.example.demo;

import org.togglz.core.Feature;
import org.togglz.core.annotation.Label;
import org.togglz.core.context.FeatureContext;

public enum Features implements Feature {

    @Label("A sample feature for demonstration")
    SAMPLE
    ;

    public boolean isActive() {
        return FeatureContext.getFeatureManager().isActive(this);
    }
}
