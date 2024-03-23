package com.todo.Service.Impl;

import com.todo.database.entity.Task;
import com.todo.database.repo.TaskRepo;
import com.todo.models.TaskValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskrepo;

    public TaskValue addTask(TaskValue taskValue) {
        //Validation

        return toValue(taskrepo.save(toEntity(taskValue)));
    }

    private Task toEntity(TaskValue taskValue) {
        Task task = new Task();
        task.setTaskName(taskValue.getTaskName());
        task.setDescription(taskValue.getDescription());
        task.setStartTime(taskValue.getStartTime());
        task.setEndTime(taskValue.getEndTime());
        return task;
    }
    private TaskValue toValue(Task task) {
        TaskValue taskValue = new TaskValue();
        taskValue.setTaskName(task.getTaskName());
        taskValue.setDescription(task.getDescription());
        taskValue.setStartTime(task.getStartTime());
        taskValue.setEndTime(task.getEndTime());
        return taskValue;
    }

}