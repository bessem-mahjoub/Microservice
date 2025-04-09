package com.company.Repositories;


import com.company.Entities.Monitoring;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonitoringRepository extends MongoRepository<Monitoring, Integer> {
}