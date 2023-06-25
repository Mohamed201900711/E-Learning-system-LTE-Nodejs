const methods = ["body", "headers","params","query params"];


export const validation =(schema)=>{
  return(req,res,next)=>{
    let err=[]
    methods.forEach(value=>{
      if(schema[value]){
        let { error } = schema[value].validate(req[value], { abortEarly: false })
        if(error){
          err.push(error?.details)
        }
      }
    })
    if(!err.length){
      next()
    }else{
      res.json(err)
    }
  }
}