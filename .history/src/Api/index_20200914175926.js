import Axios from 'axios';
let baseURL ='https://secure.vezeti.net/test-api/v3/';

let username = 'Olawale7040@gmail.com';
let password = 'ThEW0rld1sUn1m1ite3#';
var basicAuth = 'Basic ' + btoa(username + ':' + password);
Axios.defaults.headers.common['Authorization'] = basicAuth;
Axios.defaults.headers['Content-Type'] = 'application/json';

export const registerUser =(payload)=>{
    return Axios.post(`${baseURL}signup/`,payload);
}

export const loginUser =(payload)=>{
  return Axios.post(`${baseURL}login/`,payload);
}

export const getUserAccountParameter =(payload)=>{
  return Axios.post(`${baseURL}get-user-account-parameters/`,payload);
}

export const forgetPin =(payload)=>{
  return Axios.post(`${baseURL}forgotpin/`,payload);
}

export const changeEmailAddress =(payload)=>{
  return Axios.post(`${baseURL}change-user-email/`,payload);
}

export const forgotPassword =(payload)=>{
  return Axios.post(`${baseURL}forgotpassword/`,payload);
}