class AppConfig {
  private readonly appName: string;
  private readonly appVersion: string;
  constructor() {
    this.appName = process.env.APP_NAME!;
    this.appVersion = process.env.APP_VERSION!;
  }

  get AppName() {
    return this.appName;
  }
  get AppVersion() {
    return this.appVersion;
  }
}

const appConfig = new AppConfig();

export { appConfig };
