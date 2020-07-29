package com.example.demo.common.support;

import org.yaml.snakeyaml.constructor.Constructor;
import org.yaml.snakeyaml.nodes.Node;
import org.yaml.snakeyaml.nodes.NodeId;
import org.yaml.snakeyaml.nodes.ScalarNode;

import java.time.LocalDate;

public class LocalDateYamlConstructor extends Constructor {
    public LocalDateYamlConstructor() {
        this.yamlClassConstructors.put(NodeId.scalar, new LocalDateConstructor());
    }

    private class LocalDateConstructor extends ConstructScalar {
        public Object construct(Node node) {
            if (node.getType().equals(LocalDate.class)) return LocalDate.parse(((ScalarNode) node).getValue());
            else return super.construct(node);
        }
    }
}