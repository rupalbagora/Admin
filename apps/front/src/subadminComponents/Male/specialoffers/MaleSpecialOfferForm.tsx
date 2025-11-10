import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  DatePicker,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

export interface SpecialOffer {
  _id?: string;
  title: string;
  discount: number;
  date: string;
  description: string;
  gender: string;
  imageUrl?: string;
}

interface MaleSpecialOfferFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: SpecialOffer | null;
  loading?: boolean;
}

const MaleSpecialOfferForm: React.FC<MaleSpecialOfferFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        discount: Number(initialData.discount),
        date: dayjs(initialData.date),
        description: initialData.description,
      });

      setFileList(
        initialData.imageUrl
          ? [
              {
                uid: "-1",
                name: "Existing Image",
                status: "done",
                url: initialData.imageUrl,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      
      // Append all fields - gender fixed as "Male"
      formData.append("title", values.title);
      formData.append("discount", values.discount.toString());
      formData.append("date", values.date.format("YYYY-MM-DD"));
      formData.append("description", values.description);
      formData.append("gender", "Male"); // ✅ Fixed as Male

      // Append image if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      onSubmit(formData, initialData?._id);
    } catch (error) {
      message.error("Something went wrong while saving the male offer");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title={
        <span>
          {/* <ManOutlined style={{ marginRight: 8 }} /> */}
          {initialData ? "Edit Male Offer" : "Add Offer"}
        </span>
      }
      open={visible}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText={initialData ? "Update Male Offer" : "Add Offer"}
      confirmLoading={loading}
      destroyOnClose
      width={600}
    >
      

      <Form 
        form={form} 
        layout="vertical" 
        onFinish={handleFinish}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter male offer title" />
        </Form.Item>

        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[
            { required: true, message: "Please enter discount" },
            { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' }
          ]}
        >
          <InputNumber 
            min={0} 
            max={100} 
            style={{ width: "100%" }} 
            placeholder="Enter discount percentage"
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker 
            style={{ width: "100%" }} 
            format="YYYY-MM-DD" 
            placeholder="Select offer date"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea 
            rows={3} 
            placeholder="Enter offer description for male customers"
          />
        </Form.Item>

        <Form.Item 
          label="Offer Image"
          rules={!initialData ? [{ required: true, message: "Please upload an image" }] : []}
        >
          <Upload
            listType="picture"
            maxCount={1}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>
              {initialData ? "Change Image" : "Select Image"}
            </Button>
          </Upload>
          {!initialData && (
            <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
              Image is required for new offers
            </div>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MaleSpecialOfferForm;