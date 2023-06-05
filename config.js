// import Session from "supertokens-node/recipe/session";
// import EmailPassword from "supertokens-node/recipe/emailpassword";
let Session = require("supertokens-node/recipe/session");
let EmailPassword = require("supertokens-node/recipe/emailpassword");

export const SuperTokensConfig = {
    framework: "express",
    supertokens: {
        connectionURI: "https://dev-ee015771a30611edb89c355baa724262-ap-southeast-1.aws.supertokens.io:3573",
        apiKey: "LQOnljLXUz7OybalSEORMUWjoYdZ=n",
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "KMRL APP",
        apiDomain: process.env.API_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
}
