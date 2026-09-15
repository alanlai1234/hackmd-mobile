import HackMDAPI, { User } from '@hackmd/api';
import { createContext, useContext, useState } from 'react';

type authContextType = {
    loggedIn: boolean;
    login(token: string): Promise<boolean>;
    logout(): void;
    client: HackMDAPI | undefined;
    loading: boolean;
    aboutMe: User | undefined;
}

const AuthContext = createContext<authContextType | null>(null);
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [client, setClient] = useState<HackMDAPI | undefined>();
    const [aboutMe, setAboutMe] = useState<User>();
    const login = async (token: string): Promise<boolean> => {
        if (!token) {
            return false;
        }
        setLoading(true);
        try {
            const get = new HackMDAPI(token);
            const me = await get.getMe();
            setAboutMe(me);
            setClient(get);
            setLoading(false);
            setLoggedIn(true);
            return true;
        } catch (cause: unknown) {
            setLoading(false);
            return false;
        }
    };
    const logout = () => {};
    const [loggedIn, setLoggedIn] = useState(true); //tmp
    const [loading, setLoading] = useState(false);

    return(
        <AuthContext.Provider value={{loggedIn, login, logout, client, loading, aboutMe}}>
            {children}
        </AuthContext.Provider>
    )
}
