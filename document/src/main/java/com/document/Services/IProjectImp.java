package com.document.Services;

import com.document.Repositories.DocumentsRepository;
import com.document.Repositories.UserRepository;
import com.document.entities.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class IProjectImp implements IProjectService {


    @Autowired
    private UserRepository userRepository;
    @Autowired
    private DocumentsRepository documentsRepository;
    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    private MongoTemplate mongoTemplate;
    private Set<String> stopWords = new HashSet<>();


    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    /****************************************************************/
    @Override
    public List<Documents> getAlldocuments() {
        return documentsRepository.findAll();
    }

    @Override
    public Optional<Documents> getdocumentsById(int id) {
        return documentsRepository.findById(id);
    }



    @Override
    public Documents createdocuments(Documents documents, byte[] fileContent) {
        documents.setIdDoc(sequenceGeneratorService.generateSequence("documents_sequence"));
        documents.setContent(new Binary(fileContent)); // Set content as Binary
        return documentsRepository.save(documents);
    }



    @Override
    public List<Documents> getDocumentsByType(Type type) {
        return documentsRepository.findByType(type);
    }

    @Override
    public Documents updatedocuments(Documents documents) {
        return documentsRepository.save(documents);
    }

    @Override
    public void deletedocuments(int id) {
        documentsRepository.deleteById(id);
    }

    /********************************************************************************/

}