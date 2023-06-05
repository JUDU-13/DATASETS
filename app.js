var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let cors = require("cors");
// let {SuperTokensConfig} = require("./config")
let supertokens = require("supertokens-node")
let {middleware} = require("supertokens-node/framework/express");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const Session = require("supertokens-node/recipe/session");

supertokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "https://dev-ee015771a30611edb89c355baa724262-ap-southeast-1.aws.supertokens.io:3573",
        apiKey: "LQOnljLXUz7OybalSEORMUWjoYdZ=n",
    },
    appInfo: {
        // learn more about this on https://supertokens.com/docs/session/appinfo
        appName: "KMRL APP",
        apiDomain: "http://localhost:3000/",
        websiteDomain: "http://localhost:3001/",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        EmailPassword.init(), // initializes signin / sign up features
        Session.init() // initializes session features
    ]
});
var app = express();

app.use(cors({
    origin: true,
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));
app.use(middleware());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(errorHandler())

module.exports = app;
