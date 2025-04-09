package com.company.Repositories;


import com.company.Entities.TurnIn;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TurnInRepository extends MongoRepository<TurnIn, Integer> {
    List<TurnIn> findByStudentId(int studentId);
}
