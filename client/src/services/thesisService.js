import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL + "/theses";

const thesisService = {
  getAllThesis: async () => {
    try {
      const respone = await axios.get(apiUrl + "/");
      console.log("All thesis got: ", respone.data)
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },

  getDoneThesis: async () => {
    try {
      const respone = await axios.get(apiUrl + "/done");
      console.log("All thesis done got: ", respone.data)
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },

  getAllThesisByStudentId: async (id) => {
    try {
      const respone = await axios.get(apiUrl + `/${id}/student`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },

  assignThesisForLecturer: async (id) => {
    try {
      const respone = await axios.get(apiUrl + `/${id}/student`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  getThesisById: async (id) => {
    try {
      const respone = await axios.get(apiUrl + `/${id}`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  approveThesisById: async (id) => {
    try {
      const respone = await axios.put(apiUrl + `/${id}/approve`);
      console.log(respone);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  declineThesisById: async (id) => {
    try {
      const respone = await axios.put(apiUrl + `/${id}/deny`);
      console.log(respone);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  getPendingThesisByMajor: async (majorId) => {
    try {
      const respone = await axios.get(apiUrl + `/pending/${majorId}`);
      console.log(respone.data);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  getApprovedThesisByMajor: async (majorId) => {
    try {
      const respone = await axios.get(apiUrl + `/approved/${majorId}`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  getThesisByLecturerId: async (id) => {
    try {
      const respone = await axios.get(apiUrl + `/${id}/faculty`);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  registerThesisForStudent: async (id, data) => {
    try {
      const respone = await axios.put(apiUrl + `/${id}/join`, data);
      return respone.data;
    } catch (error) {
      // console.log(error);
      if (error.response.status === 400) {
        return {
          isFull: true,
        };
      }
    }
  },
  registerThesis: async (id, data) => {
    try {
      const respone = await axios.post(apiUrl + `/${id}/register`, data);
      return respone.data;
    } catch (error) {
      console.error(error);
    }
  },
  createThesis: async (data) => {
    try {
      const respone = await axios.post(apiUrl + "/", data);
      return respone;
    } catch (error) {
      console.log(error);
    }
  },
  assignDefenseLecturer: async (id, data) => {
    try {
      const respone = await axios.post(
        apiUrl + `/${id}/assign-defense-member`,
        data
      );
      return respone;
    } catch (error) {
      console.log(error);
    }
  },
  updateThesis: async (id, data) => {
    try {
      const respone = await axios.put(apiUrl + `/${id}`, data);
      return respone;
    } catch (error) {
      console.log(error);
    }
  },
  deleteThesis: async (id) => {
    try {
      const respone = await axios.delete(apiUrl + `/${id}`);
      return respone;
    } catch (error) {
      console.log(error);
    }
  },
};

export default thesisService;
