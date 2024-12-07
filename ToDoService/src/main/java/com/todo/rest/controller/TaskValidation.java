package com.todo.rest.controller;

import com.todo.models.TaskValue;
import lombok.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.time.LocalDateTime;


@Component
public class TaskValidation implements Validator {
    @Override
    public boolean supports(@NonNull Class<?> clazz) {

        return TaskValue.class.equals(clazz);
    }

    @Override
    public void validate(@NonNull Object target, @NonNull Errors errors) {
        TaskValue  taskValue =(TaskValue) target;
        if (taskValue.getTaskName() == null) {
            errors.rejectValue("taskName", "taskValue.taskName", "TaskName should be Notnull");
        }
        LocalDateTime now=LocalDateTime.now();
        if(taskValue.getStartTime().isBefore(now)){
            errors.rejectValue("startTime","taskValue.startTime","StartTime should be future");
        }
        if (taskValue.getEndTime().isBefore(taskValue.getStartTime())) {
            errors.rejectValue("endTime", "taskValue.endTime", "EndTime should be after the StartTime");
        }
        if (taskValue.getStartTime() == null || taskValue.getEndTime() == null) {
            throw new IllegalArgumentException("Start time and end time must not be null");
        }
    }
}
