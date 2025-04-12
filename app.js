const { configDotenv } = require('dotenv');
const express = require('express');
configDotenv();
const dbConnection = require('./config/connection');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
dbConnection();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/login',(req,res)=>{
    res.render('login');
})

app.use('/api/user',userRouter);
app.use('/api/post',postRouter);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`the server is running on http://localhost:${port}`);
})


