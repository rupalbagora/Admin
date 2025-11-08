import ProductPackage, { IProductPackage } from "../models/productPackage.model";
import { CreateProductPackageDto, UpdateProductPackageDto } from "../dtos/productpackage.dto";

const create = async (data: CreateProductPackageDto): Promise<IProductPackage> => {
  const newPackage = new ProductPackage(data);
  return await newPackage.save();
};

const getAll = async (userId: string): Promise<IProductPackage[]> => {
  return await ProductPackage.find({ addedBy: userId }).sort({ createdAt: -1 });
};

const getById = async (id: string): Promise<IProductPackage | null> => {
  return await ProductPackage.findById(id);
};

const updateById = async (id: string, data: UpdateProductPackageDto): Promise<IProductPackage | null> => {
  return await ProductPackage.findByIdAndUpdate(id, data, { new: true });
};

const deleteById = async (id: string): Promise<IProductPackage | null> => {
  return await ProductPackage.findByIdAndDelete(id);
};

export default { create, getAll, getById, updateById, deleteById };
