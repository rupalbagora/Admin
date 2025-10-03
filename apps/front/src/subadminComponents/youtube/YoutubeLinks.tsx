import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { type YoutubeVideo } from "../../redux/types/subadmintypes/youtubelinks.types";

interface YoutubeLinksProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (video: YoutubeVideo) => void;
}

const YoutubeLinks: React.FC<YoutubeLinksProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (!values.file || !values.file.length) return;

    const fileObj = values.file[0].originFileObj as File;

    const newVideo: YoutubeVideo = {
      id: Date.now().toString(),
      title: values.title,
      videoUrl: URL.createObjectURL(fileObj), // local preview URL
      uploadedAt: new Date(),
    };

    onSubmit(newVideo);
    form.resetFields();
  };

  return (
    <Modal
      title="Upload Video"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter video title" />
        </Form.Item>

        <Form.Item
          label="Upload Video"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e.fileList}
          rules={[{ required: true, message: "Please upload a video file" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1} accept="video/*">
            <Button icon={<UploadOutlined />}>Click to Upload Video</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default YoutubeLinks;
