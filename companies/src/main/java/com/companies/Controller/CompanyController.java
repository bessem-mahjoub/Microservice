package com.companies.Controller;

import com.companies.Entities.Company;
import com.companies.Repositories.CompanyRepository;
import com.companies.Services.IProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private IProjectService iProjectService;
    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompany() {
        List<Company> companies = companyRepository.findAll();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/{idComp}")
    public ResponseEntity<Company> getCompanyById(@PathVariable int idComp) {
        Optional<Company> company = companyRepository.findById(idComp);
        return company.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/add")
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        try {
            Company createdCompany = iProjectService.createcompany(company);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCompany);
        } catch (Exception e) {
            e.printStackTrace();  // Consider proper logging instead
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{idComp}")
    public ResponseEntity<Company> updateCompany(@PathVariable int idComp, @RequestBody Company company) {
        Company oldCompany = companyRepository.findById(idComp).orElse(null);
        if (oldCompany == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        company.setId(oldCompany.getId());
        Company updatedCompany = iProjectService.updatecompany(company);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
    }

    @DeleteMapping("/{IdComp}")
    public ResponseEntity<Void> deleteCompany(@PathVariable("IdComp") int IdComp) {
        Company existingTask = companyRepository.findById(IdComp).orElse(null);
        if (existingTask != null) {
            companyRepository.deleteById(IdComp);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
