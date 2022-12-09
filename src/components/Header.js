import { useEffect, useState } from "react";

function Header(props) {
  const tasks = props.tasks;
  // const { tasks } = props;
  return (
    <header>
      <h1 style={{ marginTop: 50 }}>Simple ToDoList</h1>
      <div style={{ display: "flex", flexFlow: "row nowrap" }}>
        <OverviewBox tasks={tasks} />
        <CatFactBox />
      </div>
    </header>
  );
}

function OverviewBox(props) {
  const tasks = props.tasks;
  const [name, setName] = useState("Loading name...");

  useEffect(() => {
    const savedName = window.localStorage.getItem("name");
    setName(savedName ?? "John Doe");
  }, []);

  const tasksLength = tasks.filter((tasks) => !tasks.isComplete).length;

  return (
    <div className="HeaderBox">
      <h2>Overview</h2>
      <p>
        Welcome back,{" "}
        <strong
          role="button"
          onClick={() => {
            const newName = prompt("What is your name?", name);
            setName(newName);
            window.localStorage.setItem("name", newName);
          }}
        >
          {name || "<set a name>"}
        </strong>
        !
      </p>
      <p>
        You have{" "}
        <strong>
          {tasksLength} task{tasksLength === 1 ? "" : "s"}
        </strong>{" "}
        that {tasksLength === 1 ? "is" : "are"} not complete.{" "}
        {tasksLength === 0 ? "Good job!" : ""}
      </p>
    </div>
  );
}

function CatFactBox() {
  const [catFact, setCatFact] = useState("Loading cat fact...");
  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((data) => setCatFact(data.fact))
      .catch((error) => setCatFact(`Unable to fetch cat fact :( ${error}`));
  }, []);

  return (
    <div className="HeaderBox">
      <h2>Cat Fact of the Day</h2>
      <p>{catFact}</p>
    </div>
  );
}

export default Header;
