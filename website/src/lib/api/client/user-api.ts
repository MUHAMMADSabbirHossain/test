import axios from "axios";

class UserClientApi {
  async postUserRegister(args: { email: string; password: string }) {
    const response = await axios.post(`/api/v1/auth/register/admin`, args);
    const data = await response.data;

    return data;
  }
}

export const userClientApi = new UserClientApi();
