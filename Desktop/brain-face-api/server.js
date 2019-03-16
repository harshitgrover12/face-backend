const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors')
app.use(bodyParser.json());
app.use(cors());
const database={

users:[
{
	id:'123',
	email:'harshitgrover12@gmail.com',
	password:'123',
	name:'harshitgrover',
	rollNo:101703223,
	DOB:new Date()
},
{
	id:'124',
    email:'harshitgrover13@gmail.com',
    password:'345',
	name:'harshitgr',
	rollNo:1017032,
	DOB:new Date()
}

	]
}
app.get('/',(req,res)=>
{
	res.send(database.users);
})
app.post('/signin',(req,res)=>
{
	if(req.body.email===database.users[0].email&&req.body.password===database.users[0].password)
		{res.json('success');}
	else
		{res.status(400).json('error in logging in');}
})
app.post('/register',(req,res)=>
{
	
	const{id,email,password,name}=req.body;
	bcrypt.hash(password, null, null, function(err, hash) {
		console.log(hash);
		
	});
	database.users.push(
	{
id:'123',
email:email,
password:password,
name:name,
rollno:102303,
DOB:new Date()
}

	)

	res.json(database.users[database.users.length-1]);
})
app.get('/profile/:id',(req,res)=>{
	const{id}=req.params;
	let flag=false;
	database.users.forEach(user=>{
		console.log(user.id);
		if(user.id===id)
		{
			flag=true;
			return res.json(user);
		}
	})
	if(!flag)
	{
		return res.json("not found");
	}
})



app.listen(3000);
