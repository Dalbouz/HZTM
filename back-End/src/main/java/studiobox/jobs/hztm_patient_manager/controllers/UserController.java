package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.PatientData;
import studiobox.jobs.hztm_patient_manager.model.UserData;
import studiobox.jobs.hztm_patient_manager.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

        @GetMapping("/find/{userName}/{password}")
        public ResponseEntity<UserData> checkAndGetUser(@PathVariable("userName") String userName, @PathVariable("password") String password){
            UserData checkUser = userService.checkUserCredentials(userName, password);
            if(checkUser!=null){
                return new ResponseEntity<>(checkUser, HttpStatus.OK);
        }
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<UserData> getUserById(@PathVariable Long id){
        UserData checkUser = userService.findUserById(id);
        if(checkUser!=null){
            return new ResponseEntity<>(checkUser, HttpStatus.OK);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/add")
    public ResponseEntity<UserData> addUser(@RequestBody UserData user){
        UserData newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id){
        try {
            userService.deleteUserById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<UserData>> getAllUsers(){
        List<UserData> userDataList = userService.findAllUsers();
        return new ResponseEntity<>(userDataList, HttpStatus.OK);
    }
}
