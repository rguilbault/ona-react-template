import { useState } from "react";

function MessageForm(props) {
  const [nom, setNom] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onSubmitMessage({ author: nom, text: text });
    setNom("");
    setText("");
  };

  return (
    <div className="messageForm">
      <h2>Nouveau message</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Votre nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Votre message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="Valider" />
      </form>
    </div>
  );
}

export default MessageForm;
