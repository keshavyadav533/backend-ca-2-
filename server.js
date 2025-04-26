const express= require('express');
const app= express();
app.use(express.json());

const port= 8080;

const users= [
    {email : "alice@gmail.com", password: "alice123"},
    {email : "bob@gmail.com", password: "bob123"}
]

app.get('/', (req,res)=>{
    res.send(users);
})

app.put('/user/:email', (req,res)=>{
    const email= req.params.email;
    const updateData= req.body;

    const find= users.find(u => u.email === email);

    if(!find){
        return res.send({ message : "Email not found"})
    }
    
    find.email= updateData.email || find.email;
    find.password= updateData.password || find.password;

    res,send({ message : "Data updated successfully..!"})
})


app.delete('/user/:email', (req,res)=>{
    const email= req.params.email;

    const ind= users.findIndex(u => u.email === email);

    if(ind === -1){
        return res.send({ message : "Email not found"})
    }
    
    users.splice(ind,1);

    res.send({ message : "User deleted successfully..!"})
})


app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})