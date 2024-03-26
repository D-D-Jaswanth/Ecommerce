const jwt = require('jsonwebtoken')

const requireSignIn = async (req, res, next) => {
    try{
        let token = req.header('x-token');
        if(!token){
            return res.status(400).send("Token Not Found")
        }
        let decode = jwt.verify(token, 'jwtSecret')
        req.user = decode.user
        next();
    }
    catch(err){
        return res.status(500).send("Invalid Token")
    }
}

// const isAdmin = async (req, res, next) => {
    
//     try{

//         const user = await RegisterModel.findById(req.user.id)
//         if(user.role != 1){
//             return res.status(500).send('UnAuthorized Access')
//         }
//         else{
//             next();
//         }
//     }
//     catch(err){
//         return res.status(500).send('Error in checking in admin access')
//     }
// }

module.exports = { requireSignIn }