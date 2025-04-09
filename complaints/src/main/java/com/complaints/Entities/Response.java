package com.complaints.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "responses")  // Specify the table name for MySQL
public class Response {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Use auto-increment for MySQL
    private int idRep;

    private String message;

    private LocalDateTime responseDate;

    @Column(name = "complaint_id") // Specify the column name for the complaint ID
    private int complaintId;

    @Column(name = "user_id") // Specify the column name for user ID
    private int userId;

    @Enumerated(EnumType.STRING)  // Assuming SatisfactionLevel is an enum, store it as a string
    private SatisfactionLevel note;

    // This method sets the complaintId based on the given Complaint object's ID
    public void setComplaint(Complaint complaint) {
        this.complaintId = complaint.getIdComp();
    }

    // Constructor to directly set message and complaint ID, initializes defaults
    public Response(String msg, int cmId) {
        this.complaintId = cmId;
        this.message = msg;
        this.userId = 2;  // Default user ID, consider fetching from the session or context instead
        this.responseDate = LocalDateTime.now();
    }
}