package io.agileintelligence.ppmt.services;

import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdate(Project project){
        //Logic

        return projectRepository.save(project);
    }

}
