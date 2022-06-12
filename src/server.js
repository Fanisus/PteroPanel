const express = require('express');
const https = require('https');
var multer = require('multer');
var upload = multer();
var cookies = require("cookie-parser");
const crypto = require('crypto');
const flaster = require('flaster-db');
const fs = require('fs');
const path = require('path');
const db_users = new flaster.Database('./Database', {
    deep: true,
    file: 'authentication.json'
})
const key = fs.readFileSync('./sslkey.key');
const cert = fs.readFileSync('./sslcertificate.crt');
const app = express()

//const server = https.createServer({ key: key, cert: cert }, app);
const PORT = process.env.PORT || 3054;
app.use(upload.array());
app.use(cookies());

const authTokens = {};


app.use(async (req, res, next) => {
    if (req.method === 'GET') {
        if (req.url === '/login') {
            let authToken;
            try {
                authToken = req.cookies['authToken'];
            } catch (error) {

            }
            console.log(authTokens[authToken]);
            if (authTokens[authToken] != undefined || authTokens[authToken] != null) {
                console.log("auth")
                setTimeout(() => {
                    res.redirect("/home");
                }, 2000);
            } else {
                next()
            }
        }
        else next()
    }
    else if (req.method === 'POST') {
        if (req.url === '/login') {
            const email = req.body.email;
            const password = req.body.password;
            let userUUIDIndex = 0;
            while (await db_users.has("users." + (userUUIDIndex + 1).toString())) {
                userUUIDIndex++;
                console.log(userUUIDIndex + " ID")
                if (await db_users.get("users." + userUUIDIndex + ".email") === email) {
                    let _email = await db_users.get("users." + userUUIDIndex + ".email");
                    if (await db_users.get("users." + userUUIDIndex + ".password") != password) return res.status(401).send("Password incorrect");
                    const authToken = generateAuthToken();
                    authTokens[authToken] = email;
                    res.cookie('authToken', authToken, { maxAge: 1000 * 60 * 60 * 24 * 7, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
                    res.redirect('/home')
                    userUUIDIndex = "Just to show false lol";
                }
            }
        }
    }
    else next()
});
app.use(express.static('public', { dotfiles: "deny", extensions: ["html"] }));

app.get('/', (req, res) => {
    console.log("Hi")
})
// app.post('/login', async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
//     console.log(email, password);
//     let _email = await db_users.get("09rfanisus@gmail.com");
//     console.log(_email);
//     if (!await db_users.has(email)) return res.status(401).send("User not found");
//     if (_email != password) return res.status(401).send("Password incorrect");
//     const authToken = generateAuthToken();
//     authTokens[authToken] = email;
//     res.cookie('authToken', authToken, { maxAge: 1000 * 60 * 60 * 24 * 7, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
//     res.redirect('/home')
// })

// app.get('/login', (req, res) => {
//     let authToken;
//     try {
//         authToken = req.cookies.authToken;

//     } catch (error) {

//     }
//     console.log("post")
//     if (new Map(authTokens).has(authToken)) {
//         setTimeout(() => {
//             res.redirect('/home');
//         }, 2000);
//     } else res.end()
// })

// app.use((req, res, next) => {
//     try {
//         const authToken = req?.cookies['authToken'];
//         req.user = authTokens[authToken];
//         next();
//     } catch (e) {
//     }
// })
function generateAuthToken() {
    return crypto.randomBytes(32).toString('hex');
}

setInterval(() => {
    console.log(authTokens);
}, 10000);





app.listen(PORT, () => {
    console.log('Server connected at:', PORT);
});

// server.listen(PORT, () => {
//     console.log('Server connected at:', PORT);
// })
//server.listen(PORT)
// app.listen = function(port) {
//     server.listen(port);
//     console.log('info', "COTTONMOUTH server listening on port " + port);
// };