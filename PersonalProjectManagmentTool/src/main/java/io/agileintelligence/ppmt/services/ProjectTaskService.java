package io.agileintelligence.ppmt.services;

import io.agileintelligence.ppmt.domain.Backlog;
import io.agileintelligence.ppmt.domain.ProjectTask;
import io.agileintelligence.ppmt.exceptions.projectnotfoundexception.ProjectNotFoundException;
import io.agileintelligence.ppmt.repositories.BacklogRepository;
import io.agileintelligence.ppmt.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier , ProjectTask projectTask,String userName){

            //1. Locate Backlog first
//            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            Backlog backlog  = projectService.findByProjectIdentifier(projectIdentifier,userName).getBacklog();

            //2. Set Backlog to  Task
            projectTask.setBacklog(backlog);

            //3.Need to generate Project Task Sequence
            Integer backlogSequence = backlog.getPTSequence();

            //4.Update Sequence
            backlogSequence++;   //increament
            backlog.setPTSequence(backlogSequence);

            //5. Add Sequnce to Project Task => ProjectIdentifier - backlogsequence
            projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);

            //6. Adding Project Identifier to Project task
            projectTask.setProjectIdentifier(projectIdentifier);

            //7. INITIALISE priority of Project task, when priority is null
            /*
             * Priority 3 : Lower
             * Priority 2 : Medium
             * Priority 1 : High
             * */
            if(projectTask.getPriority()==null || projectTask.getPriority()==0){
                projectTask.setPriority(3);//Setting low priority
            }
            //8. INITIAL Status when status is null
            if(projectTask.getStatus()==null || projectTask.getStatus()==""){
                projectTask.setStatus("TO_DO");
            }
            return projectTaskRepository.save(projectTask);
    }

    public Iterable<ProjectTask> findBacklogbyId(String backlog_id,String userName){
        projectService.findByProjectIdentifier(backlog_id,userName);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }

    public ProjectTask fingProjectTaskByProjectSequence(String backlog_id,String pt_id,String userName){

        // Make sure project with user existed
        projectService.findByProjectIdentifier(backlog_id,userName);

        //Make sure Project task is existed

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask==null){
            throw new ProjectNotFoundException("Project Task:'"+pt_id+"' not found");
        }

        //Make sure backlog_id and  pt_id are in the path corresponding to the right project
        if(!projectTask.getProjectIdentifier().equalsIgnoreCase(backlog_id)){
            throw new ProjectNotFoundException("Project Task '"+pt_id+"' does not exist in Project:'"+backlog_id+"'");
        }

        return projectTask;
    }

    public ProjectTask updateByProjectSequnce(ProjectTask updateProjectTask,String backlog_id,String pt_id,String userName){

        ProjectTask projectTask = fingProjectTaskByProjectSequence(backlog_id,pt_id,userName);
        projectTask=updateProjectTask;
        return projectTaskRepository.save(projectTask);
    }

    public void deleteProjectTaskbyProjectSequence(String backlog_id,String pt_id,String userName){
        ProjectTask projectTask= fingProjectTaskByProjectSequence(backlog_id,pt_id,userName);
        projectTaskRepository.delete(projectTask);
    }
}
