function Message({ message }) {
  return (
    <div className="message">
      <span className="author">{message.author}</span> :{" "}
      <span className="text">{message.text}</span>
    </div>
  );
}

export default Message;
