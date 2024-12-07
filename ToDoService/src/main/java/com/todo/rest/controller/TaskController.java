package com.todo.rest.controller;
import com.todo.Service.Impl.TaskService;
import com.todo.models.TaskValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/task")
public class TaskController {

    @Autowired
    public TaskService taskService;
    @Autowired
    public TaskValidation taskValidation;
    @GetMapping
    public List<TaskValue> getAllTask() {

        return taskService.getAllTask();
    }
    @PostMapping
    public ResponseEntity<?> addTask(@Validated @RequestBody TaskValue task, BindingResult result) {
        taskValidation.validate(task, result);
        if (result.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            for (ObjectError error : result.getAllErrors()) {
                errorMessage.append(error.getDefaultMessage()).append("\n");
            }
            return new ResponseEntity<>(errorMessage.toString(), HttpStatus.BAD_REQUEST);
        }
        TaskValue createdTask = taskService.addTask(task);
        return ResponseEntity.ok(createdTask);
    }


    @GetMapping("/{id}")
    public ResponseEntity<TaskValue> getTaskById(@PathVariable int id){
        TaskValue taskValue= taskService.getById(id);
        if (taskValue != null) {
            return new ResponseEntity<>(taskValue,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updatedTask(@Validated @RequestBody TaskValue pTaskValue,@PathVariable int id,BindingResult result) {
        taskValidation.validate(pTaskValue, result);
        try {
               TaskValue taskvalue=taskService.updateTask(pTaskValue, id);
               if(taskvalue==null){
                   return new ResponseEntity<>(HttpStatus.NOT_FOUND);
               }
               return new ResponseEntity<>(taskvalue,HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deletedTask(@PathVariable int id) {
        try {
            return new ResponseEntity<>(taskService.deleteTask(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
