package com.document.Repositories;


import com.document.entities.*;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepository extends MongoRepository<Documents, Integer> {
    List<Documents> findByType(Type type);

}