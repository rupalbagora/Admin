// import { Request, Response } from "express";
// import CertificateService from "../services/certificate.service";

// export const uploadCertificate = async (req: Request, res: Response) => {
//   try {
//     const { title } = req.body;
//     const addedBy = (req as any).user._id;
//     if (!req.file) return res.status(400).json({ success: false, message: "Certificate image is required!" });
//     const imageUrl = req.file.path;
//     const certificate = await CertificateService.create(title, imageUrl, addedBy);
//     res.status(201).json({ success: true, data: certificate });
//   } catch (error) {
//     res.status(500).json({ success: false, error: (error as Error).message });
//   }
// };

// export const getAllCertificates = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).user._id;
//     const certificates = await CertificateService.getByUser(userId);
//     res.status(200).json({ success: true, data: certificates });
//   } catch (error) {
//     res.status(500).json({ success: false, error: (error as Error).message });
//   }
// };

// export const deleteCertificate = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const deleted = await CertificateService.deleteById(id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Certificate not found" });
//     res.status(200).json({ success: true, message: "Certificate deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: (error as Error).message });
//   }
// };

// export const updateCertificate = async(req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const certificate = await CertificateService.getById(id);
//     if (!certificate) return res.status(404).json({ message: "Certificate not found" });

//     if(req.body.title) certificate.title = req.body.title;
//     if(req.file) certificate.imageUrl = req.file.path;

//     await certificate.save();
//     res.status(200).json({ data: certificate });
//   } catch(err: any) {
//     res.status(500).json({ message: err.message });
//   }
// };

import { Request, Response } from "express";
import CertificateService from "../services/certificate.service";
import path from "path";
export const uploadCertificate = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const addedBy = (req as any).user._id;

    if (!req.file)
      return res.status(400).json({ success: false, message: "Certificate image is required!" });

    // ✅ Build public URL instead of file path
    //const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
//        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
//const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${path.basename(req.file.filename)}`;
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
//const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;

    
    const certificate = await CertificateService.create(title, imageUrl, addedBy);

    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const certificates = await CertificateService.getByUser(userId);
    res.status(200).json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await CertificateService.deleteById(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Certificate not found" });
    res.status(200).json({ success: true, message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const certificate = await CertificateService.getById(id);
    if (!certificate) return res.status(404).json({ message: "Certificate not found" });

    if (req.body.title) certificate.title = req.body.title;

    if (req.file) {
      // ✅ Use public URL for updated image
      certificate.imageUrl = `${req.protocol}://${req.get("host")}/uploads/images/${req.file.filename}`;
    }

    await certificate.save();
    res.status(200).json({ data: certificate });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
