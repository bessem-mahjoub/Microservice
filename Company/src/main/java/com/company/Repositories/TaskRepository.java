package com.company.Repositories;


import com.company.Entities.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, Integer> {
    List<Task> findByTaskDescriptionContainingIgnoreCase(String keyword);
    List<Task> findByProgressContainingIgnoreCase(String keyword);
    List<Task> findByDurationContainingIgnoreCase(String keyword);
    List<Task> findBySupervisorNameContainingIgnoreCase(String keyword);
    List<Task> findByStudentNameContainingIgnoreCase(String keyword);
}
