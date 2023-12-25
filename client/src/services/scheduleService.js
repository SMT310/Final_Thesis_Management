import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/schedules';

const scheduleService = {
    getAllSchedule: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    getScheduleById: async (id) => {
        try {
            const respone = await axios.get(apiUrl + `/${id}`);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },
    createSchedule: async (data) => {
        try {
            const respone = await axios.post(apiUrl + '/', data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    updateSchedule: async (id, data) => {
        try {
            const respone = await axios.put(apiUrl + `/${id}`, data);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
    deleteSchedule: async (id) => {
        try {
            const respone = await axios.delete(apiUrl + `/${id}`);
            return respone;
        } catch (error) {
            console.log(error);
        }
    },
};

export default scheduleService;
