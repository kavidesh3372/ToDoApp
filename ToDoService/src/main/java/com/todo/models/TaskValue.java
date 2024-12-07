package com.todo.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import java.io.Serializable;
import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class TaskValue implements Serializable {

    private Long id;
    private String taskName;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endTime;

    public TaskValue(String taskName, String description, LocalDateTime startTime, LocalDateTime endTime) {
        this.taskName = taskName;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
