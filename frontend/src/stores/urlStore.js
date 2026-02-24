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
            console.log(response.data.message);
            toast.success(response.data.message);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            set({isUrlGenerating: false});
        }
    },
    fetchUrls: async() => {
        try {
            const response = await urlAxios.get('/fetch/urls');
            console.log(response.data);
            set({listOfUrls: response.data.urls});
            console.log(response.data.urls);
            console.log(get().listOfUrls);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

}))