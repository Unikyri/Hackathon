import React, { createContext, useState ,useEffect } from 'react';



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [sidebarState, setSidebarState] = useState(false);
    const [navbarState, setNavbarState] = useState(true);
    
    
    
    return (
        <UserContext.Provider value={{ sidebarState , setSidebarState ,navbarState, setNavbarState}}>
            {children}
        </UserContext.Provider>
    );
};
