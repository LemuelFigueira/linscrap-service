
// node env typings
declare namespace NodeJS {
  interface ProcessEnv {
    APP_LINKEDIN_COOKIE: string;
    APP_LINKEDIN_URL: string = "https://www.linkedin.com";
    APP_LINKEDIN_PROFILE_EXPERIENCE_PATH: string = "/detail/experience";
  }
}