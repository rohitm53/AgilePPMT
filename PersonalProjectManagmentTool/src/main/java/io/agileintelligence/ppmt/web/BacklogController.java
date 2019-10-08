package io.agileintelligence.ppmt.web;

import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.domain.ProjectTask;
import io.agileintelligence.ppmt.exceptions.projectnotfoundexception.ProjectNotFoundException;
import io.agileintelligence.ppmt.repositories.ProjectRepository;
import io.agileintelligence.ppmt.services.MapValidationErrorService;
import io.agileintelligence.ppmt.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTasktoBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
                                                     @PathVariable String backlog_id){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){
            return errorMap;
        }

        ProjectTask projectTask1 = projectTaskService.addProjectTask(backlog_id,projectTask);

        return new ResponseEntity<ProjectTask>(projectTask1, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {

        Project project = projectRepository.findByProjectIdentifier(backlog_id);
        if(project==null){
            throw new ProjectNotFoundException("Project with ID: '"+backlog_id+"' does not exist");
        }
        return projectTaskService.findBacklogbyId(backlog_id);
    }

    @GetMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> getProjectTask(@PathVariable String  backlog_id , @PathVariable String pt_id ){

        ProjectTask projectTask = projectTaskService.fingProjectTaskByProjectSequence(backlog_id,pt_id);
        return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.OK);
    }

    @PatchMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask,BindingResult result,
                                               @PathVariable String backlog_id,
                                               @PathVariable String pt_id){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){
            return errorMap;
        }

        ProjectTask updatedProjectTask = projectTaskService.updateByProjectSequnce(projectTask,backlog_id,pt_id);

        return new ResponseEntity<ProjectTask>(updatedProjectTask,HttpStatus.OK);
    }

    @DeleteMapping("/{backlog_id}/{pt_id}")
    public ResponseEntity<?> deleteProjectask(@PathVariable String backlog_id , @PathVariable String pt_id ){
        projectTaskService.deleteProjectTaskbyProjectSequence(backlog_id,pt_id);
        return new ResponseEntity<String>("Project Task:'"+pt_id+"' deleted successfully",HttpStatus.OK);
    }
}
