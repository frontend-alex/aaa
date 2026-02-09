import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "test", "production"],
        default: "development",
    }),
});


export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production";