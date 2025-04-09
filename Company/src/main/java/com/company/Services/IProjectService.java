package com.company.Services;

import com.company.Entities.*;
import org.springframework.core.io.Resource;

import java.util.List;
import java.util.Optional;

public interface IProjectService {

    /*****************************************/
    List<Offer> getAllOffer();

    Optional<Offer> getofferById(int id);
    List<Offer> getoffersByCompany(int id);

    Offer createoffer(Offer offer);

    Offer updateoffer(Offer offer);

    void deleteoffer(int id);
    /***************************************/
    List<Company> getAllcompany();

    Optional<Company> getCompanyById(int idComp);

    Company createcompany(Company company);

    Company updatecompany(Company company);

    void deletecompany(int idComp);
    /***************************************/
}

