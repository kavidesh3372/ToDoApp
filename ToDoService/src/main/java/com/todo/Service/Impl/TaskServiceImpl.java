package com.todo.Service.Impl;

import com.todo.database.entity.Task;
import com.todo.database.repo.TaskRepo;
import com.todo.models.TaskValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;



@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepo taskRepo;


    public TaskValue addTask(TaskValue taskValue) {
        return toValue(taskRepo.save(toEntity(taskValue)));
    }

    @Override
    public List<TaskValue> getAllTask() {
        List<Task> taskList = taskRepo.findAll();
        return taskList.stream().map(this::toValue).collect(Collectors.toList());
    }

    @Override
    public TaskValue getById(int id) {

        return taskRepo.findById(id).orElse(null);
    }
    @Override
    public TaskValue updateTask(TaskValue taskValue, int id){
        Task taskToUpdate = taskRepo.findById(id).orElse(null);
        if (taskToUpdate!=null) {
            taskToUpdate.setTaskName(taskValue.getTaskName());
            taskToUpdate.setDescription(taskValue.getDescription());
            taskToUpdate.setStartTime(taskValue.getStartTime());
            taskToUpdate.setEndTime(taskValue.getEndTime());
            return taskRepo.save(taskToUpdate);
        }
        return null;
    }
    @Override
    public boolean deleteTask(int id) {
        Optional<Task> taskToDelete = taskRepo.findById(id);
        taskToDelete.ifPresent(task -> taskRepo.delete(task));
        return taskToDelete.isPresent();
    }

    Task toEntity(TaskValue taskValue) {
        Task task = new Task();
        task.setTaskName(taskValue.getTaskName());
        task.setDescription(taskValue.getDescription());
        task.setStartTime(taskValue.getStartTime());
        task.setEndTime(taskValue.getEndTime());
        return task;
    }
     TaskValue toValue(Task task) {
        TaskValue taskValue = new TaskValue();
        taskValue.setId(task.getId());
        taskValue.setTaskName(task.getTaskName());
        taskValue.setDescription(task.getDescription());
        taskValue.setStartTime(task.getStartTime());
        taskValue.setEndTime(task.getEndTime());
        return taskValue;
    }
}