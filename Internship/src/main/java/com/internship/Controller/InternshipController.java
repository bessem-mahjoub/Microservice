package com.internship.Controller;

import com.internship.Entities.Internship;
import com.internship.Service.InternshipServiceImpl;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;
@Controller
@AllArgsConstructor
@RestController
@RequestMapping("/api/internships")
public class InternshipController {

    @Autowired
    private InternshipServiceImpl internshipService;

    // Get all internships
    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternship() {
        List<Internship> internships = internshipService.getAllInternships();
        return new ResponseEntity<>(internships, HttpStatus.OK);
    }

    // Get internship by id
    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable int id) {
        Optional<Internship> internship = internshipService.getInternshipById(id);
        if (internship.isPresent()) {
            return new ResponseEntity<>(internship.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create internship
    @PostMapping
    public ResponseEntity<Internship> createInternship(@RequestBody Internship internship) {
        try {
            Internship newInternship = internshipService.createInternship(internship);
            return new ResponseEntity<>(newInternship, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update internship
    @PutMapping("/{id}")
    public ResponseEntity<Internship> updateInternship(@PathVariable int id, @RequestBody Internship internship) {
        Optional<Internship> oldInternship = internshipService.getInternshipById(id);
        if (oldInternship.isPresent()) {
            internship.setId(id); // Set the ID of the internship to ensure the correct record is updated
            Internship updatedInternship = internshipService.updateInternship(internship);
            return new ResponseEntity<>(updatedInternship, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete internship
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable int id) {
        internshipService.deleteInternship(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
