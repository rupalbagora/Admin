// components/YoutubeLinks.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchYoutubeLinks,
  createYoutubeLink,
  updateYoutubeLink,
  deleteYoutubeLink,
} from "../../redux/Slice/youtubeSlice"; // you will create this slice
import type { YoutubeLinksFormData } from "../../redux/types/youtube.types";
import { Table, Button, Modal, Space, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import YoutubeLinksForm from "./YoutubeLinksForm";

const ManageYoutubeLinks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { youtubeLinks, loading, error } = useAppSelector(
    (state) => state.youtube
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLink, setSelectedLink] = useState<YoutubeLinksFormData | null>(
    null
  );
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch all links
  useEffect(() => {
    dispatch(fetchYoutubeLinks());
  }, [dispatch]);

  // Error handling
  useEffect(() => {
    if (error) message.error(error);
  }, [error]);

  const handleCreate = () => {
    setSelectedLink(null);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleEdit = (record: YoutubeLinksFormData) => {
    setSelectedLink(record);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    const result = await dispatch(deleteYoutubeLink(id));
    if (deleteYoutubeLink.fulfilled.match(result)) {
      message.success("Link deleted successfully");
    }
  };

  const handleFormSubmit = async (values: Partial<YoutubeLinksFormData>) => {
    if (isEditMode && selectedLink) {
      const result = await dispatch(
        updateYoutubeLink({ id: selectedLink._id, data: values })
      );
      if (updateYoutubeLink.fulfilled.match(result)) {
        message.success("Link updated successfully");
        setIsModalVisible(false);
      }
    } else {
      const result = await dispatch(createYoutubeLink(values));
      if (createYoutubeLink.fulfilled.match(result)) {
        message.success("Link created successfully");
        setIsModalVisible(false);
      }
    }
  };

  const columns = [
    {
      title: "YouTube Link",
      dataIndex: "youtubeLink",
      key: "youtubeLink",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: YoutubeLinksFormData) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        className="mb-4 bg-gray-700"
      >
        Add YouTube Link
      </Button>

      <Table
        columns={columns}
        dataSource={youtubeLinks}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title={isEditMode ? "Edit YouTube Link" : "Add YouTube Link"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        destroyOnClose
      >
        <YoutubeLinksForm
          initialValues={selectedLink || undefined}
          onSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default ManageYoutubeLinks;
