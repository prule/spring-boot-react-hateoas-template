package com.example.demo.user;

import com.example.demo.common.AbstractEntity;
import com.example.demo.common.Key;
import com.example.demo.person.Person;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
public class UserGroup extends AbstractEntity<String> {

    public enum Group { ADMIN("Admin"), USER("User");
        private final String id;
        Group(String id) {
            this.id = id;
        }
        public String getId() {
            return id;
        }
    }

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @Basic @Getter private String name;
    @Basic @Getter @Setter private String description;
    @Basic @Getter private boolean enabled;

    UserGroup() {
        super();
    }

    public UserGroup(Key key, String name, String description, boolean enabled) {
        super(key);
        this.name = name;
        this.description = description;
        this.enabled = enabled;
    }
}
