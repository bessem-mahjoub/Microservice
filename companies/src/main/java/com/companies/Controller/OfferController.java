package com.companies.Controller;

import com.companies.Entities.Company;
import com.companies.Entities.Offer;
import com.companies.Services.IProjectService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private IProjectService iProjectService;

    // Récupérer toutes les offres
    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        List<Offer> offers = iProjectService.getAllOffer();
        return new ResponseEntity<>(offers, HttpStatus.OK);
    }

    // Récupérer une offre par son identifiant
    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable int id) {
        Optional<Offer> offer = iProjectService.getofferById(id);
        return offer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/company/{id}")
    public ResponseEntity<List<Offer>> getOfferByCompany(@PathVariable int id) {
        Company company = iProjectService.getCompanyById(id).orElseGet(null);
        if(company == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(company.getOffers(), HttpStatus.OK);
    }

    // Créer une nouvelle offre
    @PostMapping("/post/{company_id}")
    public ResponseEntity<Offer> createOffer(@PathVariable int company_id, @RequestBody Offer offer) {
        offer.setCompany(Company.builder().id(company_id).build());
        Offer newOffer = iProjectService.createoffer(offer);
        return new ResponseEntity<>(newOffer, HttpStatus.CREATED);
    }

    // Mettre à jour une offre existante
    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable int id, @RequestBody Offer offer) {
        Offer offer_from_db=iProjectService.getofferById(id).orElseGet(null);
        if(offer_from_db == null) return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        offer_from_db.setTypeInternship(offer.getTypeInternship());
        Offer updatedOffer = iProjectService.updateoffer(offer_from_db);
        return new ResponseEntity<>(updatedOffer, HttpStatus.OK);
    }

    // Supprimer une offre
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable int id) {
        iProjectService.deleteoffer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}