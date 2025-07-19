import LogoutButton from "../LogoutButton/LogoutButton";
import "./Header.scss";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <span className="header-title">Pet Store</span>
        <div className="header-actions">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
