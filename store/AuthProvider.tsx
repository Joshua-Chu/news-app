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
    logout: () => void;
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
    const [currentUser, setCurrentUser] = useState<User | null>({
        id: "51cd5c4b-51e6-4160-a4aa-ebdcea08c747",
        email: "test@test.com",
        profilePhoto:
            "https://res.cloudinary.com/dlfecpmkj/image/upload/v1645250567/news-upload/vusanttomwnsazygvovk.png",
    });

    // useEffect(() => {
    //     if (!currentUser) {
    //         const loggedUser = supabase.auth.user();

    //         if (loggedUser) {
    //             setCurrentUser({
    //                 id: loggedUser.id,
    //                 email: loggedUser.email as string,
    //                 profilePhoto: loggedUser.user_metadata.profile_photo,
    //             });
    //         }
    //     }
    // }, [currentUser]);

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

    const logout = async () => {
        setCurrentUser(null);
        router.push("/");
    };

    const value = {
        currentUser,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
