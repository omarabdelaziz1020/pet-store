import { createContext } from 'react';

type AuthContextType = {
    user: { email: string; token: string } | null;
    login: (email: string, token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null); 