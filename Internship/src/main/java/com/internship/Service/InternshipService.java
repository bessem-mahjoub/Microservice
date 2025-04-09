package com.internship.Service;


import com.internship.Entities.Internship;

import java.util.List;
import java.util.Optional;

public interface InternshipService {

    // Fetch all internships
    List<Internship> getAllInternships();

    // Fetch an internship by ID
    Optional<Internship> getInternshipById(int id);

    // Create a new internship
    Internship createInternship(Internship internship);

    // Update an existing internship
    Internship updateInternship(Internship internship);

    // Delete an internship by ID
    void deleteInternship(int id);
}
