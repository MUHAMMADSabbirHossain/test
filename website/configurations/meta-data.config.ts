class MetaDataConfig {
  private readonly _author: string = "Default Author";
  private readonly _version: string = "1.0.0";

  public property(key: string) {
    return this[`_${key}` as keyof this];
  }
}

const META_DATA_CONFIG = new MetaDataConfig();

export default META_DATA_CONFIG;
