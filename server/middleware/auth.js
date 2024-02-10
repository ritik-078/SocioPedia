import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        // Get token from header
        let token = req.header("Authorization");

        if(!token)
            res.status(403).json({msg : "Access Denied"});
        
        if(token.startsWith("Bearer")){
            token = token.slice(7, token.length);
        }
        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({error : error.message});
    }

}