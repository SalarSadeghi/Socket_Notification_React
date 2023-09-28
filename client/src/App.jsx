import { useEffect, useState } from "react";
import "./app.scss";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (user) {
      setSocket(io("http://localhost:5000"));
    }
  }, [user]);
  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card post={post} key={post.id} socket={socket} user={user} />
          ))}
          <span className="username">{username}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            className="input"
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn" onClick={(e) => setUser(username)}>
            Log In
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
