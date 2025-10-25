import React, { useState } from "react";
import { Card, Table, Input, Button, Modal, Tag, Rate } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import SpecialOfferForm, { SpecialOffer } from "./SpecialOfferForm";

const UploadSpecialOffers: React.FC = () => {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddOffer = (offer: SpecialOffer) => {
    setOffers((prev) => [...prev, offer]);
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this offer?",
      onOk: () => setOffers((prev) => prev.filter((o) => o.id !== id)),
    });
  };

  const filteredOffers = offers.filter(
    (o) =>
      o.title.toLowerCase().includes(searchText.toLowerCase()) ||
      o.tag.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      render: (value: number) => `₹${value}`,
    },
    { title: "Tag", dataIndex: "tag", key: "tag", render: (tag: string) => <Tag color="gold">{tag}</Tag> },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="offer"
            style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SpecialOffer) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Special Offer Management"
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            Add Offer
          </Button>
        }
      >
        <Input.Search
          placeholder="Search offers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          columns={columns}
          dataSource={filteredOffers}
          rowKey={(record) => record.id.toString()}
          locale={{ emptyText: "No offers added" }}
        />
      </Card>

      <SpecialOfferForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddOffer}
      />
    </div>
  );
};

export default UploadSpecialOffers;
