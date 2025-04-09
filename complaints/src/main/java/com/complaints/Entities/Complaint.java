package com.complaints.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "complaints")
public class Complaint {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idComp;

    @Column(name = "description", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_rec", nullable = false)
    private TypeRec typeRec; // Assuming TypeRec is an Enum

    @Column(name = "date_complaint", nullable = false)
    private LocalDateTime dateComplaint;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "lastname", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "message")
    private String message;

    private Integer userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ComplaintStatus status = ComplaintStatus.IN_PROGRESS;


    @Enumerated(EnumType.STRING)
    @Column(name = "note")
    private SatisfactionLevel note;
}





