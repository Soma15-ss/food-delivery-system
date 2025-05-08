import axios from "axios";
import toast from "react-hot-toast";

const isErrorResponse = (error) => {
  return error && typeof error.message === "string";
};

const AxiosClient = async (args) => {
  const { toolkit, headers = {}, ...rest } = args;
  const token = localStorage.getItem("token");
  return axios({
    baseURL: process.env.REACT_APP_API_URL,
    ...rest,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "", // Attach token if it exists
      ...headers,
    },
  })
    .then((response) => toolkit.fulfillWithValue(response.data))
    .catch((error) => {
      if (error.response?.data && isErrorResponse(error.response.data)) {
        return toolkit.rejectWithValue(error.response.data);
      }
      return toolkit.rejectWithValue("An unknown error occurred");
    });
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = isErrorResponse(error.response?.data)
      ? error.response.data.message
      : "Something went wrong";

    // alert(errorMessage);
    toast.error(errorMessage)
    return Promise.reject(error.response?.data ?? "Something went wrong");
  }
);

export default AxiosClient;
