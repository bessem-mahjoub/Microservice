package com.defence.Services;

import com.defence.Entity.Defence;
import com.defence.repository.DefenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DefenceServiceImpl implements DefenceService {

    @Autowired
    private DefenceRepository defenceRepository;

    @Override
    public List<Defence> getAllDefences() {
        return defenceRepository.findAll();
    }

    @Override
    public Defence getDefenceById(int id) {
        Optional<Defence> optionalDefence = defenceRepository.findById(id);
        return optionalDefence.orElse(null);
    }


    @Override
    public List<Date> getUsedDates() {
        return defenceRepository.findDistinctDefenceDates();
    }


    @Override
    public Defence createDefence(Defence defence) {
        return defenceRepository.save(defence);
    }

    @Override
    public Defence updateDefence(int id, Defence defence) {
        Optional<Defence> optionalDefence = defenceRepository.findById(id);
        if (optionalDefence.isPresent()) {
            Defence existingDefence = optionalDefence.get();
            // Update fields here...
            return defenceRepository.save(existingDefence);
        }
        throw new ResourceNotFoundException("Defense not found with ID: " + id);  // Custom exception
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ResourceNotFoundException extends RuntimeException {
        public ResourceNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public void deleteDefence(int id) {
        defenceRepository.deleteById(id);
    }
}