// EventList.jsx
import Link from "next/link";

export default function EventList({ events = [] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/event/${event.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {event.image && (
              <img
                src={event.image}
                alt={event.title}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
            )}
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "0 0 10px", color: "#0070f3" }}>{event.title}</h3>
              <p style={{ margin: "0 0 10px", color: "#555" }}>{event.description}</p>
              <p style={{ fontSize: "14px", color: "#777" }}>
                📍 {event.location} | 📅 {event.start_time}
              </p>
              <p style={{ fontWeight: "bold", color: "#000" }}>RM {event.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
