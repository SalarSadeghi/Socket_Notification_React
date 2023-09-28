import { useState } from "react";

import "./card.scss";

function Card({ post, socket, user }) {
  const [liked, setLiked] = useState(false);
  const handleNotification = (type) => {
    setLiked(true);
    socket?.emit("sendNotification", {
      senderName: user,
      reciverName: post.username,
      type,
    });
  };
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span className="userFullname">{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img
            className="interactionIcon"
            src="/assets/images/heartFilled.svg"
            alt=""
            // onClick={()=>handleNotification(1)}
          />
        ) : (
          <img
            className="interactionIcon"
            src="/assets/images/heart.svg"
            alt=""
            onClick={() => handleNotification(1)}
          />
        )}

        <img
          className="interactionIcon"
          src="/assets/images/comment.svg"
          alt=""
          onClick={() => handleNotification(2)}
        />
        <img
          className="interactionIcon"
          src="/assets/images/share.svg"
          alt=""
          onClick={() => handleNotification(3)}
        />
        <img
          className="interactionIcon infoIcon"
          src="/assets/images/info.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default Card;
