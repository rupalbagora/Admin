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
  imageUrl?: string;
}

interface SpecialOfferFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: SpecialOffer | null;
}

const SpecialOfferForm: React.FC<SpecialOfferFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        title: initialData.title,
        discount: initialData.discount,
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
  }, [initialData, form]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("discount", values.discount);
      formData.append("date", values.date.format("YYYY-MM-DD"));
      formData.append("description", values.description);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      onSubmit(formData, initialData?._id);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Something went wrong while saving the offer");
    }
  };

  return (
    <Modal
      title={initialData ? "Edit Offer" : "Add Offer"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={initialData ? "Update Offer" : "Add Offer"}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter offer title" />
        </Form.Item>

        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[{ required: true, message: "Enter discount" }]}
        >
          <InputNumber min={0} max={100} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Select date" }]}
        >
          <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Offer Image">
          <Upload
            listType="picture"
            maxCount={1}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false} // prevent auto upload
          >
            <Button icon={<UploadOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SpecialOfferForm;
