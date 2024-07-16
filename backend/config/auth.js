const jwt = require('jsonwebtoken')
exports.authenticated = async(req,res,next)=>{
    try {
        const token = req.cookies['token'];
        // console.log(token);
        if(!token){
            return res.status(500).json({
                success : false,
                message : "token not found"
            })
        }
        try {
            const decoded = jwt.verify(token,process.env.SECRET_KEY);
            req.user = decoded;
            // console.log(decoded);
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "Error while verifying the JWT token"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "error while authenticated..."
        })
    }

}