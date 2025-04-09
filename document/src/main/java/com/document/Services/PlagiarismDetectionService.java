package com.document.Services;

import com.document.Repositories.DocumentsRepository;
import com.document.entities.Documents;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlagiarismDetectionService {

    @Autowired
    private DocumentsRepository documentsRepository;

    public void detectAndStorePlagiarism(int documentId) {
        Optional<Documents> optionalDocument = documentsRepository.findById(documentId);
        if (optionalDocument.isPresent()) {
            Documents document = optionalDocument.get();
            byte[] fileContent = document.getContent().getData();
            List<Documents> allDocuments = documentsRepository.findAll();
            List<byte[]> allDocumentContents = new ArrayList<>();
            for (Documents doc : allDocuments) {
                if (doc.getIdDoc() != documentId) {
                    allDocumentContents.add(doc.getContent().getData());
                }
            }
            List<String> plagiarizedLines = detectPlagiarism(fileContent, allDocumentContents);
            document.setPlagiarizedLines(plagiarizedLines);
            document.setPlagiarized(!plagiarizedLines.isEmpty());
            documentsRepository.save(document);
        }
    }

    private List<String> detectPlagiarism(byte[] newDocumentContent, List<byte[]> allDocumentContents) {

        String newDocumentString = new String(newDocumentContent, StandardCharsets.UTF_8);

        List<String> plagiarizedLines = new ArrayList<>();
        for (byte[] content : allDocumentContents) {

            String existingDocumentString = new String(content, StandardCharsets.UTF_8);
            if (existingDocumentString.contains(newDocumentString)) {
                plagiarizedLines.add(existingDocumentString);
            }
        }
        return plagiarizedLines;
    }}

