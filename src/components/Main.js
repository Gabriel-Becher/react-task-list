import React, { Component } from "react";
import "./Main.css";

import Form from "./Form";
import Tarefas from "./Tarefas";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            novaTarefa: "",
            tarefas: [],
            index: -1,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const tarefas = localStorage.getItem("tarefas");
        if (!tarefas) return;
        const newTarefas = JSON.parse(tarefas);
        this.setState({ tarefas: newTarefas });
    }

    componentDidUpdate(prevProps, prevState) {
        const { tarefas } = this.state;
        if (tarefas === prevState.tarefas) return;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
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
            this.setState({
                tarefas: [...novasTarefas],
                index: -1,
                novaTarefa: "",
            });
        }

        localStorage.setItem("tarefas", novasTarefas.toString());
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
        return (
            <div className="main">
                <h1>Lista de Tarefas</h1>

                <Form
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    novaTarefa={novaTarefa}
                />

                <Tarefas
                    tarefas={tarefas}
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                />
            </div>
        );
    }
}
