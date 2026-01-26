import express from 'express';
const router = express.Router();

const USERS = [{id:1, name:"Alice"},{id:2,name:'Bob'}];
router.get('/',(req,res)=> {
	res.json(USERS);
});
router.get('/:id',(req,res)=>{
	const _id = req.params.id;
	const {name,id} = USERS.find(u=> u.id == _id);
	res.send(`<h1>User</h2><h3>Name: <strong>${name}</string></h3><h3>ID: ${id}</h3>`);
});



export default router;
