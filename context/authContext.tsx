import { AuthContextType, UserType } from "@/types";
import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import { useRouter } from "expo-router";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserType>(null);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            console.log("firebaseUser: ", firebaseUser);
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser?.uid,
                    email: firebaseUser?.email,
                    name: firebaseUser?.displayName,
                });
                updateUserData(firebaseUser.uid);
                router.replace("/(tabs)");
            } else {
                setUser(null);
                router.replace("/(auth)/welcome");
            }
        });
        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            if (msg.includes("auth/invalid-credential")) {
                msg = "Wrong  credentials";
            }
            if (msg.includes("auth/invalid-email")) {
                msg = "Wrong  email";
            }
            return { success: false, msg: msg };
        }
    };

    const register = async (email: string, password: string, name: string) => {
        try {
            let response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await setDoc(doc(firestore, "users", response?.user?.uid), {
                name,
                email,
                uid: response?.user?.uid,
            });

            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            console.log("error message: ", msg);
            if (msg.includes("auth/email-already-in-use")) {
                msg = "Email already in exists";
            }
            if (msg.includes("auth/invalid-email")) {
                msg = "Wrong  email";
            }
            if (msg.includes("auth/weak-password")) {
                msg = "Password is too weak, Please enter atleast 6 characters";
            }
            return { success: false, msg: msg };
        }
    };

    const updateUserData = async (userId: string) => {
        try {
            const docRef = doc(firestore, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                const userData: UserType = {
                    uid: data.uid || null,
                    email: data.email || null,
                    name: data.name || null,
                    image: data.image || null,
                };
                setUser({ ...userData });
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const contextValue: AuthContextType = {
        user,
        setUser,
        login,
        register,
        updateUserData,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
