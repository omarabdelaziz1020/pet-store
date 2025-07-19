import { useEffect, useState } from "react";
import { Table, Select, Input, Card, Tag, Button, Empty, App } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { Pet } from "../../types/Pet";
import Loader from "../../components/Loader/Loader";
import "./PetListPage.scss";

const { Search } = Input;

export default function PetListPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [status, setStatus] = useState("available");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { message } = App.useApp();

  const fetchPets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`
      );
      const data = await res.json();
      // Ensure unique data by filtering duplicates based on ID
      const uniquePets = Array.isArray(data)
        ? data.filter(
            (pet, index, self) =>
              index === self.findIndex((p) => p.id === pet.id)
          )
        : [];
      setPets(uniquePets);
    } catch {
      setError("Failed to fetch pets");
      message.error("Failed to fetch pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filteredPets = pets.filter(
    (pet) =>
      !search ||
      (pet.name && pet.name.toLowerCase().includes(search.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "success";
      case "pending":
        return "warning";
      case "sold":
        return "error";
      default:
        return "default";
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span className="pet-name">{name || "Unnamed"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)} className="pet-status">
          {status}
        </Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: ["category", "name"],
      key: "category",
      render: (categoryName: string) => categoryName || "N/A",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: Pet) => (
        <Link to={`/pet/${record.id}`} className="view-link">
          View Details
        </Link>
      ),
    },
  ];

  if (loading) return <Loader />;

  return (
    <div className="pet-list-page">
      <Card className="pet-list-card">
        <div className="page-header">
          <h1>Pet Store</h1>
          <div className="header-actions">
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchPets}
              loading={loading}
              className="refresh-btn"
            >
              Refresh
            </Button>
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">Status:</label>
            <Select
              value={status}
              onChange={setStatus}
              className="status-select"
              options={[
                { value: "available", label: "Available" },
                { value: "pending", label: "Pending" },
                { value: "sold", label: "Sold" },
              ]}
            />
          </div>
          <div className="filter-group">
            <label className="filter-label">Search:</label>
            <Search
              placeholder="Search by pet name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              allowClear
            />
          </div>
        </div>

        {error ? (
          <div className="error-message">
            <p>{error}</p>
            <Button type="primary" onClick={fetchPets}>
              Try Again
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPets}
            rowKey={(record) => record.id.toString()}
            className="pet-table"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} pets`,
            }}
            locale={{
              emptyText: (
                <Empty description="No pets found" className="empty-state" />
              ),
            }}
          />
        )}
      </Card>
    </div>
  );
}
