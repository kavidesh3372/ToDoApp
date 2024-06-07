package com.todo.Service.Impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import com.todo.database.entity.Task;
import com.todo.database.repo.TaskRepo;
import com.todo.models.TaskValue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class TaskServiceImplTest {

    @Mock
    private TaskRepo taskRepo;

    @InjectMocks
    private TaskServiceImpl taskService;

    @Test
    public void test_addTask() {
        TaskValue taskValue = new TaskValue("hello", "desc", LocalDateTime.now(), LocalDateTime.now());
        when(taskRepo.save(any())).thenReturn(taskService.toEntity(taskValue));
        TaskValue expectedValue = taskService.addTask(taskValue);
        assertEquals(taskValue, expectedValue);
    }
    @Test
    public void test_getAllTask() {
        Task task = new Task(1L,"hello", "desc", LocalDateTime.now(), LocalDateTime.now());
        Task task1 = new Task(10L,"new", "venue", LocalDateTime.now(), LocalDateTime.now());
        List<Task> taskList = Arrays.asList(task,task1);
        when(taskRepo.findAll()).thenReturn(taskList);
        List<TaskValue> newList = taskService.getAllTask();
        assertEquals(taskList.size(),newList.size());
        TaskValue expectedValue = taskService.toValue(taskList.get(0));
        TaskValue actualValue = newList.get(0);
        assertEquals(expectedValue.getTaskName(), actualValue.getTaskName());
        assertEquals(expectedValue.getDescription(), actualValue.getDescription());
    }
    @Test
    public void test_getById() {
        Task task = new Task(1L, "hello", "new", LocalDateTime.now(), LocalDateTime.now());
        when(taskRepo.findById(anyInt())).thenReturn(Optional.of(task));
        TaskValue expectedValue = taskService.getById(1);
        assertNotNull(expectedValue);
        assertEquals(task.getTaskName(), expectedValue.getTaskName());
        assertEquals(task.getDescription(),expectedValue.getDescription());
    }
    @Test
    public void test_updateTask() {

        Task task = new Task(1L, "hello", "new", LocalDateTime.now(), LocalDateTime.now());

        when(taskRepo.save(any(Task.class))).thenReturn(task);
        TaskValue updatedTaskValue = new TaskValue("hii", "venue", LocalDateTime.now(), LocalDateTime.now());
        when(taskRepo.findById(anyInt())).thenReturn(Optional.of(task));
        TaskValue returnedTaskValue = taskService.updateTask(updatedTaskValue, Math.toIntExact(task.getId()));
        assertEquals(task.getTaskName(), returnedTaskValue.getTaskName());
        assertEquals(task.getDescription(), returnedTaskValue.getDescription());

    }
}
