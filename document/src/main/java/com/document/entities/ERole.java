package com.document.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;


public enum ERole {
    ADMIN,
    STUDENT,
    SUPERVISOR,
    TUTOR
}
