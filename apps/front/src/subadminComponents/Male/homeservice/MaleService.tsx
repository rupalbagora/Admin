import React, { useState } from "react";
import { Card, Table, Input, Button, Space } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import MaleHomeserviceForm from "./MaleServiceForm";
const { Search } = Input;

const MaleService: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [
    { title: "Image", dataIndex: "imageUrl", key: "imageUrl" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: string | number) => <span>{value}%</span>,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Extra Service", dataIndex: "extraService", key: "extraService" },
  ];

  return (
    <>
      <Card
        title="Male Home Services"
        extra={
          <Space>
            <Button icon={<ReloadOutlined />}>Refresh</Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Home Service
            </Button>
          </Space>
        }
      >
        <Search
          placeholder="Search male home services..."
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          rowKey="_id"
          columns={columns}
          pagination={{ pageSize: 5 }}
          locale={{ emptyText: "No home service found" }}
        />
      </Card>

      {/* Modal Component */}
      <MaleHomeserviceForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
};

export default MaleService;
