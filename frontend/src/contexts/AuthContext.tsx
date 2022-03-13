import { createContext, ReactNode, useState, useEffect } from 'react';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import Router from 'next/router'

import { api } from '../services/apiClient';
import { toast } from 'react-toastify';

type AuthcontextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthcontextData)

export function signOut(){
        try {
            destroyCookie(undefined, '@nextauth.token');
            Router.push('/'); 
        } catch {
            console.log("Erro ao deslogar.")
        }
}

export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    
    const isAuthenticated = !!user;

    useEffect(() => {

        const { "@nextauth.token": token} = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                signOut();
            })
        }
    }, [])
    
    async function signIn({email, password}:SignInProps){
        
        try {
            const response = await api.post('/session', {
                email,
                password
            });

            // console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });


            setUser({
                id,
                name,
                email
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success("Logado com sucesso!");

            Router.push('/dashboard');

        } catch (error) {
            toast.error("Erro ao acessar!");
            console.log('ERRO AO ACESSAR', error);
        }
    }

    async function signUp({name, email, password}:SignUpProps){
        try{
            const response = await api.post('/users', {
                name,
                email,
                password
            });

            console.log('CADASTRADO COM SUCESSO');

            toast.success("Cadastrado com sucesso!");

            Router.push('/');

        } catch(error){
            toast.error("Erro ao cadastrar!");
            console.log('ERRO AO CADASTRAR', error);
        }
    }

    
    return(
        <AuthContext.Provider value={{ user, signIn, isAuthenticated, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}