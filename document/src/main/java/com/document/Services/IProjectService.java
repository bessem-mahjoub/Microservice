package com.document.Services;

import com.document.entities.*;
import org.springframework.core.io.Resource;

import java.util.List;
import java.util.Optional;

public interface IProjectService {
    /******Tasks*****/

    /*******USER*********/
    List<User> getAllUsers();
    Optional<User> getUserById(int id);
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(int id);
    /***********************OMAR******************************/
    /***************************OMAR****************************/
    List<Documents> getAlldocuments();

    Optional<Documents> getdocumentsById(int id);

    Documents createdocuments(Documents documents, byte[] fileContent);


    Documents updatedocuments(Documents documents);

    void deletedocuments(int id);

    List<Documents> getDocumentsByType(Type type);
}

