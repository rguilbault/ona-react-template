import { useState } from "react";

function TodoForm({ onNouvelleTache }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onNouvelleTache({ title: titre, description });

    setTitre("");
    setDescription("");
  };

  return (
    <div className="todoForm">
      <h2>Nouvelle tâche</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          className="form-control"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <textarea
          name="description"
          rows="5"
          placeholder="Description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="submit" className="btn btn-primary" value="Créer" />
      </form>
    </div>
  );
}

export default TodoForm;
