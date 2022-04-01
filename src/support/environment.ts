/*eslint @typescript-eslint/no-explicit-any: ["off"]*/

/**
 * Load production enviroment or use process.env.
 * NOTE: Cannot replace process.env values in production.
 * PLACE NO SECRETS IN env.js.
 * 
 * File is loaded in index.html.
    <script src="env.js"></script>
 * 
 * 1. Manually create / edit env.js
 *    Contents come from .env file.  See example below.
 * 
 * 2. Copy .env.js to deployed web server: D:\home\site\wwwroot\env.js
 
env.js:

var Env = {
  VUE_APP_API_ORGANIZATION: "flintstones",
  VUE_APP_API_PROJECT: "Fred"
};
 */

let env = process.env;
const windowEnv = loadEnvironmentFromWindow();

if (windowEnv) {
  env = windowEnv;
}

if (process.env.NODE_ENV === "production") {
  if (!windowEnv) {
    Debug.error(
      "Missing /env.js on server.  Manually deploy from .env converted to JSON"
    );
  }
}

function loadEnvironmentFromWindow() {
  const windowObj = window as any;

  if ("Env" in windowObj) {
    const windowEnv = windowObj["Env"] || null;
    if (windowEnv) {
      for (const key in env) {
        if (key in windowEnv) continue;
        windowEnv[key] = env[key];
      }
      return windowEnv;
    }
  }

  return null;
}

export const Env = env;
