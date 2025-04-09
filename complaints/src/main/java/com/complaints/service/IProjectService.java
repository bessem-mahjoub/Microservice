package com.complaints.service;

import com.complaints.Entities.*;
import java.util.List;
import java.util.Optional;

public interface IProjectService {

    /*********************reclamation***********************/
    List<Complaint> getAllComplaint();

    Optional<Complaint> getComplaintById(int id);

    Complaint createComplaint(Complaint complaint) throws Exception;

    Complaint updateComplaint(Complaint complaint);

    void deleteComplaint(int id);
    /*****************************/
    List<Response> getAllResponse();

    Optional<Response> getResponseById(int id);

    Response createResponse(Response response);

    Response updateResponse(Response response);

    void deleteResponse(int idRep);
}

