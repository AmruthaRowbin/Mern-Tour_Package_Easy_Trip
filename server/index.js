const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express()


const userRouter = require('./routes/user')
const agentRouter = require('./routes/agent')
const adminRouter = require('./routes/admin')
app.use(cors())
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

app.listen(4000, console.log('running'));