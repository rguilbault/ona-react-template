import { useEffect, useState, useRef } from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";

function MessageBox() {
  const [messages, setMessage] = useState([]);
  const [count, setCount] = useState(4);

  const pollingRef = useRef(null);

  useEffect(() => {
    // Init
    fetch(
      "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/messages"
    )
      .then((resp) => resp.json())
      .then((data) => {
        setMessage(data);
      });

    // Polling
    const startPolling = () => {
      pollingRef.current = setInterval(() => {
        fetch(
          "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/messages"
        )
          .then((resp) => resp.json())
          .then((data) => {
            setMessage(data);
          });
      }, 3000);
    };
    startPolling();

    return () => {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    };
  }, []);

  const handleMessageSubmit = (message) => {
    const newMessage = {
      id: count + 1,
      ...message,
    };
    setMessage((oldMsg) => [...oldMsg, newMessage]);
    // setMessage([...messages, newMessage]);
    setCount(count + 1);
  };

  const handleMessageSubmitFetch = (message) => {
    fetch(
      "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/messages",
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) =>
        fetch(
          "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/messages"
        )
      )
      .then((resp) => resp.json())
      .then((data) => setMessage(data));
  };

  return (
    <div className="messageBox">
      <h1>Messages</h1>
      <MessageList messages={messages} />
      <MessageForm onSubmitMessage={handleMessageSubmitFetch} />
    </div>
  );
}

export default MessageBox;
