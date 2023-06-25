import { catchAsyncErr } from "../utils/catchErr.js"

export const allowedTo=(...roles)=>{
     return catchAsyncErr(async(req,res,next)=>{
        if(!roles.includes(req.user.user.role)){
            res.status(403).json({message:"you are not authorized you are ==> "+req.user.user.role})
        }
        else {
            next ()
        }
     })
}