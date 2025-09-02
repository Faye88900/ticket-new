"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "./QueuePage.css";

export default function QueuePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const [queue, setQueue] = useState([]);
  const [myPosition, setMyPosition] = useState(null);

  // 模拟加入队列
  useEffect(() => {
    let currentQueue = JSON.parse(localStorage.getItem("queue")) || [];

    if (!myPosition) {
      const newPosition = currentQueue.length + 1;
      const myTicket = {
        id: Date.now(),
        eventId,
        position: newPosition,
        status: "waiting",
      };
      currentQueue.push(myTicket);
      localStorage.setItem("queue", JSON.stringify(currentQueue));
      setQueue(currentQueue);
      setMyPosition(newPosition);
    }
  }, [eventId, myPosition]);

  // 模拟排队进度
  useEffect(() => {
    const interval = setInterval(() => {
      let currentQueue = JSON.parse(localStorage.getItem("queue")) || [];

      if (currentQueue.length > 0) {
        if (Math.random() < 0.3) {
          currentQueue.shift();
          currentQueue = currentQueue.map((item, index) => ({
            ...item,
            position: index + 1,
          }));
          localStorage.setItem("queue", JSON.stringify(currentQueue));
        }
      }

      setQueue(currentQueue);

      const me = currentQueue.find((q) => q.eventId == eventId);
      if (me) {
        setMyPosition(me.position);
        if (me.position === 1) {
          me.status = "processing";
          localStorage.setItem("queue", JSON.stringify(currentQueue));
        }
      } else {
        setMyPosition(null);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [eventId]);

  return (
    <div className="queue-page">
      <h1>🚦 Queue for Event #{eventId}</h1>

      {myPosition ? (
        <div className="queue-info">
          <p>🎟️ You are in queue</p>
          <p>📌 Your position: <strong>{myPosition}</strong></p>
          {myPosition === 1 ? (
            <button
              className="buy-btn"
              onClick={() => {
                const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
                if (pendingOrder) {
                  // ✅ 把订单交给 checkout
                  localStorage.setItem("checkoutOrder", JSON.stringify(pendingOrder));
                  router.push("/checkout");
                } else {
                  alert("❌ No pending order found!");
                }
              }}
            >
              ✅ It's your turn! Buy now
            </button>
          ) : (
            <p>⌛ Waiting... please don't refresh</p>
          )}
        </div>
      ) : (
        <p>Loading queue...</p>
      )}
    </div>
  );
}
