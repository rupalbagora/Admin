import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Modal, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import YoutubeLinks from "./YoutubeLinks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchYoutubeVideos, deleteYoutubeVideo } from "../../redux/Slice/Youtube/youtube.slice";

const UploadYoutube: React.FC = () => {
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector((state) => state.youtube);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchYoutubeVideos());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this video?",
      onOk: async () => {
        try {
          await dispatch(deleteYoutubeVideo(id)).unwrap();
          message.success("Video deleted successfully");
        } catch (err: any) {
          message.error(err?.message || "Failed to delete video");
        }
      },
    });
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Video",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (url: string) =>
        url ? (
          <video width="200" controls>
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          "No video file"
        ),
    },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Video Management"
        extra={
          <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
            Add Video
          </Button>
        }
      >
        <Input.Search
          placeholder="Search videos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          columns={columns}
          dataSource={filteredVideos}
          rowKey={(record) => record._id}
          loading={loading}
          locale={{ emptyText: "No videos uploaded yet" }}
        />
      </Card>

      <YoutubeLinks
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={() => {
          setModalVisible(false);
          dispatch(fetchYoutubeVideos());
        }}
      />
    </div>
  );
};

export default UploadYoutube;
