import React, { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, message, Spin, Space } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import PackageForm from "./PackageForm";
import API from "../../api/axios";

const { Search } = Input;

const ManagePackages: React.FC = () => {
  const [packages, setPackages] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await API.get("/packages");
      const data = res?.data?.data ?? [];
      setPackages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddOrUpdate = (pkg: any) => {
    const index = packages.findIndex((p) => p._id === pkg._id);
    if (index >= 0) {
      const newPackages = [...packages];
      newPackages[index] = pkg;
      setPackages(newPackages);
      message.success("Package updated successfully");
    } else {
      setPackages((prev) => [pkg, ...prev]);
      message.success("Package added successfully");
    }
    setEditingPackage(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Package?",
      content: "Are you sure you want to delete this package?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await API.delete(`/packages/${id}`);
          setPackages((prev) => prev.filter((p) => p._id !== id));
          message.success("Package deleted successfully");
        } catch (err) {
          console.error(err);
          message.error("Failed to delete package");
        }
      },
    });
  };

  const handleEdit = (pkg: any) => {
    setEditingPackage(pkg);
    setIsModalOpen(true);
  };

  const filtered = packages.filter((pkg) =>
    String(pkg.title ?? "").toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Services", dataIndex: "services", key: "services" },
    { title: "Discount", dataIndex: "discount", key: "discount" },
    { title: "Review", dataIndex: "review", key: "review" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
   // { title: "Gender", dataIndex: "gender", key: "gender" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <img
          src={url || "/no-image.png"}
          alt="Package"
          className="w-16 h-16 object-cover rounded"
          onError={(e) => ((e.currentTarget.src = "/no-image.png"))}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
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
    <div className="p-6">
      <Card
        title="Manage Packages"
        extra={
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchPackages}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingPackage(null);
                setIsModalOpen(true);
              }}
            >
              Add Package
            </Button>
          </Space>
        }
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search packages..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2"
          />
        </div>

        {loading ? (
          <div className="text-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filtered}
            rowKey={(r) => r._id}
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>

      <Modal
        title={editingPackage ? "Edit Package" : "Add Package"}
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingPackage(null);
        }}
        destroyOnClose
      >
        <PackageForm
          packageData={editingPackage}
          onSuccess={handleAddOrUpdate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ManagePackages;
