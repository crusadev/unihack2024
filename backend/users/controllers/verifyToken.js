const jwt = require("jsonwebtoken");

const verifyToken = async (req,res,next) => {
    const auth = req.headers.authorization;
        if(auth){
            jwt.verify(auth,process.env.JWT_PHRASE,(err,user) => {
                err ? res.status(401).json("Token not valid") : req.user = user;
                next();
            })
        }else{
            res.status(401).json("Auth error")
        }
}

const verifyTokenAndAuthorize = (req,res,next) => {
    verifyToken(req,res,() => {
        if (req.user.id === req.params.id || req.user.isAdmin || req.user.id === req.body.userId){
            next();
        }else{
            res.status(403).json("Unauthorized");
        }
    })
}

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,() => {
        if (req.user.isAdmin){
            next();
        }else{
            res.status(403).json("Unauthorized");
        }
    })
}


module.exports = {verifyTokenAndAuthorize,verifyTokenAndAdmin};