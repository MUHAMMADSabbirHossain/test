class Config {
  private readonly _websiteName: string =
    process.env.WEBSITE_NAME ?? "Default Name";
  private readonly _websiteDescription: string =
    process.env.WEBSITE_DESCRIPTION ?? "Default Description";

  public property(key: string) {
    return this[`_${key}` as keyof this];
  }
}

const CONFIG = new Config();

export default CONFIG;
