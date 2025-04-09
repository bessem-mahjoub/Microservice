package com.document.Services;

import com.kennycason.kumo.WordFrequency;
import org.apache.commons.math3.ml.clustering.CentroidCluster;
import org.apache.commons.math3.ml.clustering.Cluster;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.xy.XYSeries;
import org.jfree.data.xy.XYSeriesCollection;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

@Service
public class TextAnalysisService {
  

    public List<String> extractParagraphsFromDocx(MultipartFile file) throws IOException {
        List<String> paragraphs = new ArrayList<>();
        XWPFDocument document = new XWPFDocument(file.getInputStream());
        List<XWPFParagraph> paragraphList = document.getParagraphs();
        for (XWPFParagraph paragraph : paragraphList) {
            String text = paragraph.getText().trim();
            if (!text.isEmpty()) {
                paragraphs.add(text);
            }
        }
        return paragraphs;
    }

    public List<String> tokenizeParagraphs(List<String> paragraphs) {
        List<String> tokens = new ArrayList<>();
        for (String paragraph : paragraphs) {
            String[] words = paragraph.split("\\s+"); // Split by whitespace
            tokens.addAll(Arrays.asList(words));
        }
        return tokens;
    }


    public byte[] generateElbowPlot(List<String> tokens) throws IOException {
        int maxClusters = 10;
        List<Double> inertias = new ArrayList<>();
        for (int k = 1; k <= maxClusters; k++) {
            double inertia = performKMeansClustering(tokens, k);
            inertias.add(inertia);
        }
        return plotElbowCurve(maxClusters, inertias);
    }

    private double performKMeansClustering(List<String> tokens, int numClusters) {
        // Préparation des données pour le clustering
        List<DoubleArrayClusterable> dataPoints = prepareDataPoints(tokens);
        // Création du clusterer avec le nombre de clusters spécifié
        KMeansPlusPlusClusterer<DoubleArrayClusterable> clusterer = new KMeansPlusPlusClusterer<>(numClusters);
        // Exécution du clustering
        List<CentroidCluster<DoubleArrayClusterable>> clusters = clusterer.cluster(dataPoints);
        // Calcul de l'inertie (somme des distances au carré entre les points et le centre de leur cluster)
        double inertia = 0.0;
        for (CentroidCluster<DoubleArrayClusterable> cluster : clusters) {
            double[] center = cluster.getCenter().getPoint();
            for (DoubleArrayClusterable point : cluster.getPoints()) {
                inertia += Math.pow(point.getPoint()[0] - center[0], 2);
            }
        }
        return inertia;
    }

    private List<DoubleArrayClusterable> prepareDataPoints(List<String> tokens) {
        List<DoubleArrayClusterable> dataPoints = new ArrayList<>();
        for (String token : tokens) {
            double[] point = new double[] { (double) token.length() }; // Using token length as a point
            DoubleArrayClusterable clusterable = new DoubleArrayClusterable(point);
            dataPoints.add(clusterable);
        }
        return dataPoints;
    }


    public List<Cluster<DoubleArrayClusterable>> applyKMeans(List<String> tokens, int numClusters) {
        List<DoubleArrayClusterable> dataPoints = prepareDataPoints(tokens);
        KMeansPlusPlusClusterer<DoubleArrayClusterable> clusterer = new KMeansPlusPlusClusterer<>(numClusters);
        List<CentroidCluster<DoubleArrayClusterable>> clusters = clusterer.cluster(dataPoints);
        // Cast explicitement chaque CentroidCluster en Cluster
        List<Cluster<DoubleArrayClusterable>> castedClusters = new ArrayList<>();
        for (CentroidCluster<DoubleArrayClusterable> centroidCluster : clusters) {
            castedClusters.add(centroidCluster);
        }
        return castedClusters;
    }

    private double calculateInertia(List<Cluster<DoubleArrayClusterable>> clusters) {
        double inertia = 0.0;
        for (Cluster<DoubleArrayClusterable> cluster : clusters) {
            double clusterCenter = calculateClusterCenter(cluster.getPoints());
            List<double[]> clusterPoints = convertToDoubleArrays(cluster.getPoints());
            for (double[] point : clusterPoints) {
                inertia += Math.pow(point[0] - clusterCenter, 2);
            }
        }
        return inertia;
    }

    private List<double[]> convertToDoubleArrays(Collection<DoubleArrayClusterable> clusterables) {
        List<double[]> doubleArrays = new ArrayList<>();
        for (DoubleArrayClusterable clusterable : clusterables) {
            doubleArrays.add(clusterable.getPoint());
        }
        return doubleArrays;
    }

    private double calculateClusterCenter(Collection<DoubleArrayClusterable> points) {
        double sum = 0.0;
        int count = 0;
        for (DoubleArrayClusterable point : points) {
            sum += point.getPoint()[0];
            count++;
        }
        return sum / count;
    }

    private byte[] plotElbowCurve(int maxClusters, List<Double> inertias) throws IOException {
        XYSeries series = new XYSeries("Inertia");
        for (int i = 0; i < inertias.size(); i++) {
            series.add(i + 1, inertias.get(i));
        }
        XYSeriesCollection dataset = new XYSeriesCollection(series);
        JFreeChart chart = ChartFactory.createXYLineChart(
                "Elbow Curve for KMeans Clustering",
                "Number of Clusters",
                "Inertia",
                dataset,
                PlotOrientation.VERTICAL,
                true,
                true,
                false
        );
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        ChartUtils.writeChartAsPNG(out, chart, 800, 400);
        return out.toByteArray();
    }

    private List<WordFrequency> calculateWordFrequencies(List<String> tokens) {
        Map<String, Integer> frequencyMap = new HashMap<>();
        for (String token : tokens) {
            frequencyMap.put(token, frequencyMap.getOrDefault(token, 0) + 1);
        }
        List<WordFrequency> wordFrequencies = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {
            wordFrequencies.add(new WordFrequency(entry.getKey(), entry.getValue()));
        }
        return wordFrequencies;
    }

    public List<List<String>> convertClustersToStringLists(List<Cluster<DoubleArrayClusterable>> clusters, List<String> tokens) {
        List<List<String>> result = new ArrayList<>();
        for (Cluster<DoubleArrayClusterable> cluster : clusters) {
            List<String> clusterTokens = new ArrayList<>();
            for (DoubleArrayClusterable point : cluster.getPoints()) {
                int index = tokens.indexOf(point); // Get index of point in original data
                if (index >= 0 && index < tokens.size()) {
                    clusterTokens.add(tokens.get(index));
                }
            }
            result.add(clusterTokens);
        }
        return result;
    }

}
