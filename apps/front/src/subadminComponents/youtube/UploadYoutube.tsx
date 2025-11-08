// // import React, { useEffect, useState } from "react";
// // import { Card, Table, Input, Button, Modal, message, Space } from "antd";
// // import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// // import YoutubeLinks from "./YoutubeLinks";
// // import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// // import {
// //   fetchYoutubeVideos,
// //   deleteYoutubeVideo,
// // } from "../../redux/Slice/Youtube/youtube.slice";

// // const UploadYoutube: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { videos, loading } = useAppSelector((state) => state.youtube);
// //   const [searchText, setSearchText] = useState("");
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [editingVideo, setEditingVideo] = useState<any>(null); // store the selected video for update

// //   const SERVER_URL = import.meta.env.VITE_API_URL;

// //   useEffect(() => {
// //     dispatch(fetchYoutubeVideos());
// //   }, [dispatch]);

// //   const handleDelete = (id: string) => {
// //     Modal.confirm({
// //       title: "Are you sure you want to delete this video?",
// //       onOk: async () => {
// //         try {
// //           await dispatch(deleteYoutubeVideo(id)).unwrap();
// //           message.success("Video deleted successfully");
// //         } catch (err: any) {
// //           message.error(err?.message || "Failed to delete video");
// //         }
// //       },
// //     });
// //   };

// //   // Handle edit
// //   const handleEdit = (video: any) => {
// //     setEditingVideo(video);
// //     setModalVisible(true);
// //   };

// //   const handleModalClose = () => {
// //     setModalVisible(false);
// //     setEditingVideo(null);
// //   };

// //   const filteredVideos = videos.filter((v) =>
// //     v.title.toLowerCase().includes(searchText.toLowerCase())
// //   );

// //   const columns = [
// //     { title: "Title", dataIndex: "title", key: "title" },
// //     {
// //       title: "Video",
// //       key: "video",
// //       render: (_: any, record: any) => {
// //         if (record.videoPath) {
// //           return (
// //             <video width="200" controls style={{ pointerEvents: "none" }}>
// //               <source src={`${SERVER_URL}${record.videoPath}`} type="video/mp4" />
// //             </video>
// //           );
// //         } else if (record.videoUrl) {
// //           return (
// //             <a href={record.videoUrl} target="_blank" rel="noopener noreferrer">
// //               YouTube Link
// //             </a>
// //           );
// //         } else {
// //           return "No video";
// //         }
// //       },
// //     },
// //     {
// //       title: "Uploaded At",
// //       dataIndex: "uploadedAt",
// //       key: "uploadedAt",
// //       render: (date: string) => new Date(date).toLocaleString(),
// //     },
// //     {
// //       title: "Actions",
// //       key: "actions",
// //       render: (_: any, record: any) => (
// //         <Space>
// //           <Button
// //             icon={<EditOutlined />}
// //             type="default"
// //             onClick={() => handleEdit(record)}
// //           >
// //             Edit
// //           </Button>
// //           <Button
// //             danger
// //             icon={<DeleteOutlined />}
// //             onClick={() => handleDelete(record._id)}
// //           >
// //             Delete
// //           </Button>
// //         </Space>
// //       ),
// //     },
// //   ];

// //   return (
// //     <div style={{ padding: 24 }}>
// //       <Card
// //         title="Video Management"
// //         extra={
// //           <Button
// //             icon={<PlusOutlined />}
// //             type="primary"
// //             onClick={() => setModalVisible(true)}
// //           >
// //             Add Video
// //           </Button>
// //         }
// //       >
// //         <Input.Search
// //           placeholder="Search videos..."
// //           value={searchText}
// //           onChange={(e) => setSearchText(e.target.value)}
// //           allowClear
// //           style={{ marginBottom: 16, width: "50%" }}
// //         />

// //         <Table
// //           columns={columns}
// //           dataSource={filteredVideos}
// //           rowKey={(record) => record._id}
// //           loading={loading}
// //           locale={{ emptyText: "No videos uploaded yet" }}
// //           tableLayout="fixed"
// //           style={{ overflowX: "auto" }}
// //         />
// //       </Card>

// //       <YoutubeLinks
// //         visible={modalVisible}
// //         onCancel={handleModalClose}
// //         onSubmit={() => {
// //           handleModalClose();
// //           dispatch(fetchYoutubeVideos());
// //         }}
// //         editingVideo={editingVideo} // 👈 pass for editing
// //       />
// //     </div>
// //   );
// // };

// // export default UploadYoutube;

// import React, { useEffect, useState } from "react";
// import { Card, Table, Input, Button, Modal, message, Space } from "antd";
// import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import YoutubeLinks from "./YoutubeLinks";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import {
//   fetchYoutubeVideos,
//   deleteYoutubeVideo,
// } from "../../redux/Slice/Youtube/youtube.slice";

// interface YoutubeVideo {
//   _id: string;
//   title: string;
//   videoPath?: string;
//   videoUrl?: string;
//   uploadedAt: string;
// }

// const UploadYoutube: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { videos, loading } = useAppSelector((state) => state.youtube);
//   const [searchText, setSearchText] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);
//   const [editingVideo, setEditingVideo] = useState<YoutubeVideo | null>(null);

//   const SERVER_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     dispatch(fetchYoutubeVideos());
//   }, [dispatch]);

//   const handleDelete = (id: string) => {
//     Modal.confirm({
//       title: "Are you sure you want to delete this video?",
//       onOk: async () => {
//         try {
//           await dispatch(deleteYoutubeVideo(id)).unwrap();
//           message.success("Video deleted successfully");
//         } catch (err: any) {
//           message.error(err?.message || "Failed to delete video");
//         }
//       },
//     });
//   };

//   const handleEdit = (video: YoutubeVideo) => {
//     setEditingVideo(video);
//     setModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setModalVisible(false);
//     setEditingVideo(null);
//   };

//   const filteredVideos = videos.filter((v: YoutubeVideo) =>
//     v.title.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const columns = [
//     { title: "Title", dataIndex: "title", key: "title" },
//     {
//       title: "Video",
//       key: "video",
//       render: (_: any, record: YoutubeVideo) => {
//         if (record.videoPath) {
//           return (
//             <video width="200" controls style={{ pointerEvents: "none" }}>
//               <source
//                 src={`${SERVER_URL}${record.videoPath}`}
//                 type="video/mp4"
//               />
//             </video>
//           );
//         } else if (record.videoUrl) {
//           return (
//             <a
//               href={record.videoUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               YouTube Link
//             </a>
//           );
//         } else {
//           return "No video";
//         }
//       },
//     },
//     {
//       title: "Uploaded At",
//       dataIndex: "uploadedAt",
//       key: "uploadedAt",
//       render: (date: string) => new Date(date).toLocaleString(),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_: any, record: YoutubeVideo) => (
//         <Space>
//           <Button
//             icon={<EditOutlined />}
//             type="default"
//             onClick={() => handleEdit(record)}
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             icon={<DeleteOutlined />}
//             onClick={() => handleDelete(record._id)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Card
//         title="Video Management"
//         extra={
//           <Button
//             icon={<PlusOutlined />}
//             type="primary"
//             onClick={() => setModalVisible(true)}
//           >
//             Add Video
//           </Button>
//         }
//       >
//         <Input.Search
//           placeholder="Search videos..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           allowClear
//           style={{ marginBottom: 16, width: "50%" }}
//         />

//         <Table<YoutubeVideo>
//           columns={columns}
//           dataSource={filteredVideos}
//           rowKey={(record) => record._id}
//           loading={loading}
//           locale={{ emptyText: "No videos uploaded yet" }}
//           tableLayout="fixed"
//           style={{ overflowX: "auto" }}
//         />
//       </Card>

//       <YoutubeLinks
//         visible={modalVisible}
//         onCancel={handleModalClose}
//         onSubmit={() => {
//           handleModalClose();
//           dispatch(fetchYoutubeVideos());
//         }}
//         editingVideo={editingVideo}
//       />
//     </div>
//   );
// };

// export default UploadYoutube;



import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Modal, message, Space } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import YoutubeLinks from "./YoutubeLinks";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchYoutubeVideos,
  deleteYoutubeVideo,
} from "../../redux/Slice/Youtube/youtube.slice";
import type { ColumnsType } from "antd/es/table";

interface YoutubeVideo {
  _id: string;
  title: string;
  videoPath?: string;
  videoUrl?: string;
  uploadedAt: string;
}

const UploadYoutube: React.FC = () => {
  const dispatch = useAppDispatch();
  const { videos, loading } = useAppSelector(
    (state) => state.youtube as { videos: YoutubeVideo[]; loading: boolean }
  );
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState<YoutubeVideo | null>(null);

  const SERVER_URL = import.meta.env.VITE_API_URL;

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

  const handleEdit = (video: YoutubeVideo) => {
    setEditingVideo(video);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditingVideo(null);
  };

  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<YoutubeVideo> = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Video",
      key: "video",
      render: (_: any, record) => {
        if (record.videoPath) {
          return (
            <video width="200" controls style={{ pointerEvents: "none" }}>
              <source src={`${SERVER_URL}${record.videoPath}`} type="video/mp4" />
            </video>
          );
        } else if (record.videoUrl) {
          return (
            <a href={record.videoUrl} target="_blank" rel="noopener noreferrer">
              YouTube Link
            </a>
          );
        } else {
          return "No video";
        }
      },
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
      render: (_: any, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            type="default"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Video Management"
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
          >
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

        <Table<YoutubeVideo>
          columns={columns}
          dataSource={filteredVideos}
          rowKey={(record) => record._id}
          loading={loading}
          locale={{ emptyText: "No videos uploaded yet" }}
          tableLayout="fixed"
          style={{ overflowX: "auto" }}
        />
      </Card>

      <YoutubeLinks
        visible={modalVisible}
        onCancel={handleModalClose}
        onSubmit={() => {
          handleModalClose();
          dispatch(fetchYoutubeVideos());
        }}
        editingVideo={editingVideo}
      />
    </div>
  );
};

export default UploadYoutube;
