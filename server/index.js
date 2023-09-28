const express = require('express')
const mongoose = require('mongoose');
const socket=require('socket.io')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express()


const userRouter = require('./routes/user')
const agentRouter = require('./routes/agent')
const adminRouter = require('./routes/admin')
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(bodyParser.json({ limit: '10mb' }));
app.get('/test', (req, res) => {
  res.json('test')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const mongoURI = 'mongodb://0.0.0.0:27017/toorlocation';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB has been started successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/', userRouter)
app.use('/agent', agentRouter);

app.use('/admin', adminRouter)

 const server=app.listen(4000, console.log('running'));

 const io= socket(server,{
  cors:{
    origin: 'http://localhost:5173',
    credentials:true
  }
 })


 global.onlineUsers=new Map();


 
 io.on('connection', (socket)=>{
  global.chatsocket=socket;
  socket.on("addUser", (id)=>{
    onlineUsers.set(id, socket.id)
  })

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to); // Use "to" property instead of "io"
    console.log(sendUserSocket,"sendUserSocketsendUserSocketsendUserSocketsendUserSocket")
    if (sendUserSocket) {

      io.to(sendUserSocket).emit("msg-receive", data.message); // Use "io.to" instead of "socket.io"
    }
  });



 })