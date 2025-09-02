import Link from "next/link";

export default function EventCard({ event }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden", // 让图片圆角跟卡片一致
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(123, 199, 164, 0.1)",
        maxWidth: "300px", // 控制单个卡片大小
      }}
    >
      {/* 封面图 */}
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover", // 防止图片变形
          }}
        />
      )}

      <div style={{ padding: "15px" }}>
        <h2 style={{ color: "#000", fontSize: "1.2rem", marginBottom: "8px" }}>
          {event.title}
        </h2>
        <p style={{ color: "#cc6767ff", marginBottom: "12px" }}>
          {event.description}
        </p>

        <p style={{ color: "#000", fontWeight: "500" }}>
          <strong>Date:</strong> {event.start_time}
        </p>

        <Link href={`/events/${event.id}`}>
          <button
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
