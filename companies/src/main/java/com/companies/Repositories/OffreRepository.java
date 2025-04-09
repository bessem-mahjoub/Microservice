package com.companies.Repositories;

import com.companies.Entities.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OffreRepository extends MongoRepository<Offer, Integer> {}
