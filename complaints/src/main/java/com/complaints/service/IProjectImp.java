package com.complaints.service;

import com.complaints.Entities.*;
import com.complaints.Repositories.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class IProjectImp implements IProjectService {

    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private ResponseRepository responseRepository;

    /****************complaint***********/
    @Override
    public List<Complaint> getAllComplaint() {
        return complaintRepository.findAll();
    }

    @Override
    public Optional<Complaint> getComplaintById(int idComp) {
        return complaintRepository.findById(idComp);
    }

    @Override
    public Complaint createComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public Complaint updateComplaint(Complaint complaint) {
        return complaintRepository.save(complaint);
    }

    @Override
    public void deleteComplaint(int id) {
        complaintRepository.deleteById(id);
    }

    /***************Response************/

    @Override
    public List<Response> getAllResponse() {
        return responseRepository.findAll();
    }

    @Override
    public Optional<Response> getResponseById(int id) {
        return responseRepository.findById(id);
    }

    @Override
    public Response createResponse(Response response) {
        try {
            // Récupérer l'objet Complaint à partir de son ID
            Complaint complaint = complaintRepository.findById(response.getComplaintId()).orElse(null);
            if (complaint == null) {
                // Gérer le cas où la réclamation n'existe pas
                return null; // Handle this case as needed
            }
            // Enregistrer la réponse en associant l'objet Complaint
            response.setComplaint(complaint);
            return responseRepository.save(response);
        } catch (Exception e) {
            log.info("Exception lors de la création de la réponse : {}", e.getMessage());
            return null;
        }
    }


    @Override
    public Response updateResponse(Response response) {
        return responseRepository.save(response);
    }

    @Override
    public void deleteResponse(int id) {
        responseRepository.deleteById(id);
    }
}
