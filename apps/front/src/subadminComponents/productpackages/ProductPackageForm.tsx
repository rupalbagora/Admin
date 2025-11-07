import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { IProductPackage } from "../../redux/types/subadmintypes/ProductPackage.types";
import API from "../../api/axios";

interface ProductPackageFormProps {
  onSuccess: () => void;
  packageToEdit?: IProductPackage;
}

const { TextArea } = Input;

const ProductPackageForm: React.FC<ProductPackageFormProps> = ({ onSuccess, packageToEdit }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (packageToEdit) {
      form.setFieldsValue({
        ...packageToEdit,
        items: packageToEdit.items.join(", "),
        price: packageToEdit.price,
      });

      if (packageToEdit.image) {
        setFileList([{ url: packageToEdit.image, name: "image.jpg" }]);
        setPreviewImage(packageToEdit.image);
      }
    }
  }, [packageToEdit]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("tagline", values.tagline);
      formData.append("price", values.price);
      formData.append("review", values.review || "No review yet");
      formData.append("description", values.description);
      formData.append("items", values.items.split(",").map((i: string) => i.trim()));
      formData.append("offers", values.offers || "");
      formData.append("usage", values.usage);
      formData.append("gender", "male");

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      if (packageToEdit?._id) {
        await API.put(`/product-packages/${packageToEdit._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Package updated successfully");
      } else {
        await API.post("/product-packages", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Package added successfully");
      }

      form.resetFields();
      setFileList([]);
      setPreviewImage(null);
      onSuccess();
    } catch (err: any) {
      console.error(err);
      message.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.Item label="Package Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Enter package name" />
      </Form.Item>

      <Form.Item label="Tagline" name="tagline" rules={[{ required: true }]}>
        <Input placeholder="Enter tagline" />
      </Form.Item>

      <Form.Item label="Review" name="review">
        <TextArea placeholder="Enter review" />
      </Form.Item>

      <Form.Item label="Description" name="description" rules={[{ required: true }]}>
        <TextArea placeholder="Enter description" />
      </Form.Item>

      <Form.Item label="Items" name="items" rules={[{ required: true }]}>
        <Input placeholder="Enter items separated by comma" />
      </Form.Item>

      <Form.Item label="Usage Instructions" name="usage" rules={[{ required: true }]}>
        <TextArea placeholder="Describe usage" />
      </Form.Item>

      <Form.Item label="Offers" name="offers">
        <Input placeholder="e.g., Save ₹200 on combo" />
      </Form.Item>

      <Form.Item label="Price" name="price" rules={[{ required: true }]}>
        <InputNumber min={0} className="w-full" placeholder="Enter price (₹)" />
      </Form.Item>

      <Form.Item label="Image">
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => false}
          onChange={(info) => setFileList(info.fileList)}
        >
          {fileList.length === 0 && <div><UploadOutlined /> Upload</div>}
        </Upload>
        {previewImage && <img src={previewImage} alt="Preview" className="w-full h-32 object-cover mt-2" />}
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          {packageToEdit ? "Update Package" : "Add Product Package"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductPackageForm;
