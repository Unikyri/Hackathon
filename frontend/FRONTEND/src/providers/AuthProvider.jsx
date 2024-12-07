import React, { createContext, useState ,useEffect } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userRole, setUserRole] = useState(localStorage.getItem('role'));
    const [session , setSession] = useState(localStorage.getItem('session'));
    const [id , setId] = useState(localStorage.getItem('user'))
    return (
        <AuthContext.Provider value={{ token, setToken, userRole, setUserRole , session , setSession ,id , setId}}>
            {children}
        </AuthContext.Provider>
    );
};
