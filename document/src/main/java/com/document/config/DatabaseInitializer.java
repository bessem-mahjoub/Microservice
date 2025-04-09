package com.document.config;

import com.document.Repositories.DocumentsRepository;
import com.document.Repositories.UserRepository;
import com.document.entities.Documents;
import com.document.entities.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final DocumentsRepository documentsRepository;
    public DatabaseInitializer(
                               UserRepository userRepository,
                               DocumentsRepository documentsRepository
    ) {
        this.userRepository = userRepository;
        this.documentsRepository=documentsRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            User user = new User();
            userRepository.save(user);
        }



        if (documentsRepository.count() == 0) {
            Documents document = new Documents();
            documentsRepository.save(document);
        }
    }
}