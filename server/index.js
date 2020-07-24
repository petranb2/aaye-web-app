const express = require("express");
var session = require("express-session");
let User = require("./userModel");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");
var bodyParser = require("body-parser");
var morgan = require('morgan')
const app = express();
const port = 3001;

//passport auth system
//passport login local login system
passport.serializeUser(function (user, done) {
    console.log('in serializeUser method user:' + user);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    console.log('in deserializeUser method id:' + id);
    User.findById(id + '', function (err, user) {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy(function (username, password, done) {
        if (!password) {
            return done(null, false, { message: "no password " });
        }
        console.log("in local strategy");
        console.log('username:' + username);
        console.log('password:' + password);
        User.findByUsername(username, function (err, user) {
            if (err) {
                return done(err);
            }
            console.log(user);
            if (!user) {
                console.log("no user found");
                return done(null, false, { message: "Incorrect username." });
            }
            bcrypt.compare(password, user.password).then(function (res) {
                // res == true
                console.log('compare pass:' + res);
                if (!res) {
                    return done(null, false, { message: "Incorrect password." });
                } else {
                    return done(null, user);
                }
            });
        });
    })
);
//

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
//logger
app.use(morgan('dev'));

app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        secret: "eae5bab1727ee3e2ad6b33b8b2261d6a",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

app.get("/users", (req, res) => {
    User.getAllUsers(function (err, data) {
        if (err) { console.log(err) }
        res.send(data);
    });
});

app.post("/newUser", (req, res) => {
    let email = req.body.email;
    let pass = req.body.password;
    let name = req.body.name;
    let surname = req.body.surname;
    let user = new User();
    user.email = email;
    user.password = pass;
    user.name = name;
    user.surname = surname;
    user.date_crd = new Date();
    console.log(req.body);
    user.save(function (err) {
        if (err) {
            console.log(err.message);
            res.send({
                error: err.message
            })
            return;
        }
        res.send({
            success: true
        })
        return;
    })
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status('401').send({ loggedIn: false, msg: "fail" }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send({ loggedIn: true, msg: "success" });
        });
    })(req, res, next);
});

app.get('/logout', (req, res) => {
    console.log('logout');
    req.logout();
    res.send({ auth: false });
});

app.get("/checkAuth", (req, res) => {

    if (req.isAuthenticated()) {
        //console.log(req.user);
        console.log('user is authenticated')
        res.send({ auth: true });
        return
    }
    console.log('user not authenticated')
    res.send({ auth: false });
});

app.listen(port, () =>
    console.log(`Backend app listening at http://localhost:${port}`)
);