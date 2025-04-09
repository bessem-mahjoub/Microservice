
package com.company.Controller;


import com.company.Entities.Company;
import com.company.Repositories.CompanyRepository;
import com.company.Services.IProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RequestMapping("/api/company")
@RestController
public class CompanyController {

    @GetMapping
    public ResponseEntity<String> findAll() {
        return new ResponseEntity<>("All companies", HttpStatus.OK);
    }
    /*
    private IProjectService iProjectService;

    private CompanyRepository companyRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Company>> getAllCompany() {
        List<Company> companies = companyRepository.findAll();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }
    // Get documents by id
    @GetMapping("/{idComp}")
    public ResponseEntity<Company> getCompanyById(@PathVariable int idComp, Model model) {
        Optional<Company> company = companyRepository.findById(idComp);
        if (company.isPresent()) {
            //model.addAttribute("title", company.get().getAttachmentFileName());
            //model.addAttribute("image", Base64.getEncoder().encodeToString(company.get().getAttachmentData().getData()));
            return new ResponseEntity<>(company.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/add")
    public ResponseEntity<Company> createCompany(@RequestParam("file") MultipartFile file, @RequestParam("company") String companyJson) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Company company = objectMapper.readValue(companyJson, Company.class);

            Company createdCompany = iProjectService.createcompany(company);
            return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/testImage")
    public ResponseEntity<Company> createCompanysss( @RequestParam("file") MultipartFile file) {
        try {

            Company company = new Company();
            Company createdCompany = iProjectService.createcompany(company);
            return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PutMapping("/{idComp}")
    public ResponseEntity<Company> updateCompany(  @PathVariable int idComp, @RequestBody Company company) {
        Company oldCompany = companyRepository.findById(idComp).get();
        company.setId(oldCompany.getId());
        Company updatedCompany = iProjectService.updatecompany(company);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);


    }
    // Delete documents

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
    */
}