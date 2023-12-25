import { createSlice } from "@reduxjs/toolkit";

const INITIAL_ACCOUNT = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : {
      _id: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      address: null,
      type: null,
      isActived: false,
      accessToken: null,
      refreshTokens: [""],
      __t: null,
      studentId: null,
      birthday: null,
      major: null,
      isHeadDep: false,
    };
const EMPTY_ACCOUNT = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  address: null,
  type: null,
  isActived: false,
  accessToken: null,
  refreshTokens: [""],
  __t: null,
  studentId: null,
  birthday: null,
  major: null,
  isHeadDep: false,
};

const accountsSlices = createSlice({
  name: "accounts",
  initialState: INITIAL_ACCOUNT,
  reducers: {
    setAccount: (state, action) => {
      const {
        _id,
        firstName,
        lastName,
        email,
        phone,
        address,
        type,
        isActived,
        accessToken,
        refreshTokens,
        __t,
        studentId,
        birthday,
        major,
        isHeadDep,
      } = action?.payload;
      console.log(action?.payload);
      state._id = _id;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.phone = phone;
      state.address = address;
      state.type = type;
      state.isActived = isActived;
      state.accessToken = accessToken;
      state.refreshTokens = [...refreshTokens];
      state.__t = __t;
      state.studentId = studentId;
      state.birthday = birthday;
      state.major = major;
      state.isHeadDep = isHeadDep;

      localStorage.setItem("account", JSON.stringify(state));
    },
    deleteAccount: (state, action) => {
      state = EMPTY_ACCOUNT;
      localStorage.removeItem("account");
    },
    // checkAccountRole: (state, action) => {
    //     if (role.includes('.')) {
    //         const [eKind, eRole] = role.split(/\./);
    //         return (
    //             account.kind.toLowerCase() === eKind &&
    //             account.roles.some((e) => e.toLowerCase() === eRole)
    //         );
    //     } else {
    //         return account.kind.toLowerCase() === role;
    //     }
    // },
    // checkAccount: (state, action) => {
    //     if (typeof roleOrRoles === 'admin') {
    //         return checkAccountRole(account, roleOrRoles);
    //     } else {
    //         return roleOrRoles.some((e) => checkAccountRole(account, e));
    //     }
    // },
  },
});
export default accountsSlices;
