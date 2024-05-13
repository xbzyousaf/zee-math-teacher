import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import searchAPI from './searchAPI'
import SweetAlert from 'sweetalert2'

const initialState = {
  filters: {
    level: null,
    distance: 7,
    gender: -1,
    isOnline: -1,
    price: [15, 100],
    load: 1,
    latitude: -1,
    longitude: -1,
    exam: null,
    postcode: ''
  },
  loading: false,
  resultCount: 0,
  results: []
}

export const fetchTutors = createAsyncThunk('search/fetchTutors', async ({filterParams,setLoading}, { rejectWithValue, dispatch }) => {
  try {
    setLoading(true)
    dispatch(clearTutorResults())
    const response = await searchAPI.fetchTutors(filterParams)
    setLoading(false)
    return response.data
  } catch (error) {
    console.log(error);
    setLoading(false)
    rejectWithValue(error.response?.data)
  }
})

export const fetchMoreTutors = createAsyncThunk('search/fetchMoreTutors', async (params, { rejectWithValue }) => {
  try {
    const response = await searchAPI.fetchTutors(params)
    return response.data
  } catch (error) {
    console.log(error);
    rejectWithValue(error.response?.data)
  }
})

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      const newFilters = { ...state.filters, ...action.payload }
      return { ...state, filters: newFilters , loading: true};
    },
    setLevel: (state, action) => ({ ...state, filters: { ...state.filters, level: action.payload } }),
    setExam: (state, action) => ({ ...state, filters: { ...state.filters, exam: action.payload } }),
    setLocation: (state, action) => ({ ...state, filters: { ...state.filters, latitude: action.payload.latitude, longitude: action.payload.longitude, postcode: action.payload.postcode } }),
    setPrice: (state, action) => ({ ...state, filters: { ...state.filters, price: action.payload } }),
    setIsOnline: (state, action) => ({ ...state, filters: { ...state.filters, isOnline: action.payload } }),
    setGender: (state, action) => ({ ...state, filters: { ...state.filters, gender: action.payload } }),
    setDistance: (state, action) => ({ ...state, filters: { ...state.filters, distance: action.payload } }),
    clearTutorResults: (state, action) => ({ ...state, results: [], resultCount: 0 }),
    loadMore: (state) => {
      const newFilters = { ...state.filters, load: state.filters.load + 1 }
      // fetchMoreTutors({filters: newFilters, tutorIds: state.results.map(tutor => tutor._id)})
      return { ...state, filters: newFilters, loading: true }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTutors.fulfilled, (state, action) => {
      return { ...state, results: action.payload?.teachers || [], resultCount: action.payload?.count || 0, loading: false }
    }).addCase(fetchTutors.rejected, (state, action) => {
      SweetAlert.fire(
        {
          icon: 'error',
          imageHeight: '100px',
          title: 'Oops...',
          text: action.payload?.message || 'Failed fetching tutors.',
          confirmButtonColor: '#0099FF'
        }
      )
      return { ...state, loading: false }
    }).addCase(fetchMoreTutors.fulfilled, (state, action) => {
      return { ...state, results: [...state.results, ...action.payload.teachers], loading: false }
    }).addCase(fetchMoreTutors.rejected, (state, action) => {
      SweetAlert.fire(
        {
          imageUrl: '/assets/error-icon.png',
          imageHeight: '100px',
          title: 'Oops...',
          text: action.payload?.message || 'Failed fetching tutors.',
          confirmButtonColor: '#0099FF'
        }
      )
      return { ...state, loading: false }
    })
  }
});

export const { setLevel,clearTutorResults, setLocation, setPrice, setFaceToFace, setIsOnline, setGender, setPage, setFilters, setDistance, setAddress, loadMore, setExam } = searchSlice.actions;

export default searchSlice.reducer;

// Action creator to dispatch the loadMore action along with the fetchMoreTutors thunk
export const loadMoreAndFetchTutors = () => {
  return (dispatch, getState) => {
    dispatch(loadMore());
    const state = getState(); // Get the current state
    const { filters, results } = state.search; // Extract relevant data from state
    // dispatch(fetchTutors({ filters, tutorIds: results.map((tutor) => tutor._id) })); // Dispatch the fetchMoreTutors thunk
    dispatch(fetchMoreTutors({ ...filters, tutorIds: results.map((tutor) => tutor._id) })); // Dispatch the fetchMoreTutors thunk
  };
};