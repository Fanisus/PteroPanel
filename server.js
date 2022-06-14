const express = require('express');
const https = require('https');
var multer = require('multer');
var upload = multer();
var cookies = require("cookie-parser");
const crypto = require('crypto');
const flaster = require('flaster-db');
const fs = require('fs');
const path = require('path');
const db = new flaster.Database('./Database', {
    deep: true,
    file: 'Database.json'
})
const key = fs.readFileSync('./sslkey.key');
const cert = fs.readFileSync('./sslcertificate.crt');
const app = express()




//const server = https.createServer({ key: key, cert: cert }, app);
const PORT = process.env.PORT || 3054;
app.use(upload.array());
app.use(cookies());

const authTokens = {};

// var re = /(?<={).+?(?=})/g;
// var s = '[description:"aoeu" uuid:"123sth"]{';
// var m;

// do {
//     m = re.exec(s);
//     if (m) {
//         console.log(m[0]);
//     }
// } while (m);
app.use(async (req, res, next) => {
    if (req.method === 'GET') {
        // if (req.url === '/login') {
        //     let authToken;
        //     try {
        //         authToken = req.cookies['authToken'];
        //     } catch (error) {

        //     }
        //     console.log(authTokens[authToken]);
        //     if (authTokens[authToken] != undefined || authTokens[authToken] != null) {
        //         console.log("auth")
        //         setTimeout(() => {
        //             res.redirect("/home");
        //         }, 2000);
        //     } else {
        //         next()
        //     }
        // }
        if (req.url === "/") req.url = "/index";
        fs.readdirSync('./public/html').forEach(async (file) => {
            if (req.url.substring(1) === file.split('.')[0]) {
                let data = fs.readFileSync("./public/html/" + file, { encoding: 'utf8' });
                let regex = /(?<=\().+?(?=\))/g;
                let group;
                do {
                    group = regex.exec(data)
                    if (group) {
                        console.log(group[0])
                        if (group[0].toLowerCase() === "creditusage") {
                            // Requires Implementation
                            data = data.replace("(" + group[0] + ")", await db.get(`09rfanisus@gmail.com;${group[0]}`)) // \[(.*?)\]
                        } 
                        else data = data.replace("(" + group[0] + ")", await db.get(`09rfanisus@gmail.com;${group[0]}`))
                    }
                } while (group)
                fileName = file.split(".")[0]
                res.writeHead(200, { 'Content-Type': 'text/html' }).end(data);
            }
        })
        if (req.url.match("\.css$")) {
            fs.readdirSync('./public/css').forEach((file) => {
                if (req.url.substring(1).match(file.split(".")[0])) {
                    fs.createReadStream("./public/css/" + file).pipe(res);
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                }
            })
        }
        else if (req.url.match("\.js$")) {
            fs.readdirSync('./public/js').forEach((file) => {
                if (req.url.substring(1).match(file.split(".")[0])) {
                    fs.createReadStream("./public/js/" + file).pipe(res);
                    res.writeHead(200, { "Content-Type": "text/javascript" });
                }
            })
        }
        else if (req.url.match("\.png$")) {
            fs.readdirSync('./public/img').forEach((file) => {
                if (req.url.substring(1).match(file.split(".")[0])) {
                    fs.createReadStream("./public/img/" + file).pipe(res);
                    res.writeHead(200);
                }
            })
        }
        next()
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
    else {

        next()
    }
});
// app.use(express.static('public', { dotfiles: "deny", extensions: ["html"] }));


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