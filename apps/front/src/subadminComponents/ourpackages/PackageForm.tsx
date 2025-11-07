import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, message, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import API from "../../api/axios";

interface PackageFormProps {
  packageData?: any;
  onSuccess: (pkg: any) => void;
  onCancel: () => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ packageData, onSuccess, onCancel }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (packageData) {
      form.setFieldsValue(packageData);

      if (packageData.image) {
        setFileList([
          {
            uid: "-1",
            name: "Current Image",
            status: "done",
            url: packageData.image,
          },
        ]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [packageData]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("price", String(values.price));
      formData.append("services", values.services); // string
      formData.append("about", values.about);
      formData.append("discount", values.discount || "");
      formData.append("review", String(values.review || 0));
      formData.append("rating", String(values.rating || 0));
      formData.append("gender", "male"); // fixed gender

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      let res;
      if (packageData?._id) {
        res = await API.put(`/packages/${packageData._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await API.post("/packages/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      onSuccess(res.data.data);
      form.resetFields();
      setFileList([]);
    } catch (err) {
      console.error(err);
      message.error("Failed to save package");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item name="title" label="Title" rules={[{ required: true, message: "Title is required" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="price" label="Price" rules={[{ required: true, message: "Price is required" }]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="services"
        label="Services"
        rules={[{ required: true, message: "Services is required" }]}
      >
        <Input placeholder="Enter services as comma separated text" />
      </Form.Item>

      <Form.Item name="about" label="About" rules={[{ required: true, message: "About is required" }]}>
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item name="discount" label="Discount">
        <Input />
      </Form.Item>

      <Form.Item name="review" label="Review">
        <InputNumber min={0} max={5} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="rating" label="Rating">
        <InputNumber min={0} max={5} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Image">
        <Upload
          listType="picture"
          maxCount={1}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false} // prevent auto upload
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            {packageData ? "Update" : "Add"} Package
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;

