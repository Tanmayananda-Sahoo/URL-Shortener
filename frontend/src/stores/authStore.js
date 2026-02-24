import {create} from 'zustand';
import useAuthAxios from '../utils/axios.js';
import {toast} from 'react-toastify';

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isLoggingIn: false,
    isRegistering: false,
    authUser: null,
    register: async(data) => {
        try {
            set({isRegistering: true});
            const response = await useAuthAxios.post('/users/register',data);
            set({authUser: response.data.user});
            console.log(response.data.message);
            toast.success(response.data.message);
        } catch (error) {
            // console.log(error.response.data.message);
            set({authUser: null});
            toast.error(error.response.data.message);
        } finally {
            set({isRegistering: false});
        }
    },
    login: async(data) => {
        try {
            set({isLoggingIn: true});
            const response = await useAuthAxios.post('/users/login',data);
            set({authUser: response.data.user});
            toast.success(response.data.message);
        } catch(error) {
            console.log(error);
            set({authUser: null});
            toast.error(error.response.data.message);
        } finally {
            set({isLoggingIn: false});
        }
    },
    logout: async() => {
        const response = await useAuthAxios.post('/users/logout');
        set({authUser: null});
        console.log(response.data.message);
        toast.success(response.data.message);
        return true;
    },
    checkAuth: async() => {
        try {
            const response = await useAuthAxios.get('/users/auth');
            set({authUser: response.data.user});
            return true;
        } catch(error) {
            console.log(error.response.data.message);
            set({authUser: null});
            return false;
        }
    }
}))