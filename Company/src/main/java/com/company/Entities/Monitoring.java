package com.company.Entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "Monitoring")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Monitoring {

    @Id
    private int id;
    @DBRef
    private Task task;
    private boolean reviewedBySupervisor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public boolean isReviewedBySupervisor() {
        return reviewedBySupervisor;
    }

    public void setReviewedBySupervisor(boolean reviewedBySupervisor) {
        this.reviewedBySupervisor = reviewedBySupervisor;
    }private List<MonitoringNote> notes;
}

