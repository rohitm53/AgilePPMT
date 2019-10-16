package io.agileintelligence.ppmt.services;

import io.agileintelligence.ppmt.domain.Backlog;
import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.exceptions.projectidexception.ProjectIdException;
import io.agileintelligence.ppmt.repositories.BacklogRepository;
import io.agileintelligence.ppmt.repositories.ProjectRepository;
import io.agileintelligence.ppmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private UserRepository userRepository;

    public Project saveOrUpdate(Project project,String userName){

        try {
            User user = userRepository.findByUserName(userName);
            project.setUser(user);
            project.setProjectLeader(user.getUserName());
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            if(project.getId()==null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }else{
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }


            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' already existed");
        }
    }

    public Project findByProjectIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null){
            throw new ProjectIdException("Poject ID '"+projectId+"' does not exist");
        }
        return project;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null){
            throw new ProjectIdException("Cannot delete Project with ID '"+projectId+"'. This project does not exist");
        }
        projectRepository.delete(project);
    }


}
