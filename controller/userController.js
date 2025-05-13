const User = require ('../model/userModel');

exports.createProduct = (req,res) => {
    const { name, email } = req.body;
    
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "User fields are empty" });
        }
    
        const newUser = new User({ name, email });
        
        newUser.save()
               .then(() => res.status(201).json({ success: true, message: "User created successfully" }))
               .catch(err => res.status(500).json({ success: false, message: "Internal server error", error: err }));
}