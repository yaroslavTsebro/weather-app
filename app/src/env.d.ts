declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PORT: string;

    DB_USER: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: number;
    WEATHER_API_KEY: string;
  }
}
