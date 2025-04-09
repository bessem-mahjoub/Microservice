package com.internship.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "internships")
public class Internship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int idCompany;
    private String duration;
    private String subject;
    private String description;
    private String degreeStageO;

    // Assuming TypeInternship is an enum or a class defined elsewhere in the project
    private TypeInternship type;
}
