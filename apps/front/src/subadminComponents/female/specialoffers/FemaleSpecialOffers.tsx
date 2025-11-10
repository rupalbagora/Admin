import React, { useEffect, useState } from "react";
import { 
  Card, 
  Table, 
  Input, 
  Button, 
  Tag, 
  Space, 
  message,
  Popconfirm 
} from "antd";
import { 
  PlusOutlined, 
  DeleteOutlined, 
  EditOutlined, 
  ReloadOutlined, 
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchOffers,
  addOffer,
  updateOffer,
  deleteOffer,
} from "../../../redux/Slice/specialOffer/offerSlice";
import FemaleSpecialOfferForm, { type SpecialOffer } from "./FemaleSpecialOfferForm";

const { Search } = Input;

const FemaleSpecialOffers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { offers, loading, error } = useAppSelector((state: any) => state.offers);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOffer | null>(null);
  const [searchText, setSearchText] = useState("");
  
  // ✅ Fetch all offers on mount
  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  // ✅ Handle errors
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Filter only female offers
  const femaleOffers = offers.filter((offer: SpecialOffer) => offer.gender === "Female");

  // ✅ Handle Add or Edit
  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      if (id) {
        await dispatch(updateOffer({ id, formData })).unwrap();
        message.success("✅ Female offer updated successfully");
      } else {
        await dispatch(addOffer(formData)).unwrap();
        message.success("✅ Female offer added successfully");
      }
      setModalVisible(false);
      setEditingOffer(null);
      dispatch(fetchOffers());
    } catch (error: any) {
      message.error(error || "Operation failed");
    }
  };

  // ✅ Delete Offer
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteOffer(id)).unwrap();
      message.success("🗑️ Female offer deleted successfully");
      dispatch(fetchOffers());
    } catch (error: any) {
      message.error("Failed to delete offer");
    }
  };

  // ✅ Filter search results
  const filteredOffers = femaleOffers.filter((offer: SpecialOffer) =>
    offer.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Table Columns
  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) =>
        imageUrl ? (
          <img
            src={imageUrl}
            alt="offer"
            style={{ width: 60, height: 60, borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title" 
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: string) => `${discount}%`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => <Tag color="blue">{date}</Tag>,
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description",
      ellipsis: true 
    },
    // {
    //   title: "Male/Female",
    //   dataIndex: "gender",
    //   key: "gender",
    //   render: (gender: string) => (
    //               {gender}
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: SpecialOffer) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingOffer(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this female offer?"
            onConfirm={() => handleDelete(record._id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={
        <span>
          {/* <WomanOutlined style={{ marginRight: 8 }} /> */}
          Female Special Offers    ({femaleOffers.length} offers)
        </span>
      }
      extra={
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
            onClick={() => dispatch(fetchOffers())} 
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingOffer(null);
              setModalVisible(true);
            }}
          >
            Add New Offer
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search female offers by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredOffers}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No female offers found" }}
      />

      <FemaleSpecialOfferForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingOffer(null);
        }}
        onSubmit={handleAddOrUpdate}
        initialData={editingOffer}
        loading={loading}
      />
    </Card>
  );
};

export default FemaleSpecialOffers;