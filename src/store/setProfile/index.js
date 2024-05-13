import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileAPI from "./profileAPI";
import { countWords } from "../../utils/string";
import { syncDatabaseUser } from "../main";
import { toast } from "react-toastify";
export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async () => {
    try {
      const response = await profileAPI.getProfile();
      return response.data;
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong!");
      console.log(error);
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/save",
  async ({ information, setLoading, nextStep }, { rejectWithValue }) => {
    try {
      setLoading(true);
      const response = await profileAPI.saveProfile(information);
      setLoading(false);
      nextStep();
      return response.data;
    } catch (error) {
      console.log("ERROR", error);
      setLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deactivateProfile = createAsyncThunk(
  "profile/deactivate",
  async ({ setLoading }, { rejectWithValue, dispatch }) => {
    try {
      setLoading(true);
      const response = await profileAPI.deactivateProfile();
      setLoading(false);
      dispatch(syncDatabaseUser());
      return response.data;
    } catch (error) {
      console.log("ERROR", error);
      setLoading(false);
      toast.error(error?.message ?? "Something went wrong!");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const submitProfile = createAsyncThunk(
  "profile/submit",
  async (
    { information, setLoading, router },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const state = getState();
      setLoading(true);
      const response = await profileAPI.submitProfile({
        ...information,
        _id: state.profile.user._id,
      });
      setLoading(false);
      router.push("/dashboard");
      dispatch(syncDatabaseUser());
      toast.success("Profile submitted for review successfully!");
      return response.data;
    } catch (error) {
      setLoading(false);
      console.log("ERROR --->>", error);
      toast.error(error?.message ?? "Something went wrong!");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getMyMessages = createAsyncThunk(
  "profile/getMyMessage",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getMyMessages();
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.message ?? "Something went wrong!");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const readMessages = createAsyncThunk(
  "profile/readMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileAPI.readMessages();
      return response.data;
    } catch (error) {
      console.log(error);
      toast.error(error?.message ?? "Something went wrong!");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getGuestProfile = createAsyncThunk(
  "profile/getGuestProfile",
  async (_) => {
    try {
      const response = await profileAPI.getGuestProfile();
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const updateGuestProfile = createAsyncThunk(
  "profile/updateGuestProfile",
  async (
    { data, setLoading, setShowCropper },
    { rejectWithValue, dispatch }
  ) => {
    try {
      setLoading(true);
      const response = await profileAPI.updateGuestProfile(data);
      setLoading(false);
      dispatch(syncDatabaseUser());
      setShowCropper(false);
      toast.success("Data updated successfully!");
      return response.data;
    } catch (e) {
      toast.error(e?.message ?? "Something went wrong!");
      setLoading(false);
    }
  }
);

const initialState = {
  guestInformation: {
    avatar: null,
    tempAvatar: null,
    phone: "",
  },
  information: {
    _id: null,
    isAgency: 0,
    level: {
      "7+/11+": false,
      Primary: false,
      Secondary: false,
      GCSE: false,
      "A-level": false,
      "Degree/Adult": false,
    }, // -1 ~ 7
    exam: {
      AQA: false,
      OCR: false,
      Edexcel: false,
      WJEC: false,
      CCEA: false,
      Other: false,
    }, // AQA, OCR, Edexcel, WJEC, CCEA, Other
    price: [15, 100],
    online: false,
    faceToFace: false,
    title: "",
    avatar: null,
    about: "",
    gender: -1, // male, female, other = 0, 1, 2
    links: {
      facebook: null,
      website: null,
      x: null,
      instagram: null,
      linkedin: null,
    },
    qualifications: {
      Degree: -1,
      "Qualified Teacher": -1,
      "Enhanced DBS": -1,
      Examiner: -1,
      Student: -1,
      "A-level Student": -1,
    },
    phone: "",
    email: "",
    address: "",
    addressDetails: null,
    postcode: "",
    distance: 30,
    publish: -1,
    status: 0,
    latitude: -1,
    longitude: -1,
  },
  user: {
    _id: null,
    isAgency: 0,
    level: {
      "7+/11+": false,
      Primary: false,
      Secondary: false,
      GCSE: false,
      "A-level": false,
      "Degree/Adult": false,
    }, // -1 ~ 7
    exam: {
      AQA: false,
      OCR: false,
      Edexcel: false,
      WJEC: false,
      CCEA: false,
      Other: false,
    }, // AQA, OCR, Edexcel, WJEC, CCEA, Other
    price: [15, 100],
    online: false,
    faceToFace: false,
    title: "",
    avatar: null,
    about: "",
    gender: -1, // male, female, other = 0, 1, 2
    links: {
      facebook: null,
      website: null,
      x: null,
      instagram: null,
      linkedin: null,
    },
    qualifications: {
      Degree: -1,
      "Qualified Teacher": -1,
      "Enhanced DBS": -1,
      Examiner: -1,
      Student: -1,
      "A-level Student": -1,
    },
    phone: "",
    email: "",
    address: "",
    addressDetails: null,
    postcode: "",
    distance: 30,
    publish: -1,
    status: 0,
    latitude: -1,
    longitude: -1,
  },
  message: "",
  selectedMessageId: null,
  success: 0,
  messages: [],
};

const setProfileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.information.level = {
        ...state.information.level,
        ...action.payload,
      };
    },
    setSelectedMessageId: (state, action) => {
      state.selectedMessageId = action.payload;
    },
    setExam: (state, action) => {
      state.information.exam = { ...state.information.exam, ...action.payload };
    },
    setPrice: (state, action) => {
      state.information.price = [
        parseInt(action.payload[0]),
        parseInt(action.payload[1]),
      ];
    },
    setOnline: (state, action) => {
      state.information.online = action.payload;
    },
    setFaceToFace: (state, action) => {
      state.information.faceToFace = action.payload;
    },
    setTitle: (state, action) => {
      state.information.title =
        action.payload.length > 50 ? state.information.title : action.payload;
    },
    setAbout: (state, action) => {
      state.information.about =
        countWords(action.payload) > 190
          ? state.information.about
          : action.payload;
    },
    setLinks: (state, action) => {
      state.information.links = {
        ...state.information.links,
        ...action.payload,
      };
    },
    setGender: (state, action) => {
      state.information.gender = action.payload;
    },
    setQualifications: (state, action) => {
      state.information.qualifications = {
        ...state.information.qualifications,
        ...action.payload,
      };
    },
    setEmail: (state, action) => {
      state.information.email = action.payload;
    },
    setPhone: (state, action) => {
      state.information.phone = action.payload;
    },
    setAddress: (state, action) => {
      state.information.address =
        action.payload.length > 0
          ? action.payload.slice(0, 10)
          : action.payload;
    },
    setDistance: (state, action) => {
      state.information.distance = action.payload;
    },
    setPublish: (state, action) => {
      state.information.publish = action.payload;
    },
    setIsAgency: (state, action) => {
      state.information.isAgency = parseInt(action.payload);
    },
    setAvatar: (state, action) => {
      state.information.avatar = action.payload;
    },
    setTempGuestAvatar: (state, action) => {
      state.guestInformation.tempAvatar = action.payload;
    },
    initProfile: () => initialState,
    setSuccess: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
    initInformation: (state) => {
      state.information = state.user;
    },
    setPosition: (state, action) => {
      // location
      state.information = { ...state.information, ...action.payload };
    },
    seenMessages: (state, action) => {
      state.messages = state.messages.map((message) => {
        if (action.payload === message._id) {
          message.isRead = true;
        }
        return message;
      });
    },
    deleteMessages: (state, action) => {
      state.messages = state.messages.filter(
        (message) => action.payload.findIndex((id) => id === message._id) < 0
      );
    },
    setStatus: (state, action) => {
      state.user.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.user = action.payload
          ? { ...state.user, ...action.payload }
          : initialState.user;
        state.information = state.user;
      })
      .addCase(saveProfile.pending, (state) => ({
        ...state,
        success: 0,
        message: "",
      }))
      .addCase(saveProfile.fulfilled, (state, action) => ({
        ...state,
        user: { ...state.user, ...action.payload },
        information: { ...state.information, avatar: action.payload.avatar },
        success: 1,
        message:
          "Your profile is saved successfully. Please submit to make live.",
      }))
      .addCase(saveProfile.rejected, (state, action) => ({
        ...state,
        success: -1,
        message:
          action.payload?.message ||
          "Your profile save failed. Please try again.",
      }))
      .addCase(submitProfile.pending, (state, action) => ({
        ...state,
        success: 0,
        message: "",
      }))
      .addCase(submitProfile.fulfilled, (state, action) => {
        return {
          ...state,
          user: { ...state.user, ...action.payload },
          success: 1,
          message:
            "Your profile is submitted successfully. Your account is live now.",
        };
      })
      .addCase(submitProfile.rejected, (state, action) => ({
        ...state,
        success: -1,
        message:
          action.payload?.message ||
          "Your profile submit failed. Please try again.",
      }))
      .addCase(getMyMessages.fulfilled, (state, action) => {
        state.messages = action.payload.messages;
      })
      .addCase(readMessages.fulfilled, (state, action) => {
        state.messages = state.messages.map((message) => {
          message.read = true;
          return message;
        });
      })
      .addCase(updateGuestProfile.fulfilled, (state, action) => {
        const { avatar, phone } = action.payload;
        state.guestInformation = {
          avatar,
          phone,
        };
      })
      .addCase(getGuestProfile.fulfilled, (state, action) => {
        const { avatar, phone } = action.payload;
        state.guestInformation = {
          avatar,
          phone,
        };
      });
  },
});

export const {
  nextStep,
  backStep,
  setSelectedMessageId,
  setLevel,
  setExam,
  setPrice,
  setTitle,
  setAbout,
  setEmail,
  setGender,
  setPhone,
  setQualifications,
  setLinks,
  setFaceToFace,
  setOnline,
  setDistance,
  setAddress,
  setPublish,
  setIsAgency,
  setAvatar,
  initProfile,
  setSuccess,
  initInformation,
  setPosition,
  deleteMessages,
  seenMessages,
  setStatus,
  setTempGuestAvatar,
} = setProfileReducer.actions;

export default setProfileReducer.reducer;
