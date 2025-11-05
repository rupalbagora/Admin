import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Modal, Tag, Space, Spin } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../../redux/Slice/specialOffer/offerSlice";
import SpecialOfferForm, { SpecialOffer } from "./SpecialOffersForm";

const UploadSpecialOffers: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { offers, loading } = useSelector((state: RootState) => state.offers);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [searchText, setSearchText] = useState("");

  // ✅ Fetch all offers on mount
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  // ✅ Handle Add or Edit
  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    if (id) {
      await dispatch(updateOffer({ id, formData }));
    } else {
      await dispatch(addOffer(formData));
    }
    setModalVisible(false);
    setEditingOffer(null);
  };

  // ✅ Delete Offer
 const handleDelete = (id: string) => {
  console.log("🗑️ Delete button clicked:", id);
  Modal.confirm({
    title: "Delete this offer?",
    onOk: async () => {
      try {
        const result = await dispatch(deleteOffer(id));
        console.log("✅ Delete result:", result);
      } catch (err) {
        console.error("❌ Delete error:", err);
      }
    },
  });
};


  // ✅ Filter search results
  const filteredOffers = offers.filter((o) =>
    o.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (v: number) => `${v}%`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (v: string) => <Tag color="blue">{v}</Tag>,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) =>
        url ? (
          <img
            src={url}
            alt="offer"
            style={{ width: 60, height: 60, borderRadius: 8 }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingOffer(record);
              setModalVisible(true);
            }}
          >
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
    <div style={{ padding: 24 }}>
      <Card
        title="Special Offer Management"
        extra={
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingOffer(null);
                setModalVisible(true);
              }}
            >
              Add Offer
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => dispatch(fetchOffers())}
            >
              Refresh
            </Button>
          </Space>
        }
      >
        <Input.Search
          placeholder="Search offers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        {loading ? (
          <div style={{ textAlign: "center", padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredOffers}
            rowKey={(r) => r._id}
            locale={{ emptyText: "No offers found" }}
          />
        )}
      </Card>

      <SpecialOfferForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingOffer(null);
        }}
        onSubmit={handleAddOrUpdate}
        initialData={editingOffer}
      />
    </div>
  );
};

export default UploadSpecialOffers;
