let http = require("http");
let fs = require("fs");
let nodemailer = require("nodemailer");
let { parse } = require("querystring");
require("dotenv").config();
const { EAMIL, PASS } = require("./Config/auth");

let server = http.createServer((req, res) => {
  if (req.method === "POST") {
    //?content type
    let FORM_URLENCODED = "application/x-www-form-urlencoded";
    if (req.headers["content-type"] === FORM_URLENCODED) {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", (_) => {
        let email = parse(body.valueOf()).email;
        res.end(
          parse(body.valueOf()).email + `Thank you for your subscription`
        );
        //?nodemailer block
        let transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: EAMIL,
            pass: PASS,
          },
        });
        let mailOption = {
          from: "anonsurf@gmail.com",
          to: `${email}`,
          subject: "Successfully Subscribed to Us",
          html: `<h2>Thank You For Subscribe </h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, dolor?</p>
          <button>Join Us</button>
          `,
        };
        transport.sendMail(mailOption, (err) => {
          if (err) throw err;
          console.log("Successfuly mail send");
        });
      });
    } else {
      res.end(null);
    }
  } else {
    fs.createReadStream("index.html", { encoding: "utf-8" }).pipe(res);
  }
});
//?start server
server.listen(process.env.PORT || 4000, (err) => {
  if (err) throw err;
  console.log("Server is up and running at port 3000");
});
// let http = require("http"); //core module
// let fs = require("fs"); //core module
// const { parse } = require("querystring"); //core module
// let nodemailer = require("nodemailer"); //third party module

// let server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     //content -type
//     let FORM_URLENCODED = "application/x-www-form-urlencoded";
//     if (req.headers["content-type"] === FORM_URLENCODED) {
//       let body = "";
//       req.on("data", (chunk) => {
//         body += chunk.toString();
//       });

//       req.on("end", (_) => {
//         res.end(parse(body.valueOf()).email);
//       });
//     } else {
//       res.end(null);
//     }
//   } else {
//     fs.createReadStream("index.html", { encoding: "utf-8" }).pipe(res);
//   }
// });

// let PORT = 5000;
// server.listen(PORT, (err) => {
//   if (err) throw err;
//   console.log("server is running on port number " + PORT);
// });
