package com.companies.Config;

import com.companies.Entities.*;
import com.companies.Repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;

    private final OffreRepository offreRepository;

    public DatabaseInitializer(
                               CompanyRepository companyRepository,


            OffreRepository offreRepository) {

        this.companyRepository = companyRepository;

        this.offreRepository=offreRepository;

    }

    @Override
    public void run(String... args) {

        if (companyRepository.count() == 0) {
            Company company = new Company();
            companyRepository.save(company);
        }



        if (offreRepository.count() == 0) {
            Offer offre = new Offer();
            offreRepository.save(offre);
        }

    }
}