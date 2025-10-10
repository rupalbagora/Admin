import React, { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Space, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CertificateForm from "./CertificateForm";
import axios from "axios";

const { Search } = Input;

const UploadCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch certificates from backend
  const fetchCertificates = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5001/api/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCertificates(res.data.data);
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to fetch certificates");
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleAddCertificate = (cert: any) => {
    setCertificates((prev) => [cert, ...prev]);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    Modal.confirm({
      title: "Delete Certificate?",
      content: "Are you sure you want to delete this certificate?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5001/api/certificates/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCertificates((prev) => prev.filter((c) => c._id !== id));
          message.success("Certificate deleted successfully");
        } catch (err: any) {
          message.error(err.response?.data?.message || "Delete failed");
        }
      },
    });
  };

  const filteredCertificates = certificates.filter((cert) =>
    cert.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Uploaded At",
      dataIndex: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <a href={record.imageUrl} target="_blank" rel="noopener noreferrer">
            <Button>View</Button>
          </a>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Manage Certificates"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            Add Certificate
          </Button>
        }
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search certificates..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2"
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCertificates}
          rowKey="_id"
          locale={{ emptyText: "No certificates added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Add Certificate"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden
      >
        <CertificateForm onAddCertificate={handleAddCertificate} />
      </Modal>
    </div>
  );
};

export default UploadCertificate;
