import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";

import { User } from "../types";

export type authContextType = {
    currentUser: User | null;
    login: (email: string, password: string) => void;
};

const AuthContext = createContext<authContextType>({} as authContextType);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: React.ReactNode;
};

// TODO : LOADING STATE
// TODO : ERROR STATE

export function AuthProvider({ children }: Props) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        const { user } = await supabase.auth.signIn({
            email,
            password,
        });

        if (user) {
            setCurrentUser({
                id: user.id,
                email: user.email as string,
                profilePhoto: user.user_metadata.profile_photo,
            });

            router.push("/");
        }
    };

    const value = {
        currentUser,
        login,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
