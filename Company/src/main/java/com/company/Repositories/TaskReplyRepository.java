package com.company.Repositories;


import com.company.Entities.TaskReply;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskReplyRepository extends MongoRepository<TaskReply, Integer> {}
