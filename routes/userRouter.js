const router = require("express").Router();
const User = require("../Models/userModel");
const jwt= require("jsonwebtoken");
// router.get("/test", (req,res)=>{
//     res.send("hello it works")
// });

router.post("/register", async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "not all field are entered" });

    const existingUser = await User.findOne({ username: username });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "account with this username already exists." });
    
        if(!displayName) displayName=username;

        //for ditch hashing and adding the user
        const newUser= new User({
            username,
            password,
            displayName
        })

        const savedUser= await newUser.save()
        res.json(savedUser)

  } catch (err) {
      console.log(err)
    res.status(500).json({ error: err });
  }
});


router.post("/login", async(req, res)=>{
    try{
        //revalidate
        const { username, password, displayName } = req.body;
        if (!username || !password)
            return res.status(400).json({ msg: "not all field are entered" });
        
        const user= await User.findOne({username:username})
        if(!user)
        return res.status(400).json({ msg: "no account with this username" });

        const isMatch= (password===user.password?true: false)

        if(!isMatch)
        return res.status(400).json({ msg: "invalid credentials" });
        
        const token= jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({
            token,
            user:{
                id: user._id,
                displayName:user.displayName
            }
        })


    }catch (err) {
        console.log(err)
      res.status(500).json({ error: err });
    }
})

module.exports = router;
