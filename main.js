window.addEventListener("load", () => {
  // myTodos라는 빈 배열 만들기
  myTodos = JSON.parse(localStorage.getItem("myTodos")) || [];

  // 1. username이 들어갈 input 찾기
  const nameInput = document.querySelector("#name");
  const userName = localStorage.getItem("username") || "";
  nameInput.value = userName;

  // 2. nameInput change event value를 localStorage "username"에 저장
  // form field가 변경되는 것이므로 addEventListener("change") 사용
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  // 3. TodoForm 찾기
  const newTodoForm = document.querySelector("#newTodoForm");

  // 4. 찾은 TodoForm에 submit 이벤트 넣기
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // todo = 이벤트 타겟 엘리먼트 중 name="content"의 value를 가지는 오브젝트
    const todo = {
      content: e.target.elements.content.value,
    };
    // 해당 todo를 localStorage에 있는 myTodos에 삽입
    myTodos.push(todo);

    // localStorage "myTodos"항목으로 저장
    localStorage.setItem("myTodos", JSON.stringify(myTodos));
    // 이벤트 타겟인 input 리셋
    e.target.reset();

    displayTodo();
  });
  displayTodo();
});

const displayTodo = () => {
  const todoList = document.querySelector("#todoList");
  todoList.classList.add("list");
  todoList.innerHTML = "";

  myTodos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo_item");

    const content = document.createElement("div");
    content.classList.add("todo_content");
    content.innerHTML = `<input type="text" value="${todo.content}" readonly/>`;

    const actions = document.createElement("div");
    actions.classList.add("actions");
    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("edit", "button");
    buttonEdit.innerHTML = "EDIT";
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("delete", "button");
    buttonDelete.innerHTML = "DELETE";

    todoItem.appendChild(content);
    actions.appendChild(buttonEdit);
    actions.appendChild(buttonDelete);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    buttonDelete.addEventListener("click", (e) => {
      // myTodos 배열 중 내가 클릭한 항목이 아닌 todo들만 모아서 새로운 배열로 만듦
      myTodos = myTodos.filter((item) => item != todo);
      localStorage.setItem("myTodos", JSON.stringify(myTodos));
      displayTodo();
    });

    buttonEdit.addEventListener("click", (e) => {
      const modal = document.querySelector(".modal");
      modal.classList.remove("hidden");
      const modalInput = modal.querySelector("#editedTodo");
      const editForm = modal.querySelector("#editForm");

      const buttonClose = modal.querySelector(".close");
      buttonClose.addEventListener("click", (e) => {
        modal.classList.add("hidden");
      });

      const input = content.querySelector("input");
      modalInput.value = input.value;
      modalInput.focus();

      editForm.addEventListener("submit", (e) => {
        const editedTodo = modalInput.value;
        todo.content = editedTodo;
        localStorage.setItem("myTodos", JSON.stringify(myTodos));
        displayTodo();
      });
    });
  });
};
