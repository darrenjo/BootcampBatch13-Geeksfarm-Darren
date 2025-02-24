import React, { Component } from "react";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({ likes: prevState.likes + 1 }));
  };

  render() {
    const { author, avatar, date, text } = this.props;
    return (
      <div className="comment">
        <a className="avatar">
          <img src={avatar} alt={author} />
        </a>
        <div className="content">
          <a className="author">{author}</a>
          <div className="metadata">
            <span className="date">
              {date} - {this.state.likes} Likes
            </span>
          </div>
          <div className="text">{text}</div>
          <div className="actions">
            <a className="reply">Reply</a>
            <button className="like" onClick={this.handleLike}>
              👍 Like
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;

// import React, { useState } from "react";

// export default function Comment({ author, avatar, date, text }) {
//   const [likes, setLikes] = useState(0);
//   return (
//     <div className="comment">
//       <a className="avatar">
//         <img src={avatar} alt={author} />
//       </a>
//       <div className="content">
//         <a className="author">{author}</a>
//         <div className="metadata">
//           <span className="date">
//             {date} - {likes} Likes
//           </span>
//         </div>
//         <div className="text">{text}</div>
//         <div className="actions">
//           <a className="reply">Reply</a>
//           <button className="like" onClick={() => setLikes(likes + 1)}>
//             👍 Like
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
