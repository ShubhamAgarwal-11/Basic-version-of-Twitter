require('dotenv').config({path : "./.env"});
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const cors = require('cors');
// database function calling (database connected.)
require('./config/database')();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin : "http://localhost:3000",
    credentials : true
}
app.use(cors(corsOptions));

// routers mounting.
app.use('/api/v1/user',require('./routers/userRouter'))
app.use('/api/v1/tweet',require('./routers/tweetRouter'));

app.listen(port , ()=>{
    console.log("🚀Server is running on port", port);
})