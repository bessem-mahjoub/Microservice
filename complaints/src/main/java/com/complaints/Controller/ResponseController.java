package com.complaints.Controller;

import java.time.LocalDateTime;
import java.util.*;

import com.complaints.Entities.*;
import com.complaints.Repositories.*;
import com.complaints.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Log4j2
@AllArgsConstructor
@NoArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/response")
public class ResponseController {
    @Autowired
    private IProjectService iProjectService;
    @Autowired
    private ComplaintRepository complaintRepository;

    @GetMapping
    public ResponseEntity<List<Response>> getAllResponse() {
        List<Response> response = iProjectService.getAllResponse();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Get documents by id
    @GetMapping("/getResponseById/{id}")
    public ResponseEntity<Response> getComplaintById(@PathVariable int id) {
        Optional<Response> response = iProjectService.getResponseById(id);
        return response.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));

    }

    @PostMapping("/cv")
    public ResponseEntity<Response> createResponse(@RequestBody Response response) {
        Complaint complaint = complaintRepository.findById(response.getComplaintId()).orElse(null);
        Response savedResponse = new Response();

        if (complaint == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        response.setResponseDate(LocalDateTime.now());
        response.setComplaint(complaint);

        if (response.getMessage() != null && !response.getMessage().isEmpty()) {
            savedResponse = iProjectService.createResponse(response);
            return new ResponseEntity<>(savedResponse, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    // Update documents
    @PutMapping("/api/response/update")
    public ResponseEntity<?> updateResponse(@RequestBody Response updatedResponse) {
        Response response = iProjectService.updateResponse(updatedResponse);
        if (response == null) {
            return new ResponseEntity<>("Response NOT FOUND", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    // Delete documents

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable int id) {
        iProjectService.deleteResponse(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/note/{id}")
    public ResponseEntity<String> giveNote(@PathVariable("id") int id, @RequestBody String note) {
        SatisfactionLevel noteO = SatisfactionLevel.valueOf(note);
        Response response = iProjectService.getResponseById(id).orElse(null);
        if (response == null) {
            return new ResponseEntity<>("Response NOT FOUND", HttpStatus.NOT_FOUND);
        }

        try {
            response.setNote(noteO);
            iProjectService.updateResponse(response);
            return new ResponseEntity<>("Done", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid SatisfactionLevel provided", HttpStatus.BAD_REQUEST);
        }
    }


}

