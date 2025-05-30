import React, { useEffect } from 'react'
import { createContext } from 'react';

export interface User {
    _id: string;
    userName: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    imageUrl?: string;
    favorites?: string[];
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

        useEffect(() => {
            if (token) {
                localStorage.setItem('token', token);
            }
        }, [token]);
        
        useEffect(() => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }, [user]);


        return (
            <AuthContext.Provider value={{ user, handleLogout, token, setToken, setUser }}>
                {children}
            </AuthContext.Provider>
        );
    }

export default AuthProvider;