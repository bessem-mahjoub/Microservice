package com.company.Repositories;


import com.company.Entities.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MessagesRepository  extends MongoRepository<ChatMessage, Integer> {
}
