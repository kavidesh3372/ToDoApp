package com.todo.database.entity;

import com.todo.models.TaskValue;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name="task")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task extends TaskValue implements Serializable {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name="task_name")
    private String taskName;
    @Column(name="description")
    private String description;
    @Column(name="start_time")
    private LocalDateTime startTime;
    @Column(name="end_time")
    private LocalDateTime endTime;



}
