import { Request, Response } from "express";
import CertificateService from "../services/certificate.service";
import certificateModel from "../models/certificate.model";
import { message } from "antd";

export const uploadCertificate = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const addedBy = (req as any).user._id;

    // Make sure a file is uploaded
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Certificate image is required!" });
    }

    const imageUrl = req.file.path; // Path where file was stored by Multer

    const certificate = await CertificateService.create(
      title,
      imageUrl,
      addedBy
    );
    res.status(201).json({
      success: true,
      message: "Certificate uploaded successfully",
      data: certificate,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id; // ✅ get logged-in user ID
 console.log("Logged-in user:", userId);
    const certificates = await CertificateService.getByUser(userId);

    res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: (error as Error).message ,
    });
  }
};


export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await CertificateService.deleteById(id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateCertificate = async(req: Request, res: Response) =>{
  try {
     const{id} = req.params;
     const certificate = await certificateModel.findById(id);
     if(!certificate)return res.status(404).json({message:"Certificate not found"});
     //update title
     if(req.body.title) certificate.title = req.body.title;

     //update file if uploded
     if(req.file){
       certificate.imageUrl=`/uploads/certificates/${req.file.filename}`;
     }
     await certificate.save();
     res.status(200).json({data:certificate});
    } catch(err:any){
      res.status(500).json({message:err.message});
    }
  };
