import { userModel } from "../../../database/models/user.model.js";
import { videoModel } from "../../../database/models/videos.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";


//==================1) add video=============================
export const addvideo = catchAsyncErr(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({message:"invalid file"})
    }
    const { title } = req.body

    let users = await userModel.findById(req.user.user._id);
    if (users) {
        let videos = await videoModel.insertMany({
            path: req.file.filename,
            title,
            createdBy: req.user.user._id
        });  //users.role==admin OR teacher
        res.json({ message: "video added Successfully", videos });
    } else {
        res.json({ message: "failed to add , Try Again ... " })
    }
})

//==================2) delete video=============================
export const deletevideo = catchAsyncErr(async (req, res) => {
    const { _id } = req.params;
    let videos = await videoModel.findByIdAndDelete(_id);
    if (videos) {
        res.json({ message: "video DELETED SUCCESSFULLY" });
    } else {
        res.json({ message: "INCORRECT id .. can't DELETE this video" });
    }
})

//==================3) get all videos =============================
export const getAllvideos = catchAsyncErr(async (req, res) => {

    const allvideos = await videoModel.find()

    res.json({ message: "video displayed successfuly", allvideos })

})
