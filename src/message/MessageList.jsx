import Message from "./Message";

function MessageList(props) {
  return (
    <div className="messageList">
      <h2>Historique</h2>
      {props.messages.map((m) => {
        return <Message key={m.id} message={m} />;
      })}
    </div>
  );
}

export default MessageList;
