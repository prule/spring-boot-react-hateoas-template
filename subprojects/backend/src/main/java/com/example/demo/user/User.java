package com.example.demo.user;

import com.example.demo.common.AbstractEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity(name = "usr") // name of table is changed to avoid naming conflicts with database
public class User extends AbstractEntity<String> {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

    @NotNull @Basic @Getter private String username;
    @NotNull @Basic @Getter @Setter private String password;

    @NotNull @Basic @Getter @Setter private String firstName;
    @NotNull @Basic @Getter @Setter private String lastName;

    @NotNull @Basic @Getter @Setter private boolean enabled;

    @ManyToMany(fetch = FetchType.EAGER) @Getter private Set<UserGroup> groups;

    User() {
        super();
    }

    public static boolean hasRole(String role) {
        return false;
    }
}
