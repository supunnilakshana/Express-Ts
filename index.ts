import express,{Express,Request,Response } from "express";
const app = express();


const port =8000;
//  const www = process.env.WWW || './';


//  
//  console.log(`serving ${www}`);


 app.get('/', (req:Request, res:Response) => {
    res.send("hellowww  ffff ddds");
 });
 app.get('/e', (req:Request, res:Response) => {
   res.send("hellowww  ffff dddss");
});
app.get('/n', (req:Request, res:Response) => {
   res.send("hellowww  ffff dddss");
});
 app.listen(port, () => console.log(`listening on http://localhost:${port}`));
 