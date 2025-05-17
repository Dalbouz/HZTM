package studiobox.jobs.hztm_patient_manager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import studiobox.jobs.hztm_patient_manager.exception.DataNotFound;
import studiobox.jobs.hztm_patient_manager.model.UserData;
import studiobox.jobs.hztm_patient_manager.repositorys.UserDataRepository;

import java.util.List;

@Service
public class UserService {
    private final UserDataRepository userDataRepository;

    @Autowired
    public UserService(UserDataRepository userDataRepository) {
        this.userDataRepository = userDataRepository;
    }

    public UserData addUser(UserData user){
        try {
            // Check if user exists (may throw DataNotFound)
            UserData checkUserData = findUserByUsername(user.getUserName());
            // If user exists, return null or throw a conflict exception
            return null;
        } catch (DataNotFound ex) {
            // User doesn't exist; proceed to save
            return userDataRepository.save(user);
        }
    }

    private UserData findUserByUsername(String username){
        return userDataRepository.findByUserName(username).orElseThrow(()->new DataNotFound("User data not found"));
    }

    public UserData findUserById(Long id){
        return userDataRepository.findById(id).orElseThrow(()->new DataNotFound("User data not found"));
    }

    public void deleteUserById(Long id){
        userDataRepository.deleteById(id);
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

    public List<UserData> findAllUsers(){
        return userDataRepository.findAll();
    }
}
