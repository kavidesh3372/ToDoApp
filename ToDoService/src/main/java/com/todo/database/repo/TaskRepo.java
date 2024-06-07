package com.todo.database.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.todo.database.entity.Task;

public interface TaskRepo extends JpaRepository<Task,Integer>{

}
