import React, { useState } from "react";
import { Card, Table, Input, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import YoutubeLinks from "./YoutubeLinks";
import { YoutubeVideo } from "../../redux/types/subadmintypes/youtubelinks.types";

const UploadYoutube: React.FC = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddVideo = (video: YoutubeVideo) => {
    setVideos([...videos, video]);
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this video?",
      onOk: () => setVideos(videos.filter((v) => v.id !== id)),
    });
  };

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Video",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (url: string) => (
        <video width="200" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ),
    },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: YoutubeVideo) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
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
          rowKey="id"
          locale={{ emptyText: "No videos uploaded" }}
        />
      </Card>

      <YoutubeLinks
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddVideo}
      />
    </div>
  );
};

export default UploadYoutube;
