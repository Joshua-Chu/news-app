import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase/supabaseClient";

import { User, UsersTable } from "../types";

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
    logout: () => void;
    loading: boolean;
    error: string | undefined;
};

const AuthContext = createContext<authContextType>({} as authContextType);

export function useAuth() {
    return useContext(AuthContext);
}

type Props = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError("");
            }, 2500);
        }
    }, [error]);

    useEffect(() => {
        if (!currentUser) {
            const loggedUser = supabase.auth.user();

            if (loggedUser) {
                setCurrentUser({
                    id: loggedUser.id,
                    email: loggedUser.email as string,
                    profilePhoto: loggedUser.user_metadata.profile_photo,
                });
            }
        }
    }, [currentUser]);

    const login = async (email: string, password: string) => {
        setLoading(true);
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
            setLoading(false);
            return { status: "success" };
        }

        return { status: "error" };
    };

    const signup = async (
        email: string,
        password: string,
        profilePhoto: string
    ) => {
        setLoading(true);
        const { user, error: signUpError } = await supabase.auth.signUp(
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
            const { data, error: usersError } = await supabase
                .from<UsersTable>("users")
                .insert([
                    {
                        id: user.id,
                        email: user.email,
                        profile_photo: user.user_metadata.profile_photo,
                    },
                ]);

            if (data) {
                setCurrentUser({
                    id: data[0].id,
                    email: data[0].email as string,
                    profilePhoto: data[0].profile_photo,
                });
                setLoading(false);
                return { status: "success" };
            }
            if (usersError) {
                setError(usersError.message as string);
            }
            setLoading(false);
            return { status: "error" };
        }

        if (signUpError) {
            setError(signUpError.message as string);
        }
        setLoading(false);
        return { status: "error" };
    };

    const logout = async () => {
        const { error: logOutError } = await supabase.auth.signOut();
        if (!logOutError) {
            setCurrentUser(null);
            router.push("/");
        }
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
