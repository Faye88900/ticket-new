"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useOrderStore from "../orderStore";

export default function ConfirmPage() {
  const order = useOrderStore((state) => state.order);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();

  if (!order) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No order found. Please go back to checkout.
      </p>
    );
  }

  const handleConfirm = () => {
    if (!username || !email || !password || !age || !nationality || !gender) {
      alert("Please fill in all fields!");
      return;
    }

    // 模拟支付验证延迟
    setTimeout(() => {
      router.push("/success");
    }, 1500);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Confirm Your Payment
      </h1>

      {/* 订单信息 */}
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <p>
          <strong>Event:</strong> {order.eventTitle}
        </p>
        <p>
          <strong>Ticket Type:</strong> {order.ticketType}
        </p>
        <p>
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p>
          <strong>Total Price:</strong> RM {order.price * order.quantity}
        </p>
      </div>

      {/* 表单 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        {/* 年龄 + 性别 (一行两列) */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="number"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* 国籍 */}
        <input
          type="text"
          placeholder="Your Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleConfirm} style={buttonStyle}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
}

// 简单样式
const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
};
