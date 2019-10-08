package io.agileintelligence.ppmt.repositories;

import io.agileintelligence.ppmt.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProjectTaskRepository extends CrudRepository<ProjectTask,Long> {

    List<ProjectTask> findByProjectIdentifierOrderByPriority(String backlog_id);

    ProjectTask findByProjectSequence(String projectSequence);
}
