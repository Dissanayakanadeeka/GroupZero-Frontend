import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from "react-router-dom";

function Home() {
  const [isMember, setIsMember] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkIsMember();
  }, []);

  async function checkIsMember() {
    try {
      const response = await api.get("/api/is_member/");
      if (response.data.length !== 0) {
        setIsMember(true);
      }
    } catch (error) {
      console.error("Error checking membership:", error);
      alert("Failed to check membership. Please try again later.");
    }
  }

  function handle_logout() {
    navigate("/logout");
  }
  return (
    <div>
      {isMember && 
        <div>
          <h1>Welcome Home</h1>
          <p>Thank you for being a member!</p>
          <button onClick={handle_logout}>Logout</button>
        </div>
      }
      {!isMember && 
      <dev>
        <h3>fill following form to become a member</h3>
        <button onClick={handle_logout}>Logout</button>
      </dev>
      }
    </div>
  );
}

export default Home;