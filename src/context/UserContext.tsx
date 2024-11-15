"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

const base64UrlToBase64 = (base64Url: string): string => {
    return base64Url.replace(/-/g, '+').replace(/_/g, '/');
};

const decodeBase64 = (base64: string): any => {
    const decoded = atob(base64);
    return JSON.parse(decoded);
};

const decodeJWT = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        throw new Error("Token JWT inválido");
    }

    const payloadBase64Url = parts[1];
    const payloadBase64 = base64UrlToBase64(payloadBase64Url);
    return decodeBase64(payloadBase64);
};

interface User {
    email: string | null;
    role: string | null;
}

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>({
        email: null,
        role: null,
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (jwtToken) {
            try {
                const decoded: any = decodeJWT(jwtToken);

                const email = decoded.sub || null;
                const role = decoded.authorities || null;

                setUser({
                    email,
                    role,
                });
            } catch (err) {
                console.error("Error al decodificar el JWT:", err);
            }
        }
    }, []);

    const logout = () => {
        setUser({
            email: null,
            role: null,
        });
        localStorage.removeItem("jwtToken");
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser debe usarse dentro de un UserProvider");
    }
    return context;
};
