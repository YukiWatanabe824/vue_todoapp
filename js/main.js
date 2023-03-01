const STORAGE_KEY = "todo-app";

const app = Vue.createApp({
  data: () => ({
    newItem: "",
    todos: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),
    editedTodo: null,
  }),
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  methods: {
    addItem: function (event) {
      let todo = {
        item: this.newItem,
        isDone: false,
      };
      if (this.newItem === "") {
        return;
      }
      this.todos.push(todo);
      this.saveTodos(this.todos);
      this.newItem = "";
    },
    deleteItem: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      this.saveTodos(this.todos);
    },
    editItem(todo) {
      this.beforeEditCache = todo.item;
      this.editedTodo = todo;
    },
    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      this.saveTodos(this.todos);
      if (!todo.item) {
        this.deleteItem(todo);
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.item = this.beforeEditCache;
      this.saveTodos(this.todos);
    },
    saveTodos(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    },
  },
});
app.mount("#app");
