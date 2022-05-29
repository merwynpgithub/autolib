import axios from "axios";
import React, { useState } from "react";

export default function useApplicationData(initialState) {

  const [user, setUser] = useState(initialState);

  const isLoggedIn = user?.id > 0;

  const login = ({email, password}) => {
    return new Promise((resolve, reject) => {
      axios.post("/login", {email, password})
        .then(res => {
          setUser({...res.data});
          console.log(`Logged in as ${res.data.first_name}`);
          resolve();
        }).catch(reject);
    })    
  }


  const getUserFromServer = () => {
    return new Promise((resolve, reject) => { 
      axios.get("/me")
        .then(res => resolve(res.data))
        .catch(reject);
    });
  };

  const logout = () => {
    axios.get("/logout")
      .then(() => {
        setUser({});
        console.log("Logged out successfully");
      });
  }

  return {
    setUser,
    user,
    isLoggedIn,
    login,
    getUserFromServer,
    logout,
  }

}