package com.document.Services;

import org.apache.commons.math3.ml.clustering.Clusterable;

public class DoubleArrayClusterable implements Clusterable {
    private final double[] point;

    public DoubleArrayClusterable(double[] point) {
        this.point = point;
    }

    @Override
    public double[] getPoint() {
        return point;
    }
}
