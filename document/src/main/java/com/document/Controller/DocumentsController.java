package com.document.Controller;

import com.document.Services.IProjectService;
import com.document.Services.PlagiarismDetectionService;
import com.document.entities.Documents;
import com.document.entities.Type;
import jakarta.validation.constraints.NotNull;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/documents")
public class DocumentsController {

    @Autowired
    private IProjectService iProjectService;

    @Autowired
    private PlagiarismDetectionService plagiarismDetectionService;

    @GetMapping
    public ResponseEntity<List<Documents>> getAllDocuments() {
        List<Documents> documents = iProjectService.getAlldocuments();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Documents> getDocumentsById(@PathVariable int id) {
        Optional<Documents> document = iProjectService.getdocumentsById(id);
        return document.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> createDocuments(@RequestParam("file") MultipartFile file,
                                                               @RequestParam("type") @NotNull String type) {
        try {
            byte[] fileContent = file.getBytes();
            Binary binaryContent = new Binary(fileContent);

            Documents document = new Documents();
            document.setType(Type.valueOf(type));
            document.setContent(binaryContent);
            iProjectService.createdocuments(document, fileContent);

            Map<String, String> response = Map.of("message", "Document added successfully");
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Documents> updateDocuments(@PathVariable int id, @RequestBody Documents documents) {
        documents.setIdDoc(id);
        Documents updatedDocuments = iProjectService.updatedocuments(documents);
        return updatedDocuments != null ?
                new ResponseEntity<>(updatedDocuments, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocuments(@PathVariable int id) {
        iProjectService.deletedocuments(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/check-plagiarism")
    public ResponseEntity<?> checkPlagiarism(@RequestParam("documentIds") List<Integer> documentIds) {
        try {
            for (int documentId : documentIds) {
                plagiarismDetectionService.detectAndStorePlagiarism(documentId);
            }
            return ResponseEntity.ok("Plagiarism detection completed.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the files.");
        }
    }


    @GetMapping("/content/{id}")
    public ResponseEntity<byte[]> getDocumentContentById(@PathVariable int id) {
        Optional<Documents> optionalDocument = iProjectService.getdocumentsById(id);
        if (optionalDocument.isPresent()) {
            Documents document = optionalDocument.get();

            if (document.getContent() != null) {

                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(document.getContent().getData());
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}
