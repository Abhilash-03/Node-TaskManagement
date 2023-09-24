const express = require('express');
const app = express();
const path = require('path');
const tasks = require('./routes/tasks');
const notFound = require('./middleware/notFound');

// connected to database...
const connectDB =  require('./db/connection');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/api/v1/tasks', tasks);

app.use(notFound);
app.use(errorHandler);

const start = async() => {
       try{
            await connectDB(process.env.MONGO_URI);
            app.listen(PORT, ()=> console.log(`Server listening at port ${PORT}...`));

       } catch(err){
              console.log(err);
       }
}

start();