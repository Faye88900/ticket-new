"use client";

import { useRouter } from "next/navigation"; 
import useOrderStore from "../orderStore";


export default function SuccessPage() {
    
  const order = useOrderStore((state) => state.order);
  const router = useRouter();  

  return (
    <div style={{ textAlign: "center", marginTop: "40px", fontFamily: "Arial" }}>
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "green",
          marginBottom: "20px",
        }}
      >
         Payment Successful!
      </h1>

      {order && (
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          {/* 🎟️ 活动封面 */}
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <img
              src={order.eventImage}
              alt={order.eventTitle}
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
            {/* 标题叠在图片上 */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "0",
                width: "100%",
                background: "rgba(0,0,0,0.6)",
                color: "#fff",
                padding: "10px",
                borderRadius: "0 0 12px 12px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {order.eventTitle}
            </div>
          </div>

          {/* 📋 订单详情表格 */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <tbody>
              {[
                [" Ticket Type", order.ticketType],
                [" Quantity", order.quantity],
                [
                  "Total Paid",
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    RM {order.price * order.quantity}
                  </span>,
                ],
                [" Location", order.eventLocation || "Kuala Lumpur"],
                [" Start Time", order.eventTime || "7:00 PM"],
                [" Seat", order.seat || "Free Seating"],
              ].map(([label, value], idx) => (
                <tr
                  key={idx}
                  style={{
                    backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                      textAlign: "left",
                      borderRight: "1px solid #eee",
                      width: "50%",
                    }}
                  >
                    {label}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>

           {/* 🏠 返回首页按钮 */}
          <button
            style={{
              marginTop: "24px",
              padding: "12px 24px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            onClick={() => router.push("/home")}
            
          >
             Back to Home
          </button>
        </div>
      )}
    </div>
  );
}
