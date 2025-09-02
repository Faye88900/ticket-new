"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EventList from "../eventlist";
import FilterBar from "../filterBar";
import BannerCarousel from "../BannerCarousel";
import "./HomePage.css"; // 引入样式文件

export default function HomePage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [favorites, setFavorites] = useState([]); // ⭐ 收藏
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    dateRange: { start: "", end: "" },
  });

  // 登录验证
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/");
    }
  }, [router]);

  // 模拟数据
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: "2025 HYERI FANMEETING TOUR",
        description: "Enjoy live performances from top artists this summer!",
        start_time: "2025-08-15",
        location: "KL Convention Centre",
        price: 250,
        category: "Music",
        image:
          "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Ff7618751-43db-4497-9421-ad5125667ef3%2Fog%2F1280x500%2FHYERI_FANMEETING_2025_KL_BMS_Web_Banner.png&q=80&t=webp&w=1280",
      },
      {
        id: 2,
        title: "Tech Conference 2025",
        description: "The latest in AI, Web Development, and Cloud Computing.",
        start_time: "2025-09-10",
        location: "Penang Digital Hub",
        price: 358,
        category: "Technology",
        image:
          "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202507%2F6942b1e3-1717-4b66-8b41-603a481dc3d9%2Fog%2F1280x500%2FBMS_1280x500.jpg&q=80&t=webp&w=1280",
      },
      {
        id: 3,
        title: "Art & Design Expo",
        description: "Explore creative works from artists around the world.",
        start_time: "2025-08-20",
        location: "KL Art Gallery",
        price: 238,
        category: "Art",
        image:
          "https://my.bookmyshow.com/api/v2/assets/image?image=https%3A%2F%2Fcdn-sea.bookmyshow.com%2Fprod%2Fimages%2F202506%2Faee43b6f-33d5-4824-93b4-363cae441283%2Fog%2F1280x500%2FNew_Project__30_.png&q=80&t=webp&w=1280",
      },
    ];
    setEvents(mockData);
    setFilteredEvents(mockData);
    localStorage.setItem("events", JSON.stringify(mockData));
    
  }, []);

  // ⭐ 加载收藏（完整对象）
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  // ⭐ 保存收藏到 localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // ⭐ 切换收藏
  const toggleFavorite = (event) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === event.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== event.id); // 取消收藏
      } else {
        return [...prev, event]; // 添加完整对象
      }
    });
  };

  // 过滤逻辑
  useEffect(() => {
    let data = events;

    if (filters.search) {
      data = data.filter(
        (e) =>
          e.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          e.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.category) {
      data = data.filter((e) => e.category === filters.category);
    }
    if (filters.location) {
      data = data.filter((e) => e.location === filters.location);
    }
    if (filters.dateRange.start && filters.dateRange.end) {
      data = data.filter(
        (e) =>
          e.start_time >= filters.dateRange.start &&
          e.start_time <= filters.dateRange.end
      );
    }
    setFilteredEvents(data);
  }, [filters, events]);

  return (
    <div className="homepage">
      {/* 顶部标题和按钮区 */}
      <div className="header">
        <h1 className="title">Event Ticket System</h1>
        <div className="header-buttons">
          <button
            className="my-orders-btn"
            onClick={() => router.push("/orders")}
          >
            📑 My Orders
          </button>

          <button
            className="my-orders-btn"
            onClick={() => router.push("/favorites")}
          >
            ⭐ My Favorites
          </button>
        </div>
      </div>

      {/* Banner 区域 */}
      <div className="banner">
        <BannerCarousel events={events} />
      </div>

      {/* 筛选栏 */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* 活动卡片 + 收藏按钮 */}
      <div className="event-list">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="event-card"
            onClick={() => router.push(`/event/${event.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={event.image} alt={event.title} className="event-img" />
            <h2 className="event-title">{event.title}</h2>
            <p className="event-desc">{event.description}</p>
            <p className="event-meta">
              {event.start_time} | {event.location}
            </p>
            <p className="event-price">RM {event.price}</p>

            {/* ⭐ 收藏按钮（阻止冒泡） */}
            <button
              className="fav-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(event);
              }}
            >
              {favorites.some((fav) => fav.id === event.id)
                ? "⭐ Favorited"
                : "☆ Add to Favorited"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
