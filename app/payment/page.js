"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useOrderStore from "../orderStore";

export default function PaymentPage() {
  const order = useOrderStore((state) => state.order);
  const addOrder = useOrderStore((state) => state.addOrder); // 👈 引入 addOrder
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!order) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        No order found. Please go back to checkout.
      </p>
    );
  }

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method first!");
      return;
    }

    setLoading(true);

    // 模拟支付 API 延迟 2 秒
    setTimeout(() => {
      setLoading(false);

      // ✅ 把订单存进 My Orders
      addOrder(order);

      // ✅ 清除 pendingOrder 避免重复
      localStorage.removeItem("pendingOrder");

      // ✅ 跳转到确认页
      router.push("/confirm");
    }, 2000);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Payment
      </h1>

      <img
        src={order.eventImage}
        alt={order.eventTitle}
        style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
      />

      {/* 订单摘要 */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>Order Summary</h2>
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
          <strong>Total:</strong> RM {order.price * order.quantity}
        </p>
      </div>

      {/* 支付方式选择 */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Choose Payment Method
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            💳 Credit Card
          </label>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              value="FPX"
              checked={paymentMethod === "FPX"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            🏦 FPX (Online Banking)
          </label>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              value="TnG eWallet"
              checked={paymentMethod === "TnG eWallet"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            📱 Touch 'n Go eWallet
          </label>
        </div>
      </div>

      {/* 确认支付按钮 */}
      <button
        onClick={handlePayment}
        disabled={!paymentMethod || loading}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: !paymentMethod || loading ? "#ccc" : "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: !paymentMethod || loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
        }}
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
    </div>
  );
}
