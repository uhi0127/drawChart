import express from 'express';
const app = express();
const port = 33132;

app.locals.pretty = true;
app.use(express.static('public'));

app.set('view engine','pug');

app.set('views', process.cwd() + '/views');
app.get('/',(req , res)=>{
   res.render('./index.pug');
});




// =======================================

// 해당 포트로 접속
app.listen(port,()=>{
   console.log(`${port} port Server Live...`)
})