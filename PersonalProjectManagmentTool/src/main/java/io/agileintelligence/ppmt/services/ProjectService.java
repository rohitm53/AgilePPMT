package io.agileintelligence.ppmt.services;

import io.agileintelligence.ppmt.domain.Backlog;
import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.exceptions.projectidexception.ProjectIdException;
import io.agileintelligence.ppmt.exceptions.projectnotfoundexception.ProjectNotFoundException;
import io.agileintelligence.ppmt.repositories.BacklogRepository;
import io.agileintelligence.ppmt.repositories.ProjectRepository;
import io.agileintelligence.ppmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
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

        if(project.getId()!=null){

            Project existedProject = projectRepository.findByProjectIdentifier(project.getProjectIdentifier());
            if(existedProject!=null && !(existedProject.getProjectLeader().equals(userName))){
                throw new ProjectNotFoundException("Project does not found in your account");
            }else if(existedProject==null){
                throw new ProjectNotFoundException("Project with ID : '"+project.getProjectIdentifier()+"' cannot be deleted as it doesn't exist");
            }
        }

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

    public Project findByProjectIdentifier(String projectId,String userName){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(project==null){
            throw new ProjectIdException("Poject ID '"+projectId+"' does not exist");
        }

        if(!(project.getProjectLeader().equals(userName))){
            throw new ProjectNotFoundException("Project not found in you account");
        }

        return project;
    }

    public Iterable<Project> findAllProjects(String userName){
        return projectRepository.findAllByProjectLeader(userName);
    }

    public void deleteProjectByIdentifier(String projectId,String userName){

        projectRepository.delete(findByProjectIdentifier(projectId,userName));
    }


}
