


import { PDFModel } from "../../../database/models/PDFs.model.js";
import { userModel } from "../../../database/models/user.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";


//==================1) add pdf=============================
export const addPdf = catchAsyncErr(async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({message:"invalid file"})
    }
    const { title } = req.body

    let users = await userModel.findById(req.user.user._id);
    if (users) {
        let pdfs = await PDFModel.insertMany({
            path: req.file.filename,
            title,
            createdBy: req.user.user._id
        });//users.role==admin OR teacher
        res.json({ message: "pdfs added Successfully", pdfs });
    } else {
        res.json({ message: "failed to add , Try Again ... " })
    }
})

//==================2) delete pdf=============================
export const deletePdf = catchAsyncErr(async (req, res) => {
    const { _id } = req.params;
    let pdfs = await PDFModel.findByIdAndDelete(_id);
    if (pdfs) {
        res.json({ message: "pdfs DELETED SUCCESSFULLY" });
    } else {
        res.json({ message: "INCORRECT id .. can't DELETE this pdf" });
    }
})

//==================3) get all pdfs =============================
export const getAllPdfs = catchAsyncErr(async (req, res) => {

    const allpdfs = await PDFModel.find()

    res.json({ message: "pdfs displayed successfuly", allpdfs })

})
