package com.document.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@Document(collection = "Documents")
public class Documents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDoc;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Type type;

    @Field("description")
    private String description;
    private Binary content;



    @Field("isPlagiarized")
    private boolean isPlagiarized;

    @ElementCollection
    private List<String> plagiarizedLines;


}
