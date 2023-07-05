const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Credentials",
      "enctype",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Methods",
      "Access-Control-allow-Credentials",
      "enctype",
    ],
    preflightContinue: false,
  })
);

const credentials = {
  apiKey: "f3e307f19cec365f7f4e1d581c292a6da337a29b98f1ec0bf4fcbd1b3a26e253",
  username: "nyaugenya",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// function sendSMS() {
  
//   const message = "thanks for contacting us";

//   const options = {
// // set the number as the phone number of request body

//     to:"+254757764865",
//     message: message,
//   };
//   sms
//     .send(options)
//     .then((response) => {
//       console.log("SMS ");
//     })
//     .catch((error) => {
//       console.error("error while trying to send SMS");
//     });
// }
// sendSMS();
 
app.post("/sms", (req, res) => {
  let { phone, text,email,name ,day } = req.body;
  
  const message = `Hello ${name} ,thank you for contacting us.For more information call 0757764865 or visit our website https://demo-pos1.vercel.app/ We shall contact you on ${day}` ;
  const options = {
    to: phone,

    message: message,
  };
  sms
    .send(options)
    .then((response) => {
      console.log("SMS ");
    })
    .catch((error) => {
      console.error("error while trying to send SMS");
    });
});



app.listen(3000, () => {
  console.log("server is running on port 3000");
});
