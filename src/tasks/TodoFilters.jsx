function TodoFilters({ filters, updateFilterField }) {
  const handleUpdateFiltre = (champ, valeur) => {
    updateFilterField(champ, valeur);
  };

  return (
    <div className="todoFilters">
      <h2>Filtres</h2>
      <div>
        <div>
          <h5>Par état</h5>
          <div>
            <input
              id="etat-nouveau"
              type="checkbox"
              checked={filters?.status?.nouveau}
              onChange={(e) =>
                handleUpdateFiltre("status.nouveau", e.target.checked)
              }
            />
            <label htmlFor="etat-nouveau">Nouveau</label>
            &nbsp;
            <input
              id="etat-encours"
              type="checkbox"
              checked={filters?.status?.enCours}
              onChange={(e) =>
                handleUpdateFiltre("status.enCours", e.target.checked)
              }
            />
            <label htmlFor="etat-encours">En cours</label>
            &nbsp;
            <input
              id="etat-termine"
              type="checkbox"
              checked={filters?.status?.termine}
              onChange={(e) =>
                handleUpdateFiltre("status.termine", e.target.checked)
              }
            />
            <label htmlFor="etat-termine">Terminé</label>
          </div>
        </div>
        <div>
          <h5>Par date</h5>
          <div>
            du&nbsp;
            <input
              type="date"
              value={filters?.date?.debut}
              onChange={(e) => handleUpdateFiltre("date.debut", e.target.value)}
            />
            &nbsp;au&nbsp;
            <input
              type="date"
              value={filters?.date?.fin}
              onChange={(e) => handleUpdateFiltre("date.fin", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoFilters;
