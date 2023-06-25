import { photoModel } from "../../../database/models/photos.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";


//==================1) add photo=============================
export const addPhoto = catchAsyncErr(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({message:"invalid file"})
    }
    const { title } = req.body

    let users = await userModel.findById(req.user.user._id);
    if (users) {
        let photos = await photoModel.insertMany({
            path: req.file.filename,
            title,
            createdBy: req.user.user._id
        });//users.role==admin OR teacher
        res.json({ message: "photos added Successfully", photos });
    } else {
        res.json({ message: "failed to add , Try Again ... " })
    }
})

//==================2) delete photo=============================
export const deletePhoto = catchAsyncErr(async (req, res) => {
    const { _id } = req.params;
    let photos = await photoModel.findByIdAndDelete(_id);
    if (photos) {
        res.json({ message: "photo DELETED SUCCESSFULLY" });
    } else {
        res.json({ message: "INCORRECT id .. can't DELETE this photo" });
    }
})

//==================3) get all photos =============================
export const getAllPhotos = catchAsyncErr(async (req, res) => {

    const allPhotos = await photoModel.find()

    res.json({ message: "photos displayed successfuly", allPhotos })

})
