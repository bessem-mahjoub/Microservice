package com.defence.Controller;

import com.defence.Entity.Defence;
import com.defence.Services.DefenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
    @RequestMapping("/api/defences")
public class DefenceController {

    @Autowired
    private DefenceService defenceService;
    private static final Logger logger = LoggerFactory.getLogger(DefenceController.class);
    @GetMapping
    public ResponseEntity<List<Defence>> getAllDefences() {
        List<Defence> defences = defenceService.getAllDefences();
        return ResponseEntity.ok(defences);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Defence> getDefenceById(@PathVariable int id) {
        Defence defence = defenceService.getDefenceById(id);
        if (defence != null) {
            return ResponseEntity.ok(defence);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Defence> createDefence(@RequestBody Defence defence) {
        Defence createdDefence = defenceService.createDefence(defence);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDefence);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Defence> updateDefense(@PathVariable int id, @RequestBody Defence defense) {
        logger.info("Attempting to update defense with ID: {}", id);
        Defence existingDefense = defenceService.getDefenceById(id);

        if (existingDefense == null) {
            logger.warn("Defense with ID: {} not found for update", id);
            return ResponseEntity.notFound().build();
        }

        Defence updatedDefense = defenceService.updateDefence(id, defense);
        return ResponseEntity.ok(updatedDefense);
    }

    @GetMapping("/used-dates")
    public ResponseEntity<List<Date>> getUsedDates() {
        try {
            logger.info("Fetching used defense dates");
            List<Date> dates = defenceService.getUsedDates();

            if (dates == null) {
                logger.warn("No dates found");
                return ResponseEntity.ok(new ArrayList<>());
            }

            logger.info("Found {} distinct defense dates", dates.size());
            return ResponseEntity.ok(dates);

        } catch (Exception e) {
            logger.error("Error fetching used dates: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDefence(@PathVariable int id) {
        defenceService.deleteDefence(id);
        return ResponseEntity.noContent().build();
    }
}