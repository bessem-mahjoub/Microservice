package com.document.Controller;

import com.document.Services.DoubleArrayClusterable;
import com.document.Services.TextAnalysisService;
import org.apache.commons.math3.ml.clustering.Cluster;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/text-analysis")
public class TextAnalysisController {
    private final TextAnalysisService textAnalysisService;

    @Autowired
    public TextAnalysisController(TextAnalysisService textAnalysisService) {
        this.textAnalysisService = textAnalysisService;
    }
    @PostMapping("/upload-file")
    public ResponseEntity<List<String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            List<String> paragraphs = textAnalysisService.extractParagraphsFromDocx(file);
            return new ResponseEntity<>(paragraphs, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/extract-paragraphs")
    public ResponseEntity<List<String>> extractParagraphs(@RequestParam("file") MultipartFile file) {
        try {
            List<String> paragraphs = textAnalysisService.extractParagraphsFromDocx(file);
            return new ResponseEntity<>(paragraphs, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/tokenize")
    public ResponseEntity<List<String>> tokenize(@RequestBody List<String> paragraphs) {
        List<String> tokens = textAnalysisService.tokenizeParagraphs(paragraphs);
        return new ResponseEntity<>(tokens, HttpStatus.OK);
    }

    @PostMapping("/elbow-plot")
    public ResponseEntity<byte[]> generateElbowPlot(@RequestBody List<String> tokens) {
        try {
            byte[] plot = textAnalysisService.generateElbowPlot(tokens);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(plot, headers, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/kmeans-clustering/{numClusters}")
    public ResponseEntity<List<List<String>>> performKMeansClustering(@RequestBody List<String> tokens,
                                                                      @PathVariable int numClusters) {
        List<Cluster<DoubleArrayClusterable>> clusters = textAnalysisService.applyKMeans(tokens, numClusters);
        // Maintenant, vous pouvez appeler convertClustersToStringLists car sa visibilité est publique
        List<List<String>> clusterLists = textAnalysisService.convertClustersToStringLists(clusters, tokens);
        return new ResponseEntity<>(clusterLists, HttpStatus.OK);
    }

}