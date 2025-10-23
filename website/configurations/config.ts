import ENV_CONFIG from "./env.config";
import META_DATA_CONFIG from "./meta-data.config";

class Config {
  public readonly env = ENV_CONFIG;
  public readonly metaData = META_DATA_CONFIG;
  public readonly serverBaseUrl = "http://localhost:5000/api";
}

const CONFIG = new Config();

export default CONFIG;
