export default function Comment({ author, avatar, date, text }) {
  return (
    <div className="comment">
      <a className="avatar">
        <img src={avatar} alt={author} />
      </a>
      <div className="content">
        <a className="author">{author}</a>
        <div className="metadata">
          <span className="date">{date}</span>
        </div>
        <div className="text">{text}</div>
        <div className="actions">
          <a className="reply">Reply</a>
        </div>
      </div>
    </div>
  );
}
