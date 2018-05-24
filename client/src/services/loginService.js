import axios from 'axios';

function axiosInstance(){            
    if(window.localStorage.getItem('token') !== '')
        var instance = axios.create({
          baseURL: 'http://express-api-space91.c9users.io:8082',
          headers: {'Authorization': 'JWT ' + localStorage.getItem('token')}
        });
    return instance;
}

export function checkCredentials(email, password){        
    return axiosInstance().post('/login', {
        email: email,
        password: password
      });
}

export function checkLogin(){
    return axiosInstance().get('/protected', {"token": localStorage.getItem('token')}) 
}