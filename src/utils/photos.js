import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';


export const photoUpload = (filedName) => {

  const storage = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, 'uploadPhotos/')
    },

    filename: (req, file, cb) => {
      console.log(file);
      cb(null, uuidv4() + "-" + file.originalname)

    }
  })
  function fileFilter (req, file, cb) {
    if(file.mimetype.startsWith("image")){
      cb(null, true)     //cb to check if thre any errors or not

    }else {
      cb(null, false)
    }
  
  }
  const upload = multer({ storage,fileFilter})

  return upload.single(filedName)

}
//array -- req.files 
//single -- req.file 

//image (controller/router/validation)+in utilities