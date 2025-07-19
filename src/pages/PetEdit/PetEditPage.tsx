import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, Card, message } from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Loader from "../../components/Loader/Loader";
import type { Pet } from "../../types/Pet";
import "./PetEditPage.scss";

interface EditFormData {
  name: string;
  status: string;
  category: string;
}

export default function PetEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    async function fetchPet() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`);
        if (!res.ok) throw new Error("Pet not found");
        const data = await res.json();
        setPet(data);
        form.setFieldsValue({
          name: data.name || "",
          status: data.status || "available",
          category: data.category?.name || "",
        });
      } catch {
        setError("Failed to fetch pet details");
        message.error("Failed to fetch pet details");
      } finally {
        setLoading(false);
      }
    }
    fetchPet();
  }, [id, form]);

  async function handleSubmit(values: EditFormData) {
    setSaving(true);
    setError("");
    try {
      const updatedPet: Pet = {
        ...pet!,
        name: values.name,
        status: values.status,
        category: { id: pet?.category?.id || 0, name: values.category },
      };

      const res = await fetch(`https://petstore.swagger.io/v2/pet`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPet),
      });

      if (!res.ok) throw new Error("Failed to update pet");

      message.success("Pet updated successfully!");
      setPet(updatedPet);
    } catch {
      setError("Failed to update pet");
      message.error("Failed to update pet");
    } finally {
      setSaving(false);
    }
  }

  const handleCancelClick = () => {
    navigate(`/pet/${pet?.id}`);
  };

  const handleBackToListClick = () => {
    navigate("/");
  };

  if (loading) return <Loader />;

  if (error && !pet) {
    return (
      <div className="pet-edit-page">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <div className="error-actions">
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handleBackToListClick}
            >
              Back to List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="pet-edit-page">
      <Card className="pet-edit-card">
        <div className="page-header">
          <h1>Edit Pet</h1>
          <p>Update pet information</p>
        </div>

        <Form
          form={form}
          name="editPet"
          onFinish={handleSubmit}
          layout="vertical"
          className="edit-form"
        >
          <Form.Item
            name="name"
            label="Pet Name"
            rules={[
              { required: true, message: "Please enter pet name!" },
              { min: 2, message: "Name must be at least 2 characters!" },
            ]}
          >
            <Input placeholder="Enter pet name" size="large" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select
              placeholder="Select status"
              size="large"
              options={[
                { value: "available", label: "Available" },
                { value: "pending", label: "Pending" },
                { value: "sold", label: "Sold" },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please enter category!" },
              { min: 2, message: "Category must be at least 2 characters!" },
            ]}
          >
            <Input
              placeholder="Enter category (e.g., Dogs, Cats)"
              size="large"
            />
          </Form.Item>

          <div className="form-actions">
            <Button
              type="primary"
              htmlType="submit"
              loading={saving}
              icon={<SaveOutlined />}
              size="large"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              icon={<ArrowLeftOutlined />}
              size="large"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
