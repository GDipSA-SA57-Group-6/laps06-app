17th Dec 2pm: To add @CrossOrigin at controller. I completed AdminDelete(success on my own data only), Admin Get, Admin List



EmployeeController: 
(for CreateEmployee, EditEmployee, ListEmployee inc. Delete Employee)


package sg.nus.iss.laps.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.nus.iss.laps.model.Employee;
import sg.nus.iss.laps.service.EmployeeService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class EmployeeController {

	  @Autowired
	  private EmployeeService employeeService;
	  
	  @GetMapping("/employees")
	  public List<Employee> getAllEmployees() {
	    return employeeService.findAllEmployees();
	  }
	  
	  @GetMapping("/employees/{id}")
	  public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") int id) {
	    Optional<Employee> optEmployee = employeeService.findEmployee(id);
	    
	    if (optEmployee.isPresent()) {
	      Employee employee = optEmployee.get();
	      return new ResponseEntity<Employee>(employee, HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	  
	  @PostMapping("/employees")
	  public ResponseEntity<Employee> createEmployee(@RequestBody Employee inEmployee) {
	    try {
	      Employee retEmployee = employeeService.createEmployee(inEmployee);      
	      
	      return new ResponseEntity<Employee>(retEmployee, HttpStatus.CREATED);
	    } catch (Exception e) {
	      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
	    }
	  }
	  
	  
	  @PutMapping("/employees/{id}")
	  public ResponseEntity<Employee> editEmployee(@PathVariable("id") int id, @RequestBody Employee inEmployee) {
	    Optional<Employee> optEmployee = employeeService.findEmployee(id);
	    
	    if (optEmployee.isPresent()) {
	      
	      Employee employee = optEmployee.get();
	      
	      employee.setEmployeeId(inEmployee.getEmployeeId());
	      employee.setName(inEmployee.getName());
	      employee.setManagerId(inEmployee.getManagerId());
	      
	      Employee updatedEmployee = employeeService.updateEmployee(employee);
	      
	      return new ResponseEntity<Employee>(updatedEmployee, HttpStatus.OK);
	    } else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	  }
	  
