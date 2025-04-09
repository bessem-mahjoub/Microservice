package com.defence.repository;

import com.defence.Entity.Defence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DefenceRepository extends JpaRepository<Defence, Integer> {
    @Query("SELECT DISTINCT d.dateDefense FROM Defence d WHERE d.dateDefense IS NOT NULL ORDER BY d.dateDefense")
    List<Date> findDistinctDefenceDates();
}