import { useEffect } from "react";
import axios from "../api/axios";

const path = "https://localhost:7080/api/User";


export async function RegisterUser(email, password, username){
    const data = {
        "email":email,
        "password":password,
        "username":username,
        "role":0
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    let x = "";
    await fetch(`${path}/register`, requestOptions).
    then(response => response.text()).
    then(text => x = text.split("\n")[0].split(": ")[1]);
    return x;
}

export async function LoginUser(email, password){
    const data = {
        "email": email,
        "password": password
    }
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }
    try{
    let result = await fetch(`${path}/login`, requestOptions);
    let token = await result.json();
    return token;
    }catch{
        return undefined;
    }
    
}

export async function LoginAxios(email, password){
    try{
        const response = await axios.post('/User/login', JSON.stringify({email, password}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false,
        }
        );
        console.log(response);
    }catch (err) {
        console.log(err);
      }
      
}

export async function RegisterAxios(email, password, username){
    try{
        const response = await axios.post('/User/register', JSON.stringify({email, username, password}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false,
        }
      );
      console.log(response);
    }catch (err) {
        console.log(err);
      }
}