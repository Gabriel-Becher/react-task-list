import react, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";

import "./Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: "",
      tarefas: [],
      index: -1,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();
    if (novaTarefa === "") return;
    if (tarefas.indexOf(novaTarefa) !== -1) return;
    const novasTarefas = [...tarefas];
    novasTarefas.push(novaTarefa);

    if (index === -1) {
      this.setState({ tarefas: [...novasTarefas], novaTarefa: "" });
    } else {
      const novasTarefas = [...tarefas];
      novasTarefas[index] = novaTarefa;
      this.setState({ tarefas: [...novasTarefas], index: -1, novaTarefa: "" });
    }
  };

  handleChange = (e) => {
    this.setState({ novaTarefa: e.target.value });
  };

  handleEdit(e, index) {
    const { tarefas } = this.state;
    this.setState({ index, novaTarefa: tarefas[index] });
  }

  handleDelete(e, index) {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);
    this.setState({ tarefas: [...novasTarefas] });
  }

  render() {
    const { novaTarefa, tarefas } = this.state;
    let count = 0;
    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>
        <form action="#" className="form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={novaTarefa} />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => {
            return (
              <li key={tarefa} index={index}>
                {tarefa}
                <span>
                  <FaEdit
                    onClick={(e) => this.handleEdit(e, index)}
                    className="edit"
                  />
                  <FaWindowClose
                    onClick={(e) => this.handleDelete(e, index)}
                    className="delete"
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
