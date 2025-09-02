"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useOrderStore from "../../orderStore";

const mockData = [
  {
    id: 1,
    title: "2025 HYERI FANMEETING TOUR <Welcome to HYERI's STUDIO> IN KUALA LUMPUR",
    language: "Korean",
    languages: "English",
    start_time: "17 Aug 2025 7:00 PM",
    location: "Zepp Kuala Lumpur",
    price: 120,
    category: "Music",
    organizer: "StarWave Entertainment",
    website: "www.starwave.com",
    description:
      "Girl's Day's HYERI is hosting her first fan meeting in Malaysia! Expect an exciting performance, interactive games, and special events to create an unforgettable evening for fans.",
    tickets: [
      { type: "VIP", price: 580 },
      { type: "CAT 1", price: 380 },
      { type: "CAT 2", price: 250 },
    ],
    image:
      "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Ff7618751-43db-4497-9421-ad5125667ef3%2Fog%2F1280x500%2FHYERI_FANMEETING_2025_KL_BMS_Web_Banner.png&q=80&t=webp&w=1280",
  },
  {
    id: 2,
    title: "SEKAI NO OWARI ASIA TOUR 2025 [Phoenix] in KUALA LUMPUR",
    language: "Japanese",
    languages: "English",
    start_time: "8 Oct 2025 8:00 PM",
    location: "Zepp Kuala Lumpur",
    price: 358,
    category: "Music",
    organizer: "XYZ Productions",
    website: "www.sekainoowari.jp",
    description:
      "The super popular band SEKAI NO OWARI is coming to Malaysia with their latest tour Phoenix, bringing a brand new visual and auditory experience!",
    tickets: [
      { type: "VIP", price: 520 },
      { type: "CAT 1", price: 358 },
    ],
    image:
      "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202507%2F6942b1e3-1717-4b66-8b41-603a481dc3d9%2Fog%2F1280x500%2FBMS_1280x500.jpg&q=80&t=webp&w=1280",
  },
  {
    id: 3,
    title: "陳華 HUA CHEN K《A Journey of Summer Love 》KUALA LUMPUR 2025",
    language: "Chinese",
    languages: "English",
    start_time: "17 Oct 2025 7:30 PM",
    location: "Zepp Kuala Lumpur",
    price: 238,
    category: "Music",
    organizer: "XYZ Productions",
    website: "www.sekainoowari.cn",
    description:
      "On August 17th, Chen Hua will embark on this journey of melody with her most sincere songs and stories, crossing the crowds and rushing to that gentle time that belongs only to you and me, and meet you in this city with four seasons of summer - Kuala Lumpur.",
    tickets: [
      { type: "VIP", price: 520, benefit: "Meet & Greet" },
      { type: "CAT 1", price: 238 },
    ],
    image:
      "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Faee43b6f-33d5-4824-93b4-363cae441283%2Fog%2F1280x500%2FNew_Project__30_.png&q=80&t=webp&w=1280",
  },
];

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const setOrder = useOrderStore((state) => state.setOrder);
  const router = useRouter();

  useEffect(() => {
  const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
  const allEvents = [...mockData, ...savedEvents]; // 合并后台新增和默认数据
  const found = allEvents.find((e) => e.id === Number(id));
  setEvent(found);
}, [id]);

  if (!event) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  const handleBuyNow = (ticket) => {
  const pendingOrder = {   // 👈 先定义变量
    id: Date.now(),        // 加一个唯一id比较保险
    eventId: event.id,
    eventTitle: event.title,
    eventImage: event.image,
    ticketType: ticket.type,
    price: ticket.price,
    quantity: 1,
    eventLocation: event.location,
    eventTime: event.start_time,
    seat: "Free Seating",
  };

  setOrder(pendingOrder);  // 👈 存到全局 store
  localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder)); // 👈 存到 localStorage

  // 跳转到排队页面
  router.push(`/queue?eventId=${event.id}`);
};


  return (
    <div
      style={{
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <img
          src={event.image}
          alt={event.title}
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
        />

        <div style={{ padding: "24px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "12px", color: "#111" }}>
            {event.title}
          </h1>

          <p style={{ color: "#666", marginBottom: "8px" }}>
            🌐 {event.language} | {event.languages}
          </p>

          <p style={{ color: "#666", marginBottom: "8px" }}>
            📍 {event.location} | {event.start_time}
          </p>

          <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px", color: "#d32f2f" }}>
            🎟️ Ticket Price: RM {event.price}+
          </p>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Organizer</h3>
            <p>{event.organizer}</p>
            <p>🌐 {event.website}</p>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Ticket Types</h3>
            <ul style={{ paddingLeft: "20px" }}>
              {event.tickets.map((ticket, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {ticket.type} – RM {ticket.price}{" "}
                    {ticket.benefit && <em>({ticket.benefit})</em>}
                  </span>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "#0070f3",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => handleBuyNow(ticket)}
                  >
                    Buy Now
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Activity Introduction</h3>
            <p style={{ color: "#444" }}>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
