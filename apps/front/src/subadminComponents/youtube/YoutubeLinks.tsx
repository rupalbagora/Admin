import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { createYoutubeVideo, updateYoutubeVideo } from "../../redux/Slice/Youtube/youtube.slice";

interface YoutubeLinksProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
  editingVideo?: any | null;
}

const SERVER_URL = import.meta.env.VITE_API_URL;

const YoutubeLinks: React.FC<YoutubeLinksProps> = ({
  visible,
  onCancel,
  onSubmit,
  editingVideo,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]); // state for Upload component
  const dispatch = useAppDispatch();

  // pre-fill fields when editing
  useEffect(() => {
    if (editingVideo) {
      form.setFieldsValue({
        title: editingVideo.title,
        videoUrl: editingVideo.videoUrl || "",
        uploadedAt: editingVideo.uploadedAt
          ? new Date(editingVideo.uploadedAt).toLocaleString()
          : "",
      });

      // Show existing video in Upload if file exists
      if (editingVideo.videoPath) {
        setFileList([
          {
            uid: "-1",
            name: editingVideo.videoPath.split("/").pop(),
            status: "done",
            url: `${SERVER_URL}${editingVideo.videoPath}`,
          },
        ]);
      } else {
        setFileList([]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingVideo, form]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);

      if (values.videoUrl) formData.append("videoUrl", values.videoUrl);

      if (fileList.length > 0 && fileList[0].originFileObj) {
        // only append new file
        formData.append("video", fileList[0].originFileObj as File);
      }

      if (editingVideo) {
        await dispatch(updateYoutubeVideo({ id: editingVideo._id, data: formData })).unwrap();
        message.success("Video updated successfully!");
      } else {
        await dispatch(createYoutubeVideo(formData)).unwrap();
        message.success("Video uploaded successfully!");
      }

      form.resetFields();
      setFileList([]);
      onSubmit?.();
    } catch (err: any) {
      console.error("Upload error:", err);
      message.error(err?.message || "Operation failed!");
    }
  };

  return (
    <Modal
      title={editingVideo ? "Edit Video" : "Upload YouTube Video"}
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
          label="YouTube URL (optional)"
          name="videoUrl"
          rules={[{ type: "url", warningOnly: true, message: "Enter a valid YouTube link" }]}
        >
          <Input placeholder="Paste YouTube link or leave empty to upload file" />
        </Form.Item>

        <Form.Item label="Upload Video (optional)">
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept="video/*"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload Video</Button>
          </Upload>
        </Form.Item>

        {/* {editingVideo && editingVideo.uploadedAt && (
          <Form.Item label="Uploaded At">
            <Input value={new Date(editingVideo.uploadedAt).toLocaleString()} disabled />
          </Form.Item>
        )} */}
      </Form>
    </Modal>
  );
};

export default YoutubeLinks;
