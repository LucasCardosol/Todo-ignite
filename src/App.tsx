import { PlusCircle } from "phosphor-react";
import style from "./App.module.css";
import logo from "./assets/icons/Logo.svg";
import Task from "./components/Task";
import { FormEvent, InvalidEvent, useState, ChangeEvent } from "react";
import clipboard from "./assets/icons/Clipboard.svg";

const sendedTaskList = [
  {
    id: 1,
    name: "Beber água",
    checked: false,
  },
  {
    id: 2,
    name: "Estudar",
    checked: true,
  },
];

function App() {
  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState(
    sendedTaskList ? sendedTaskList : []
  );

  const countCheckedTask = taskList.filter((task) => task.checked === true).length
  const isTaskNameEmpty = taskName.length === 0;
  const numberOfTasks = taskList.length;

  function handleTaskSubmit(e: FormEvent) {
    e.preventDefault();
    let newTask = {
      id: numberOfTasks + 1,
      name: taskName,
      checked: false,
    };
    setTaskList([...taskList, newTask]);
    setTaskName("");
  }

  function handleNewNameInvalid(e: InvalidEvent<HTMLInputElement>) {
    e.target.setCustomValidity("Esse campo é obrigatório");
    console.log(isTaskNameEmpty);
  }

  function handleNewNameChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.setCustomValidity("");
    setTaskName(e.target.value);
  }

  function deleteTask(id: number) {
    const newTaskList = taskList.filter((task) => { return task.id !== id});
    setTaskList(newTaskList);
  }

  function addChecked(id: number , checked: boolean) {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, checked: checked };
      }
      return task;
    });
    setTaskList(updatedTaskList)
  }

  return (
    <>
      <header className={style.header}>
        <img src={logo}></img>
      </header>

      <main>
        <form className={style.form} onSubmit={handleTaskSubmit}>
          <input
            placeholder="Adicione uma nova tarefa"
            value={taskName}
            onInvalid={handleNewNameInvalid}
            onChange={handleNewNameChange}
            required={isTaskNameEmpty}
          ></input>
          <button type="submit">
            <p className="bold">Criar</p>
            <PlusCircle size={16} color="#F2F2F2" weight="bold" />
          </button>
        </form>
        <div className={style.taskInfo}>
          <div className="createdTasks">
            <p className="bold blue">Tarefas Criadas</p>
            <span>{numberOfTasks}</span>
          </div>
          <div className="completedTasks">
            <p className="bold purple">Concluídas</p>
            <span>{`${countCheckedTask} de ${numberOfTasks}`}</span>
          </div>
        </div>
        <div style={{paddingTop:'1.5rem'}}>
        {numberOfTasks > 0 ? (
          <ul>
            {taskList.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                checked={task.checked}
                onDeleteTask={deleteTask}
                onAddChecked={addChecked}
              />
            ))}
          </ul>
        ) : (
          <div className={style.MsgEmptyList}>
            <img src={clipboard}></img>
            <p className="bold">Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        )}
        </div>
      </main>
    </>
  );
}

export default App;
