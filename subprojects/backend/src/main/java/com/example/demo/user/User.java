package com.example.demo.user;

import com.example.demo.common.AbstractEntity;
import com.example.demo.common.Key;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "usr") // name of table is changed to avoid naming conflicts with database
public class User extends AbstractEntity {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @Basic @Getter private String username;
    @Basic @Getter @Setter private String password;
    @Basic @Getter private boolean enabled;

    User() {
        super();
    }

    public User(Key key, String username) {
        super(key);
        this.username = username;
    }
}
