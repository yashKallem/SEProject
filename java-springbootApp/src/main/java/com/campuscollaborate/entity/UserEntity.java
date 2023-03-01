package com.campuscollaborate.entity;

import com.campuscollaborate.utility.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class UserEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "given_name", nullable = false)
    private String givenName;
    @Column(name = "last_name", nullable = false)
    private  String lastName;
    @Column(name = "dob", nullable = false)
    private Date dob;
    @Column(name = "education_level", nullable = false)
    private  String educationLevel;
    @Column(name = "course_of_study", nullable = false)
    private  String courseOfStudy;
    @Column(name = "email", nullable = false)
    private  String email;
    @Column(name = "phone", nullable = false)
    private  String phone;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Column(name = "password", nullable = false)
    private  String  password;
  //  @Column(name = "project_ids", columnDefinition = "bigint[]")
   // private Long[] projectIds;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ProjectEntity> projects;

    @ElementCollection
    @CollectionTable(name = "user_projects", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "project_id")
    private List<Long> projectIds;


    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + userId +
                ", given_name='" + givenName + '\'' +
                ", last_name='" + lastName + '\'' +
                ", dob=" + dob +
                ", education_level='" + educationLevel + '\'' +
                ", course_of_study='" + courseOfStudy + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
