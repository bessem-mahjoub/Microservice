package com.company.Repositories;


import com.company.Entities.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends MongoRepository<ChatMessage, Integer> {
    List<ChatMessage> findBySender_IdAndRecipient_Id(int supervisorId, int studentId);
}
