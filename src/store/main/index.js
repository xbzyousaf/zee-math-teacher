import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import mainAPI from "./mainAPI";
import { removeToken, setToken } from "../../utils";

const initialState = {
  userId: null,
  email: null,
  billedAt: null,
  firstName: null,
  lastName: null,
  gender: null,
  isGuest: false,
  levelNames: [
    "7+/11+",
    "Primary",
    "Secondary",
    "GCSE",
    "A-level",
    "Degree/Adult",
  ],
  signup: {
    waiting: false,
    success: 0,
    message: "",
  },
  login: {
    waiting: false,
    success: 0,
    message: "",
  },
  status: 0,
  pagesVisited: [],
};

// const initialState = {
//   userId: 123,
//   email: 'admin@gmail.com',
//   avatar: null,
//   firstName: 'vladyslav',
//   lastName: 'm',
//   gender: 1,
//   levelNames : ['7+/11+', 'Primary', 'Secondary', 'GCSE', 'A-level', 'Degree/Adult']
// }

export const login = createAsyncThunk(
  "main/login",
  async (params, { rejectWithValue }) => {
    try {
      const response = await mainAPI.login(params);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const syncDatabaseUser = createAsyncThunk(
  "main/syncDatabaseuser",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await mainAPI.getCurrentUser();
      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const signup = createAsyncThunk(
  "main/signup",
  async (params, { rejectWithValue }) => {
    try {
      const response = await mainAPI.signup(params);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const logout = createAsyncThunk("main/logout", async () => {
  // const response = await mainAPI.logout()
  // return response.data
});

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    initSignup: (state) => ({
      ...state,
      signup: {
        waiting: false,
        success: 0,
        message: "",
      },
    }),
    initLogin: (state) => ({
      ...state,
      login: {
        waiting: false,
        success: 0,
        message: "",
      },
    }),
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBilledAt: (state, action) => {
      state.billedAt = action.payload;
    },
    // getCurrentUser: (state)=> {
    //   const token = getToken()
    //   if (token) {
    //     try {
    //       const decodedToken = jwtDecode(token);
    //       const {createdAt, billedAt, _id : userId, email, firstName, lastName, status, isGuest} = decodedToken
    //       return {...state, userId, email, createdAt, billedAt, firstName, lastName, status, isGuest}
    //     } catch (error) {
    //       console.log(error);
    //      return initialState
    //     }
    //   } else return initialState
    // }
  },
  extraReducers: (builder) =>
    builder
      .addCase(signup.pending, (state) => ({
        ...state,
        signup: { success: 0, waiting: true, message: "" },
      }))
      .addCase(signup.fulfilled, (state, action) => ({
        ...state,
        signup: {
          success: 1,
          waiting: false,
          message: action.payload?.message,
        },
      }))
      .addCase(syncDatabaseUser.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          userId: action.payload._id,
        };
      })
      .addCase(signup.rejected, (state, action) => {
        return {
          ...state,
          signup: {
            success: -1,
            waiting: false,
            message: action.payload?.message,
          },
        };
      })
      .addCase(login.pending, (state) => ({
        ...state,
        login: { success: 0, waiting: true, message: "" },
      }))
      .addCase(login.fulfilled, (state, action) => {
        setToken(action.payload.token);
        return {
          ...state,
          ...action.payload.userInfo,
          userId: action.payload.userInfo._id,
          login: {
            success: 1,
            waiting: false,
            message: "",
          },
        };
      })
      .addCase(login.rejected, (state, action) => ({
        ...state,
        login: {
          success: -1,
          waiting: false,
          message: action.payload?.message,
        },
      }))
      .addCase(logout.pending, () => {
        removeToken();
        return initialState;
      }),
});

export const { initLogin, initSignup, setUser, setBilledAt, getCurrentUser } =
  mainSlice.actions;

export default mainSlice.reducer;
