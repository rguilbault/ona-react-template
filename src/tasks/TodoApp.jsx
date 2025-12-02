import { useEffect, useMemo, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoStats from "./TodoStats";

function TodoApp() {
  const [tasks, setTasks] = useState([
    /*{
      id: "06f9c834-69dd-4542-bfa7-ae4665d910eb",
      titre: "Lorem 1",
      description: "Est etiam herbis appareat in quidem vis in non equo.",
      date: "2025-11-27T13:00:00Z",
      statut: "Nouveau",
    },
    {
      id: "d68bbe5e-bc28-4185-ae82-5bbde9ae8dee",
      titre: "Lorem 2",
      description:
        "Narrare quae Gallus nihilo lenius non ferociens excedamus cadaveribus scrutabatur.",
      date: "2025-11-27T13:10:00Z",
      statut: "En cours",
    },
    {
      id: "ca127ec1-31c8-4852-8182-9484ef92e314",
      titre: "Lorem 3",
      description:
        "Amandi bestiis quodam amandi est caritate moribus etiam se etiam.",
      date: "2025-11-27T13:20:00Z",
      statut: "Terminé",
    },*/
  ]);

  const [filters, setFilters] = useState({
    status: {
      nouveau: true,
      enCours: true,
      termine: true,
    },
    date: {
      debut: "2025-11-01",
      fin: "2025-12-01",
    },
  });

  const pollingRef = useRef(null);

  useEffect(() => {
    // Init
    fetch(
      "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks"
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log("Data:", data);
        setTasks(data);
      });

    // Polling
    const startPolling = () => {
      pollingRef.current = setInterval(() => {
        fetch(
          "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks"
        )
          .then((resp) => resp.json())
          .then((data) => {
            setTasks(data);
          });
      }, 3000);
    };
    startPolling();

    return () => {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    };
  }, []);

  const handleNouvelleTache = (nouvelleTache) => {
    const nouvTache = {
      id: uuidV4(),
      ...nouvelleTache,
      date: new Date().toISOString(),
      statut: "Nouveau",
    };

    setTasks((oldTasks) => [...oldTasks, nouvTache]);
  };

  const handleNouvelleTacheSubmit = (nouvelleTache) => {
    fetch(
      "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks",
      {
        method: "POST",
        body: JSON.stringify(nouvelleTache),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) =>
        fetch(
          "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks"
        )
      )
      .then((resp) => resp.json())
      .then((data) => setTasks(data));
  };

  const handleUpdateFilterField = (champ, valeur) => {
    console.log(champ, valeur);
    switch (champ) {
      case "status.nouveau":
        setFilters((oldFilters) => ({
          ...oldFilters,
          status: {
            ...oldFilters.status,
            nouveau: valeur,
          },
        }));
        break;
      case "status.enCours":
        setFilters((oldFilters) => ({
          ...oldFilters,
          status: {
            ...oldFilters.status,
            enCours: valeur,
          },
        }));
        break;
      case "status.termine":
        setFilters((oldFilters) => ({
          ...oldFilters,
          status: {
            ...oldFilters.status,
            termine: valeur,
          },
        }));
        break;
    }
  };

  const handleClickStatusChange = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const patchTache = {
      status:
        task.status === "TODO"
          ? "DOING"
          : task.status === "DOING"
          ? "DONE"
          : "",
    };
    if (patchTache.status) {
      fetch(
        "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks/" +
          taskId,
        {
          method: "PATCH",
          body: JSON.stringify(patchTache),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) =>
          fetch(
            "https://3000--019abeb9-d896-7827-ad59-70c1380c7215.eu-central-1-01.gitpod.dev/tasks"
          )
        )
        .then((resp) => resp.json())
        .then((data) => setTasks(data));
    } else {
      console.warn("Tâche déjà terminée");
    }
  };

  const tachesFiltrees = useMemo(
    () =>
      tasks.filter((task) => {
        return (
          (task.status === "TODO" && filters.status.nouveau) ||
          (task.status === "DOING" && filters.status.enCours) ||
          (task.status === "DONE" && filters.status.termine)
        );
      }),
    [tasks, filters]
  );

  return (
    <div className="todoApp">
      <div className="todoApp-left">
        <TodoForm onNouvelleTache={handleNouvelleTacheSubmit} />
        <TodoStats />
      </div>
      <div className="todoApp-right">
        <TodoFilters
          filters={filters}
          updateFilterField={handleUpdateFilterField}
        />
        <TodoList
          tasks={tachesFiltrees}
          onClickStatusChange={handleClickStatusChange}
        />
      </div>
    </div>
  );
}

export default TodoApp;
