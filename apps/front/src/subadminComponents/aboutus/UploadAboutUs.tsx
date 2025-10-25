// components/aboutus/UploadAboutUs.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import AboutUsForm, { AboutUs } from "./AboutUsForm";

const { Search } = Input;

const UploadAboutUs: React.FC = () => {
  const [aboutUsData, setAboutUsData] = useState<AboutUs[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === Add About Us ===
  const handleAddAboutUs = (data: AboutUs) => {
    setAboutUsData((prev) => [...prev, data]);
    setIsModalOpen(false);
  };

  // === Delete ===
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete About Us entry?",
      content: "Are you sure you want to delete this About Us record?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setAboutUsData((prev) => prev.filter((a) => a.id !== id)),
    });
  };

  // === Filter Data ===
  const filteredData = aboutUsData.filter((item) =>
    item.welcome.toLowerCase().includes(searchText.toLowerCase())
  );

  // === Columns ===
  const columns = [
    {
      title: "Welcome",
      dataIndex: "welcome",
      key: "welcome",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Information Collection",
      dataIndex: "informationCollection",
      key: "informationCollection",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Use of Information",
      dataIndex: "useOfInformation",
      key: "useOfInformation",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Security",
      dataIndex: "security",
      key: "security",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Changes of Policy",
      dataIndex: "changesOfPolicy",
      key: "changesOfPolicy",
      render: (text: string) => <div>{text || "-"}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AboutUs) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="About Us Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add About Us
          </Button>
        }
      >
        {/* Search Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search About Us..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2 bg-[#2523232c]"
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          locale={{ emptyText: "No About Us data added" }}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Modal */}
      <Modal
        title="Add About Us"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <AboutUsForm onAddAboutUs={handleAddAboutUs} />
      </Modal>
    </div>
  );
};

export default UploadAboutUs;
