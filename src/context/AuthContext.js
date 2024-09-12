import React, {createContext} from 'react';

export const AuthContext = createContext();   

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const login = (username, password, authToken) => {
        setIsLoading(false);
        setUserToken('token');
    }

    const logout = () => {
        setIsLoading(false);
        setUserToken(null);
    }

    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken}}>
            {children}
        </AuthContext.Provider>
    );
}