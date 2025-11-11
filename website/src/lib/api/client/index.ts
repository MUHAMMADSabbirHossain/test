import { userClientApi } from "./user-api";

class ClientApi {
  public readonly user = userClientApi;
}

export const clientApi = new ClientApi();
