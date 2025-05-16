package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.UserData;
import studiobox.jobs.hztm_patient_manager.repositorys.UserDataRepository;

@Service
public class UserService {
    private final UserDataRepository userDataRepository;

    @Autowired
    public UserService(UserDataRepository userDataRepository) {
        this.userDataRepository = userDataRepository;
    }

    public UserData addUser(UserData user){
        UserData checkUserData = findUserByUsername(user.getUserName());
        if(checkUserData == null){
            return userDataRepository.save(user);
        }
        return null;
    }

    private UserData findUserByUsername(String username){
        return userDataRepository.findByUserName(username).orElseThrow(()->new DataNotFound("User data not found"));
    }

    public UserData checkUserCredentials(String username, String password){
        UserData userData = findUserByUsername(username);

        if(userData == null){
            return null;
        }
        if(userData.getPassword().equals(password)){
            return userData;
        }
        return null;
    }
}
