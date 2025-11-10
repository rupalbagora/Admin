import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  message,
  Space,
  Tag,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchYoutubeVideos,
  addYoutubeVideo,
  updateYoutubeVideo,
  deleteYoutubeVideo,
} from "../../redux/Slice/Youtube/youtube.slice";
import YoutubeVideoForm, { type YoutubeVideo } from "./YoutubeVideoForm";

const { Search } = Input;

const UploadYoutube: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const youtubeState = useAppSelector((state: any) => state.youtubeVideos || {
    videos: [],
    loading: false,
    error: null
  });
  
  const { videos = [], loading = false, error = null } = youtubeState;

  const [modalVisible, setModalVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YoutubeVideo | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<{visible: boolean; url?: string; title?: string}>({
    visible: false,
    url: undefined,
    title: undefined
  });
  
  useEffect(() => {
    dispatch(fetchYoutubeVideos());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateYoutubeVideo({ id, formData })).unwrap();
        message.success("Video updated successfully");
      } else {
        await dispatch(addYoutubeVideo(formData)).unwrap();
        message.success(" Video added successfully");
      }
      setModalVisible(false);
      setEditingVideo(null);
      dispatch(fetchYoutubeVideos());
    } catch (error: any) {
      console.error("Operation error:", error);
      message.error(error?.message || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteYoutubeVideo(id)).unwrap();
      message.success("🗑️ Video deleted successfully");
      dispatch(fetchYoutubeVideos());
    } catch (error: any) {
      message.error("Failed to delete video");
    }
  };

  const handleModalOk = () => {
    const form = document.querySelector('.youtube-video-form') as HTMLFormElement;
    if (form) {
      const submitButton = form.querySelector('.youtube-video-form-submit-button') as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  const handleEdit = (video: YoutubeVideo) => {
    console.log("Editing video:", video);
    setEditingVideo(video);
    setModalVisible(true);
  };

  // ✅ FIXED: HTTPS-compatible video play function
  const handlePlayVideo = (video: YoutubeVideo) => {
    if (video.videoUrl) {
      // Open YouTube link in new tab
      window.open(video.videoUrl, '_blank');
    } else if (video.videoPath) {
      // Ensure HTTPS for video URLs
      let videoUrl = video.videoPath;
      
      // If it's a relative path, make it absolute with current origin
      if (video.videoPath.startsWith('/')) {
        videoUrl = `${window.location.origin}${video.videoPath}`;
      }
      
      // Force HTTPS if current protocol is HTTPS
      if (window.location.protocol === 'https:' && videoUrl.startsWith('http:')) {
        videoUrl = videoUrl.replace('http://', 'https://');
      }
      
      setPreviewVideo({
        visible: true,
        url: videoUrl,
        title: video.title
      });
    }
  };

  const filteredVideos = videos.filter((video: YoutubeVideo) =>
    video.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Type",
      key: "type",
      render: (_: any, record: YoutubeVideo) => (
        <Space>
          {record.videoUrl ? (
            <Tag icon={<PlayCircleOutlined />} color="red">
              YouTube
            </Tag>
          ) : (
            <Tag icon={<VideoCameraOutlined />} color="blue">
              Uploaded
            </Tag>
          )}
        </Space>
      ),
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title" 
    },
    {
      title: "Source",
      key: "source",
      render: (_: any, record: YoutubeVideo) => (
        <div style={{ maxWidth: 200 }}>
          {record.videoUrl ? (
            <a 
              href={record.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '12px', wordBreak: 'break-all' }}
              onClick={(e) => {
                e.preventDefault();
                handlePlayVideo(record);
              }}
            >
              {record.videoUrl}
            </a>
          ) : record.videoPath ? (
            <Button 
              type="link" 
              onClick={() => handlePlayVideo(record)}
              style={{ fontSize: '12px', padding: 0, height: 'auto' }}
            >
              Play Uploaded Video
            </Button>
          ) : (
            <Tag color="orange">No Source</Tag>
          )}
        </div>
      ),
    },
    { 
      title: "Uploaded Date", 
      dataIndex: "uploadedAt", 
      key: "uploadedAt",
      render: (date: string) => new Date(date).toLocaleDateString()
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: YoutubeVideo) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure to delete this video?"
            onConfirm={() => handleDelete(record._id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        title="YouTube Video Management"
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => dispatch(fetchYoutubeVideos())}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingVideo(null);
                setModalVisible(true);
              }}
            >
              Add Video
            </Button>
          </Space>
        }
      >
        <Search
          placeholder="Search videos by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredVideos}
          loading={loading}
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No videos found" }}
        />

        <Modal
          title={editingVideo ? "Edit Video" : "Add Video"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingVideo(null);
          }}
          onOk={handleModalOk}
          okText={editingVideo ? "Update" : "Create"}
          confirmLoading={submitLoading}
          width={700}
          destroyOnClose
        >
          <YoutubeVideoForm
            visible={modalVisible}
            onCancel={() => {
              setModalVisible(false);
              setEditingVideo(null);
            }}
            onSubmit={handleAddOrUpdate}
            initialData={editingVideo}
            loading={submitLoading}
          />
        </Modal>
      </Card>

      {/* ✅ FIXED: Video Preview Modal with HTTPS support */}
      <Modal
        title={previewVideo.title || "Video Preview"}
        open={previewVideo.visible}
        onCancel={() => setPreviewVideo({ visible: false, url: undefined, title: undefined })}
        footer={null}
        width={800}
        destroyOnClose
      >
        {previewVideo.url && (
          <div style={{ textAlign: 'center' }}>
            <video 
              controls 
              autoPlay 
              style={{ width: '100%', maxHeight: '500px', borderRadius: '8px' }}
              key={previewVideo.url} // Force re-render when URL changes
            >
              <source 
                src={previewVideo.url} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
            <div style={{ marginTop: '16px', color: '#666' }}>
              <small>If video doesn't play, ensure your server supports HTTPS video streaming</small>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default UploadYoutube;