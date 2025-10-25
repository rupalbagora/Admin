// components/referfriend/UploadReferFriend.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ReferFriendForm from "./ReferFriendForm";

interface ReferFriend {
  id: string;
  referralCode: string;
  friendEmail: string;
  createdAt: string;
}

const { Search } = Input;

const UploadReferFriend: React.FC = () => {
  const [referFriends, setReferFriends] = useState<ReferFriend[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // === Add Referral ===
  const handleAddReferFriend = (data: ReferFriend) => {
    setReferFriends((prev) => [...prev, data]);
    setIsModalOpen(false);
  };

  // === Delete Referral ===
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Referral?",
      content: "Are you sure you want to delete this referral entry?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setReferFriends((prev) => prev.filter((r) => r.id !== id)),
    });
  };

  // === Filtered Data ===
  const filteredData = referFriends.filter((r) =>
    r.friendEmail.toLowerCase().includes(searchText.toLowerCase())
  );

  // === Table Columns ===
  const columns = [
    { title: "Referral Code", dataIndex: "referralCode", key: "referralCode" },
    { title: "Friend's Email", dataIndex: "friendEmail", key: "friendEmail" },
    {
      title: "Date Sent",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ReferFriend) => (
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
        title="Refer a Friend"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add Referral
          </Button>
        }
      >
        {/* === Search Input === */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search by friend's email..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2 bg-[#2523232c]"
          />
        </div>

        {/* === Table === */}
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          locale={{ emptyText: "No referrals added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* === Add Referral Modal === */}
      <Modal
        title="Refer a Friend"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <ReferFriendForm onAddReferFriend={handleAddReferFriend} />
      </Modal>
    </div>
  );
};

export default UploadReferFriend;
