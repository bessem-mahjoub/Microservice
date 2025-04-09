package com.internship.Service;

import com.internship.Entities.Internship;
import com.internship.Repository.InternshipRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
@AllArgsConstructor
@NoArgsConstructor
public class InternshipServiceImpl {
    @Autowired
    private InternshipRepository internshipRepository;

    // Get all internships
    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    // Get internship by ID
    public Optional<Internship> getInternshipById(int id) {
        return internshipRepository.findById(id);
    }

    // Create a new internship
    public Internship createInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    // Update an existing internship
    public Internship updateInternship(Internship internship) {
        if (internshipRepository.existsById(internship.getId())) {
            return internshipRepository.save(internship);
        } else {
            throw new IllegalArgumentException("Internship with ID " + internship.getId() + " not found");
        }
    }

    // Delete an internship by ID
    public void deleteInternship(int id) {
        internshipRepository.deleteById(id);
    }
}
