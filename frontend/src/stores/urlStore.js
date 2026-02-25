import {create} from 'zustand';
import urlAxios from '../utils/axios.js';
import {toast} from 'react-toastify';

export const useUrlStore = create((set,get) => ({
    isUrlGenerating: false,
    listOfUrls: [],
    urlGeneration: async(data) => {
        try {
            set({isUrlGenerating: true});
            const response = await urlAxios.post('/generate',data);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUrlGenerating: false});
        }
    },
    fetchUrls: async() => {
        try {
            const response = await urlAxios.get('/fetch/urls');
            set({listOfUrls: response.data.urls});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

}))