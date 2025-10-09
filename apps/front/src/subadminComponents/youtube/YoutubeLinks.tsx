import React from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { createYoutubeVideo } from "../../redux/Slice/Youtube/youtube.slice";

interface YoutubeLinksProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit?: () => void; // optional callback to refresh or close modal
}

const YoutubeLinks: React.FC<YoutubeLinksProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      if (values.videoUrl) formData.append("videoUrl", values.videoUrl);

      if (values.file && values.file.length > 0) {
        const fileObj = values.file[0].originFileObj as File;
        formData.append("video", fileObj);
      }

      await dispatch(createYoutubeVideo(formData)).unwrap();

      message.success("Video uploaded successfully!");
      form.resetFields();
      onSubmit?.();
    } catch (err: any) {
      console.error("Upload error:", err);
      message.error(err?.message || "Video upload failed!");
    }
  };

  return (
    <Modal title="Upload YouTube Video" open={visible} onCancel={onCancel} onOk={() => form.submit()} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
          <Input placeholder="Enter video title" />
        </Form.Item>

        <Form.Item
          label="YouTube URL (optional)"
          name="videoUrl"
          rules={[{ type: "url", warningOnly: true, message: "Enter a valid YouTube link (optional)" }]}
        >
          <Input placeholder="Paste YouTube link or leave empty to upload file" />
        </Form.Item>

        <Form.Item label="Upload Video (optional)" name="file" valuePropName="fileList" getValueFromEvent={(e: any) => e.fileList}>
          <Upload beforeUpload={() => false} maxCount={1} accept="video/*">
            <Button icon={<UploadOutlined />}>Click to Upload Video</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default YoutubeLinks;
