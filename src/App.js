import React, { Component } from "react";
import { Layout, Input, Button, List, Icon } from "antd";
import "./App.css";
import firestore from "./firestore";

const { Header, Footer, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTodo: false,
      pendingTodo: "",
      todos: []
    };
    this.addTodo = this.addTodo.bind(this);
    this.completeTodo = this.completeTodo.bind(this);

    firestore.collection("todos").onSnapshot(snapshot => {
      let todos = [];
      snapshot.forEach(doc => {
        const todo = doc.data();
        todo.id = doc.id;
        if (!todo.completed) todos.push(todo);
      });

      todos.sort(function(a, b) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
      this.setState({ todos });
    });
  }

  async completeTodo(id) {
    await firestore
      .collection("todos")
      .doc(id)
      .set({
        completed: true
      });
  }

  async addTodo(evt) {
    if (!this.state.pendingTodo) return;
    this.setState({ addingTodo: true });

    await firestore.collection("todos").add({
      content: this.state.pendingTodo,
      completed: false,
      createdAt: new Date().toISOString()
    });

    this.setState({
      addingTodo: false,
      pendingTodo: ""
    });
  }

  render() {
    return (
      <Layout className="App">
        <Header className="App-header">
          <h1>Quick todo</h1>
        </Header>
        <Content className="App-content">
          <Input
            ref="add-todo-input"
            className="App-add-todo-input"
            size="large"
            placeholder="What needs to be done?"
            disabled={this.state.addingTodo}
            onChange={evt => this.setState({ pendingTodo: evt.target.value })}
            value={this.state.pendingTodo}
            onPressEnter={this.addTodo}
            required
          />
          <Button
            className="App-add-todo-button"
            size="large"
            type="primary"
            onClick={this.addTodo}
            loading={this.state.addingTodo}
          >
            Add todo
          </Button>
          <List
            className="App-todos"
            size="large"
            bordered
            dataSource={this.state.todos}
            renderItem={todo => (
              <List.Item>
                {todo.content}
                <Icon
                  onClick={evt => this.completeTodo(todo.id)}
                  className="App-todo-complete"
                  type="check"
                />
              </List.Item>
            )}
          />
        </Content>
        <Footer className="App-footer">
          Made with &hearts; by Larisa Escobar
        </Footer>
      </Layout>
    );
  }
}

export default App;
