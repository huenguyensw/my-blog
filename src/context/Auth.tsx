import React, { useEffect } from 'react'
import { createContext, useContext } from 'react';

interface User {
    _id: string;
    username: string;
    password: string;
    email: string;
    firstname?: string;
    lastname?: string;
    imageUrl?: string;
}


export const AuthContext = createContext<{
    token: string | null;
    setToken: (token: string | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    handleLogout: () => void;
}>({
    token: null,
    setToken: () => { },
    user: null,
    setUser: () => { },
    handleLogout: () => { },
});


    const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
        const [token, setToken] = React.useState<string | null>(null);
        const [user, setUser] = React.useState<User | null>(null);
        

        const handleLogout = () => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        };

        const isLoggedIn =  () => {
            const token =  localStorage.getItem('token');
            const user =  localStorage.getItem('user');
            if (token) {
                setToken(token);
                setUser(user ? JSON.parse(user) : null);
            }
            else {
                setToken(null);
                setUser(null);
            }
        };

        useEffect(() => {
            isLoggedIn();   
        }, []);


        return (
            <AuthContext.Provider value={{ user, handleLogout, token, setToken, setUser }}>
                {children}
            </AuthContext.Provider>
        );
    }

export default AuthProvider;