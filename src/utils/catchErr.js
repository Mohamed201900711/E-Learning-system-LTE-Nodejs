
export const catchAsyncErr=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch((error)=>{
            //res.json(error)
            next(error)
        })
    }
  }

