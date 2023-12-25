import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/tasks';

const taskService = {
    getAllTask: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getTaskById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getTaskByThesisId: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}/theses`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    submitTask: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}/submit`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    createTask: async (data) => {
        try {
            const respone = await axios.post(apiUrl + '/', data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    updateTask: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    deleteTask: async (id) => {
        try {
            const respone = await axios.delete(apiUrl + `/${id}`);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
};

export default taskService;
