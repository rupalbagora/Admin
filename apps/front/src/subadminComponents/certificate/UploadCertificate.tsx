import React, { useState } from "react";
import { Card, Table, Input, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Certificate } from "../../redux/types/subadmintypes/uploadcertificate.types";
import CertificateModal from "./CertificateModal";

const UploadCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCertificate = (cert: Certificate) => {
    setCertificates([...certificates, cert]);
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this certificate?",
      onOk: () => setCertificates(certificates.filter((c) => c.id !== id)),
    });
  };

  const filteredCertificates = certificates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchText.toLowerCase()) ||
      c.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Certificate Name", dataIndex: "name", key: "name" },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Certificate) => (
        <div className="flex gap-2">
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            <Button>View</Button>
          </a>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Certificate Management"
        extra={
          <Button icon={<PlusOutlined />} type="primary" onClick={() => setModalVisible(true)}>
            Add Certificate
          </Button>
        }
      >
        <Input.Search
          placeholder="Search certificates..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="mb-4 w-full md:w-1/2"
        />

        <Table
          columns={columns}
          dataSource={filteredCertificates}
          rowKey="id"
          locale={{ emptyText: "No certificates uploaded" }}
        />
      </Card>

      <CertificateModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddCertificate}
      />
    </div>
  );
};

export default UploadCertificate;
