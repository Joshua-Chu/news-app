import { useRouter } from "next/router";
import React, { createContext, useContext, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";

import { User } from "../types";

export type authContextType = {
    currentUser: User | null;
    login: (email: string, password: string) => void;
    signup: (
        email: string,
        password: string,
        profilePhoto: string
    ) => Promise<{
        status: string;
    }>;
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
// TODO : Get Cache
// TODO : Route at request
// TODO : error handling

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

    const signup = async (
        email: string,
        password: string,
        profilePhoto: string
    ) => {
        const { user } = await supabase.auth.signUp(
            {
                email,
                password,
            },
            {
                data: {
                    profile_photo: profilePhoto,
                },
            }
        );

        if (user) {
            setCurrentUser({
                id: user.id,
                email: user.email as string,
                profilePhoto: user.user_metadata.profile_photo,
            });

            return { status: "success" };
        }

        return { status: "error" };
    };

    const value = {
        currentUser,
        login,
        signup,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}