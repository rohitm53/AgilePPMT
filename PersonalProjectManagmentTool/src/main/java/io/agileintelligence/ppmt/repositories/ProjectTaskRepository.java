package io.agileintelligence.ppmt.repositories;

import io.agileintelligence.ppmt.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;

public interface ProjectTaskRepository extends CrudRepository<ProjectTask,Long> {
}
