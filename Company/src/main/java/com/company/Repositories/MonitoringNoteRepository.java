package com.company.Repositories;


import com.company.Entities.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MonitoringNoteRepository extends MongoRepository<MonitoringNote,Integer> {
    @Query("{'status': ?0}")
    List<MonitoringNote> findByStatus(Status status);
}
