package com.todo.rest.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.Service.Impl.TaskService;
import com.todo.models.TaskValue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(SpringExtension.class)
@WebMvcTest(value = TaskController.class)
public class TaskControllerTest {

    private String newTask = "{\"taskName\":\"SpringTest\",\"description\":\"desc\",\"endTime\":\"2024-11-20T10:11:00\",\"startTime\":\"2024-11-20T10:11:00\"}";
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    TaskService taskService;

    @MockBean
    TaskValidation taskValidation;


    @Test
    public void test_addTask_whenValidInput_ThenReturnActualObject() throws Exception {

        //Arrange
        TaskValue taskValue = new TaskValue("sampletask", "desc",LocalDateTime.of(2021,8,22,10,55,30),LocalDateTime.of(2021,8,22,10,55,30,0));
        when(taskService.addTask(any())).thenReturn(taskValue);

        //Act
        RequestBuilder requestBuilder = MockMvcRequestBuilders.post(
                "/api/v1/task").accept(
                MediaType.APPLICATION_JSON).content(newTask)
                .contentType(MediaType.APPLICATION_JSON);;

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();
        String actualResponseObject = response.getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(actualResponseObject, new TypeReference<Map<String, Object>>() {});


        //Assert
        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertEquals(taskValue.getTaskName(), map.get("taskName"));
        assertEquals(taskValue.getDescription(), map.get("description"));

        LocalDateTime actualStartTime = LocalDateTime.parse((CharSequence) map.get("startTime"));

        assertEquals(taskValue.getStartTime(), actualStartTime);
    }
    @Test
    public void test_getAllTask() throws  Exception {
        TaskValue taskValue = new TaskValue("new", "desc", LocalDateTime.of(2021,8,21,10,55,30),LocalDateTime.of(2021,8,22,10,55,30,0));
        TaskValue taskValue1 = new TaskValue("hii", "venue", LocalDateTime.of(2021,8,21,10,55,30),LocalDateTime.of(2021,8,22,10,55,30,0));
        List<TaskValue> taskValueList = Arrays.asList(taskValue, taskValue1);

        when(taskService.getAllTask()).thenReturn(taskValueList);
        RequestBuilder requestBuilder=MockMvcRequestBuilders.get("/api/v1/task").accept(MediaType.APPLICATION_JSON);
        MvcResult result=mockMvc.perform(requestBuilder).andReturn();

        MockHttpServletResponse response = result.getResponse();
        String actualResponseObject = response.getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        List<Map<String, Object>> maps = mapper.readValue(actualResponseObject, new TypeReference<List<Map<String, Object>>>() {});
        
        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertEquals(1, maps.size());
        assertEquals(taskValue.getTaskName(), maps.get(0).get("taskName"));
        assertEquals(taskValue.getDescription(), maps.get(0).get("description"));
    }
    @Test
    public void test_getById() throws Exception{
        TaskValue taskValue = new TaskValue(4L,"new", "desc", LocalDateTime.of(2021,8,21,10,55,30,0),LocalDateTime.of(2021,8,22,10,55,30,0));
        when(taskService.getById(anyInt())).thenReturn(taskValue);
        RequestBuilder requestBuilder=MockMvcRequestBuilders.get("/api/v1/task/{id}",taskValue.getId()).accept(MediaType.APPLICATION_JSON);
        MvcResult result =mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String actualResponseObject = response.getContentAsString();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> maps = mapper.readValue(actualResponseObject, new TypeReference<Map<String, Object>>() {});

        //Assert
        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertEquals(taskValue.getTaskName(), maps.get("taskName"));
        assertEquals(taskValue.getDescription(), maps.get("description"));
    }
    @Test
    public void test_updateTask() throws Exception{
        TaskValue taskValue = new TaskValue(4L,"new", "desc", LocalDateTime.of(2021,8,21,10,55,30,0), LocalDateTime.of(2021,8,22,10,55,30,0));
        when(taskService.updateTask(any(),anyInt())).thenReturn(taskValue);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.put("/api/v1/task/{id}", taskValue.getId()).accept(MediaType.APPLICATION_JSON).content(newTask).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = mapper.readValue(response.getContentAsString(), new TypeReference<Map<String, Object>>() {});
        assertEquals(HttpStatus.OK.value(), response.getStatus());
        assertEquals("new", map.get("taskName"));
        assertEquals("desc", map.get("description"));
    }
    @Test
    public void test_deleteTask() throws Exception{
        TaskValue taskValue = new TaskValue(4L,"new", "desc", LocalDateTime.of(2021,8,21,10,55,30,0), LocalDateTime.of(2021,8,22,10,55,30,0));
        when(taskService.deleteTask(anyInt())).thenReturn(true);
        RequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/api/v1/task/{id}",taskValue.getId()).accept(MediaType.APPLICATION_JSON).contentType(MediaType.APPLICATION_JSON);
        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}
