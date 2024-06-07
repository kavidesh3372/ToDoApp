package com.todo.Service.Impl;

import com.todo.models.TaskValue;

import java.util.List;

public interface TaskService {
    TaskValue addTask(TaskValue task);

    List<TaskValue> getAllTask();

    TaskValue getById(int id);

    TaskValue updateTask(TaskValue taskValue, int id);

    boolean deleteTask(int id);
}
