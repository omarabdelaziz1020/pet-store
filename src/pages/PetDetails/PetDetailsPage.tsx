import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Tag, Button, Image, App } from "antd";
import {
  EditOutlined,
  ArrowLeftOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Loader from "../../components/Loader/Loader";
import type { Pet } from "../../types/Pet";
import "./PetDetailsPage.scss";

export default function PetDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { message } = App.useApp();

  const fetchPet = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`);
      if (!res.ok) throw new Error("Pet not found");
      const data = await res.json();
      setPet(data);
    } catch {
      setError("Could not load pet details. Please try again.");
      message.error("Could not load pet details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`https://petstore.swagger.io/v2/pet/${id}`);
        if (!res.ok) throw new Error("Pet not found");
        const data = await res.json();
        if (isMounted) setPet(data);
      } catch {
        if (isMounted) {
          setError("Could not load pet details. Please try again.");
          message.error("Could not load pet details");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id, message]);

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

  const handleEditClick = () => {
    navigate(`/pet/${pet?.id}/edit`);
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="pet-details-page">
        <div className="error-container">
          <div className="error-message">{error}</div>
          <div className="error-actions">
            <Button type="primary" icon={<ReloadOutlined />} onClick={fetchPet}>
              Retry
            </Button>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBackClick}>
              Back to List
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="pet-details-page">
      <Card className="pet-details-card">
        <div className="page-header">
          <h1>Pet Details</h1>
          <div className="header-actions">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            >
              Edit Pet
            </Button>
          </div>
        </div>

        <div className="pet-info">
          <div className="info-section">
            <div className="section-title">Basic Information</div>
            <div className="info-item">
              <span className="label">ID:</span>
              <span className="value">{pet.id}</span>
            </div>
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{pet.name || "Unnamed"}</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value status">
                <Tag color={getStatusColor(pet.status)}>{pet.status}</Tag>
              </span>
            </div>
          </div>

          <div className="info-section">
            <div className="section-title">Additional Details</div>
            <div className="info-item">
              <span className="label">Category:</span>
              <span className="value">{pet.category?.name || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="label">Tags:</span>
              <span className="value">
                {pet.tags && pet.tags.length > 0
                  ? pet.tags.map((tag) => tag.name).join(", ")
                  : "No tags"}
              </span>
            </div>
          </div>
        </div>

        {pet.photoUrls && pet.photoUrls.length > 0 && (
          <div className="pet-photos">
            <div className="photos-title">Photos</div>
            <div className="photo-grid">
              {pet.photoUrls.map((url, i) => (
                <div key={i} className="photo-item">
                  <Image
                    src={url}
                    alt={`Pet photo ${i + 1}`}
                    preview={{
                      mask: <div>Click to view</div>,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="page-actions">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEditClick}
          >
            Edit Pet
          </Button>
          <Button icon={<ArrowLeftOutlined />} onClick={handleBackClick}>
            Back to List
          </Button>
        </div>
      </Card>
    </div>
  );
}
