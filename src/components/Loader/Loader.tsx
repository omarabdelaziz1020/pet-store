import "./Loader.scss";

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Loading..." }: LoaderProps) {
  return (
    <div className="loader-container">
      <div>
        <div className="loader-spinner"></div>
        {text && <div className="loader-text">{text}</div>}
      </div>
    </div>
  );
}
