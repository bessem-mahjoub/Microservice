package com.complaints.Controller;


import java.util.*;

import com.complaints.Entities.*;
import com.complaints.service.*;
import com.complaints.Repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/complaint")
public class ComplaintController {


    @Autowired
    IProjectService iComplaintService;
    @PostMapping("/add")
    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
        try {
            complaint.setStatus(ComplaintStatus.IN_PROGRESS);
            Complaint newComplaint = iComplaintService.createComplaint(complaint);
            return new ResponseEntity<>(newComplaint, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/All")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        try {
            List<Complaint> complaints = iComplaintService.getAllComplaint();
            return new ResponseEntity<>(complaints, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // ou une autre réponse appropriée
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateComplaint(@PathVariable int id, @RequestBody Complaint updatedComplaint) {
        try {
            Optional<Complaint> complaintOpt = iComplaintService.getComplaintById(id);
            if (complaintOpt.isPresent()) {
                Complaint existingComplaint = complaintOpt.get();

                // Mettre à jour uniquement le champ 'status' si celui-ci n'est pas nul
                if (updatedComplaint.getStatus() != null) {
                    existingComplaint.setStatus(updatedComplaint.getStatus());
                }

                Complaint updated = iComplaintService.updateComplaint(existingComplaint);

                return new ResponseEntity<>(updated, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Complaint not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Log de l'erreur pour plus de détails
            e.printStackTrace();
            return new ResponseEntity<>("Error processing update", HttpStatus.BAD_REQUEST);
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable int id) {
        iComplaintService.deleteComplaint(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
