package io.agileintelligence.ppmt.web;

import io.agileintelligence.ppmt.domain.Project;
import io.agileintelligence.ppmt.domain.User;
import io.agileintelligence.ppmt.services.MapValidationErrorService;
import io.agileintelligence.ppmt.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/project")
@CrossOrigin
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> creatNewProject(@Valid @RequestBody Project project, BindingResult result, Principal principal){

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null){
            return errorMap;
        }

        String userName = ((User)(((UsernamePasswordAuthenticationToken) principal).getPrincipal())).getUserName();
        Project project1=projectService.saveOrUpdate(project,userName);
        return new ResponseEntity<Project>(project1, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getProjectById(@PathVariable String projectId , Principal principal){
        String userName = ((User)(((UsernamePasswordAuthenticationToken) principal).getPrincipal())).getUserName();
        Project project = projectService.findByProjectIdentifier(projectId,userName);
        return new ResponseEntity<Project>(project,HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects(Principal principal)
    {
        String userName = ((User)(((UsernamePasswordAuthenticationToken) principal).getPrincipal())).getUserName();
        return projectService.findAllProjects(userName);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId,Principal principal){
        String userName = ((User)(((UsernamePasswordAuthenticationToken) principal).getPrincipal())).getUserName();
        projectService.deleteProjectByIdentifier(projectId,userName);
        return new ResponseEntity<String>("Project with ID : "+projectId+" was deleted",HttpStatus.OK);
    }
}
