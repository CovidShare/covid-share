import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthServices';

// Context is a global state for the whole app
// It gives a provider and a consumer
export const AuthContext = createContext();

// children refers to the components that the provider will wrap around
export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
        });
    }, []); // Empty array to be exectued once

    // Anything wrapped within the provider will have access to the global state
    // value = {what we want available as global state}
    return (
        <div>
            <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}