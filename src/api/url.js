import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//https://evacuation-uep.herokuapp.com/\
//https://dfssd232.herokuapp.com
const instance = axios.create({
  baseURL: "https://dfssd232.herokuapp.com",
});

//n dd tanan na request maagi muna dd cn na config
//pinaka middleware
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
