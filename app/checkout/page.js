"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useOrderStore from "../orderStore";

export default function CheckoutPage() {
  const order = useOrderStore((state) => state.order);
  const setOrder = useOrderStore((state) => state.setOrder);
  const addOrder = useOrderStore((state) => state.addOrder); 
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 👈 新增：避免闪现错误提示

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("pendingOrder"));
    if (savedOrder) {
      setOrder(savedOrder);
     
    }
    setLoading(false); // 👈 读完 localStorage 才允许渲染
  }, [setOrder]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;
  }

  if (!order) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        You haven't chosen a ticket yet, please go and choose a ticket first!
      </p>
    );
  }

  // 增加数量
  const increaseQuantity = () => {
    setOrder({ ...order, quantity: order.quantity + 1 });
  };

  // 减少数量 (不能小于1)
  const decreaseQuantity = () => {
    if (order.quantity > 1) {
      setOrder({ ...order, quantity: order.quantity - 1 });
    }
  };

  // 跳转到支付页面
  const handleProceedPayment = () => {
    router.push("/payment");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Checkout</h1>

      {/* 🎤 演唱会图片 */}
      <img
        src={order.eventImage}
        alt={order.eventTitle}
        style={{ width: "100%", borderRadius: "12px", marginBottom: "20px" }}
      />

      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <p><strong>Event:</strong> {order.eventTitle}</p>
        <p><strong>Ticket Type:</strong> {order.ticketType}</p>
        <p><strong>Price:</strong> RM {order.price}</p>
        <p><strong>Location:</strong> {order.eventLocation}</p>
        <p><strong>Time:</strong> {order.eventTime}</p>
        <p><strong>Seat:</strong> {order.seat}</p>

        {/* ✅ 数量选择器 */}
        <p>
          <strong>Quantity:</strong>
          <button onClick={decreaseQuantity} style={btnStyle}>-</button>
          <span style={{ margin: "0 10px" }}>{order.quantity}</span>
          <button onClick={increaseQuantity} style={btnStyle}>+</button>
        </p>

        <hr style={{ margin: "20px 0" }} />
        <p><strong>Total:</strong> RM {order.price * order.quantity}</p>

        {/* 🚀 Proceed to Payment 按钮 */}
        <button
          onClick={handleProceedPayment}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#ff4b5c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

// 简单按钮样式
const btnStyle = {
  marginLeft: "10px",
  padding: "4px 10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  cursor: "pointer",
};
