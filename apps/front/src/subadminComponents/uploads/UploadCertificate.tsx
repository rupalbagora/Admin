import React, { useState } from "react";
import { Card, Table, Button, Input, Upload, Modal, Form } from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { Certificate } from "../../redux/types/subadmintypes/uploadcertificate.types";

const UploadCertificate: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Add certificate
  const handleAddCertificate = (values: any) => {
    if (!values.file || !values.file.length) return;

    const fileObj = values.file[0].originFileObj as File;

    const newCertificate: Certificate = {
      id: Date.now().toString(),
      name: values.name,
      title: values.title,
      fileUrl: URL.createObjectURL(fileObj),
      uploadedAt: new Date(),
    };

    setCertificates([...certificates, newCertificate]);
    setIsModalVisible(false);
    form.resetFields();
  };

  // Delete certificate
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this certificate?",
      onOk: () => setCertificates(certificates.filter((c) => c.id !== id)),
    });
  };

  // Table columns
  const columns: ColumnsType<Certificate> = [
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
      render: (_, record) => (
        <div className="flex gap-2">
          <a href={record.fileUrl} target="_blank" rel="noopener noreferrer">
            <Button type="default">View</Button>
          </a>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Filtered certificates based on search text
  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cert.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6">
      <Card
        title="Certificate Management"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="bg-gray-700"
            onClick={() => setIsModalVisible(true)}
          >
            Add Certificate
          </Button>
        }
      >
        {/* Search */}
        <div className="mb-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <Input.Search
            placeholder="Search certificates..."
            className="w-full md:w-1/2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredCertificates}
          rowKey="id"
          locale={{ emptyText: "No certificates uploaded" }}
        />
      </Card>

      {/* Upload Modal */}
      <Modal
        title="Upload Certificate"
        open={isModalVisible}
        destroyOnHidden
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCertificate}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Enter certificate title" />
          </Form.Item>

          <Form.Item
            label="Certificate Name"
            name="name"
            rules={[{ required: true, message: "Please enter certificate name" }]}
          >
            <Input placeholder="Enter certificate name" />
          </Form.Item>

          <Form.Item
            label="Upload File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList} // important!
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadCertificate;
