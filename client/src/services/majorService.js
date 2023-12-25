import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/majors';

const majorService = {
    getAllMajor: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getMajorById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    createMajor: async (data) => {
        try {
            const respone = await axios.post(apiUrl + '/', data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    updateMajor: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    deleteMajor: async (id) => {
        try {
            const respone = await axios.delete(apiUrl + `/${id}`);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
};

export default majorService;
