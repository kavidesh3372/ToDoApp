package com.todo.rest.controller;

import com.todo.Service.Impl.TaskService;
import com.todo.database.entity.Task;
import com.todo.models.TaskValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    @Autowired
    public TaskService taskService;
    @GetMapping
    public String hello()
    {
        return "Hello!";
    }

    @PostMapping
    public TaskValue addTask(@RequestBody TaskValue task){
        return taskService.addTask(task);
    }
}
