// components/Certificates/UploadCertificate.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { Certificate } from "../../redux/types/subadmintypes/uploadcertificate.types";
import CertificateForm from "./CertificateForm";

const { Search } = Input;

const UploadCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add new certificate
  const handleAddCertificate = (cert: Certificate) => {
    setCertificates((prev) => [...prev, cert]);
    setIsModalOpen(false);
  };

  // Delete certificate
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Certificate?",
      content: "Are you sure you want to delete this certificate?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setCertificates((prev) => prev.filter((c) => c.id !== id)),
    });
  };

  // Filter certificates based on search input
  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchText.toLowerCase()) ||
      cert.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Certificate Name", dataIndex: "name", key: "name" },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Certificate) => (
        <Space>
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            <Button>View</Button>
          </a>
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
        title="Certificate Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add Certificate
          </Button>
        }
      >
        {/* Search */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search certificates..."
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
          dataSource={filteredCertificates}
          rowKey="id"
          locale={{ emptyText: "No certificates uploaded" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Upload Certificate Modal */}
      <Modal
        title="Upload Certificate"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        width={700}
      >
        <CertificateForm onAddCertificate={handleAddCertificate} />
      </Modal>
    </div>
  );
};

export default UploadCertificate;
