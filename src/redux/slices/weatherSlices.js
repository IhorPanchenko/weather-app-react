import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeatherAction = createAsyncThunk(
  "weather/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${payload}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_KEY}`
      );
      return data;
    } catch (error) {
      if (!error && error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.weather = action && action.payload; //?
      state.loading = false;
      state.error = undefined;
    });

    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action && action.payload;
    });
  },
});

export default weatherSlice.reducer;
