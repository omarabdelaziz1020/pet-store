import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button
      type="primary"
      icon={<LogoutOutlined />}
      onClick={handleLogout}
      className="logout-btn"
    >
      Logout
    </Button>
  );
}
