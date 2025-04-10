import { createContext, useState, useContext } from "react";

const AuthContext = createContext();


export function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

