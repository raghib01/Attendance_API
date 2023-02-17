const express = require('express');
const db = require('./db');
const privateRoute= require('./middleware/authMiddleware'); 
const routes = require('./router/indexRouter');
const app = express()

app.use(express.json());
//using all router
app.use(routes);


app.get('/', (_req, res) => {
    const obj = {
        name: `rakibul islam`,
        email: 'rg.ragib69@gmail.com'
    }
    res.json(obj)
})

app.get('/private', privateRoute,  async(req,res)=>{
    //get private routing system....
    // console.log(`I am user`, req.user);
    return res.status(200).json({message: `its privet route.`});

});

app.get('/public', async(req, res)=>{
    return res.status(200).json({message: `its is public route`})
})

app.use((err, req, res, next)=> {
    console.log(err)
    const message = err.message ? err.message : 'Server Error Occurred';
    const status = err.status ? err.status: 500;
    res.status(status).json({message});
});

db('mongodb://localhost:27017/Attendence-db').then(()=> {
 console.log(`Database connected`);
 app.listen(4040, ()=> {
    console.log(`server listening port 4040`);
 });
}).catch((e)=> {
    console.log(e)
 });