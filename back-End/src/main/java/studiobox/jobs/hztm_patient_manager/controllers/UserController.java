package studiobox.jobs.hztm_patient_manager.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import studiobox.jobs.hztm_patient_manager.model.UserData;
import studiobox.jobs.hztm_patient_manager.service.UserService;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

        @GetMapping("/user/find/{userName}/{password}")
        public ResponseEntity<UserData> checkAndGetUser(@PathVariable("userName") String userName, @PathVariable("password") String password){
            UserData checkUser = userService.checkUserCredentials(userName, password);
            if(checkUser!=null){
                return new ResponseEntity<>(checkUser, HttpStatus.OK);
        }
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/user/add")
    public ResponseEntity<UserData> addUser(@RequestBody UserData user){
        UserData newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
