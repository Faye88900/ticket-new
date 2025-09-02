"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  return (
    <div className="favorites-page">
      <h1>⭐ My Favorites</h1>

      {favorites.length === 0 ? (
        <p>There are currently no favorite activities</p>
      ) : (
        <div className="favorite-list">
          {favorites.map((event) => (
            <div
              key={event.id}
              className="favorite-card"
              onClick={() => router.push(`/event/${event.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img src={event.image} alt={event.title} className="favorite-img" />
              <h2>{event.title}</h2>
              <p>{event.start_time} | {event.location}</p>
              <p>RM {event.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

