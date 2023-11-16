"use strict";
import { format } from "date-fns";

const displayController = function (dependencies) {
  const state = dependencies.state;
  const localStorageHelper = dependencies.localStorageHelper;
  const projectComponent = dependencies.projectComponent;
  const todoComponent = dependencies.todoComponent;
  const priorityComponent = dependencies.priorityComponent;
  const projectIdSelect = dependencies.projectIdSelect;
  const todosRootDiv = dependencies.todosRootDiv;
  const todoDialog = dependencies.todoDialog;
  const todoFormHeader = dependencies.todoFormHeader;
  const todoActionTypeInput = dependencies.todoActionTypeInput;
  const todoIdInput = dependencies.todoIdInput;
  const todoTitleInput = dependencies.todoTitleInput;
  const todoDueDateInput = dependencies.todoDueDateInput;
  const todoPriorityInput = dependencies.todoPriorityInput;
  const todoDescriptionInput = dependencies.todoDescriptionInput;
  const projectDialog = dependencies.projectDialog;
  const projectNameInput = dependencies.projectNameInput;
  const defaultTodos = state.getTodos({
    projectId: state.getCurrentProjectId(),
  });
  const defaultPriorities = [
    { priority: 1, isSelected: false },
    { priority: 2, isSelected: false },
    { priority: 3, isSelected: false },
    { priority: 4, isSelected: true },
  ];

  const getPrioritiesList = function (selectedPriority) {
    const res = [];
    for (let i = 1; i <= 4; i++) {
      res.push({ priority: i, isSelected: i === selectedPriority });
    }
    return res;
  };

  const renderProjects = function (projects = state.getProjects()) {
    const projectElements = [];
    for (let project of projects) {
      const args = {
        id: project.id,
        name: project.name,
        isCurrent: state.isCurrentProject(project),
      };
      projectElements.push(projectComponent(args));
    }
    projectIdSelect.replaceChildren(...projectElements);
  };

  const renderTodos = function (todos = defaultTodos) {
    const todoElements = [];
    for (let todo of todos) {
      const args = todo.toPlainObject();
      todoElements.push(todoComponent(args));
    }
    todosRootDiv.replaceChildren(...todoElements);
  };

  const renderPriorities = function (priorities = defaultPriorities) {
    const priorityElements = [];
    for (let priority of priorities) {
      priorityElements.push(priorityComponent(priority));
    }
    todoPriorityInput.replaceChildren(...priorityElements);
  };

  const openCreateTodoDialog = function () {
    todoFormHeader.textContent = "Create Todo";
    todoActionTypeInput.value = "create";
    todoIdInput.value = "";
    todoTitleInput.value = "";
    todoDueDateInput.value = "";
    renderPriorities();
    todoDescriptionInput.textContent = "";
    todoDialog.showModal();
  };

  const openEditTodoDialog = function (todoId) {
    const todo = state.getTodos({ id: todoId })[0];
    const { id, title, dueDate, priority, description } = todo;
    todoFormHeader.textContent = "Edit Todo";
    todoActionTypeInput.value = "edit";
    todoIdInput.value = id;
    todoTitleInput.value = title;
    todoDueDateInput.value = dueDate;
    renderPriorities(getPrioritiesList(priority));
    todoDescriptionInput.textContent = description;
    todoDialog.showModal();
  };

  const openCreateProjectDialog = function () {
    projectNameInput.value = "";
    projectDialog.showModal();
  };

  const handleProjectIdSelect = function (event) {
    state.setCurrentProjectId(projectIdSelect.value);
    renderTodos(
      state.getTodos({
        projectId: state.getCurrentProjectId(),
      })
    );
  };

  const handleTodoNewButton = function (event) {
    openCreateTodoDialog();
  };

  const handleIsDoneCheckbox = function (event) {
    const element = event.target;
    if (element.dataset.inputType !== "is-done-checkbox") return;
    const todoId = element.dataset.todoId;
    const todo = state.getTodos({ id: todoId })[0];
    const oldIsDone = todo.isDone;
    state.updateTodo({ id: todoId, isDone: !oldIsDone });
    // update the state in localStorage
  };

  const handleTodoMoreButton = function (event) {
    const todoId = event.target.dataset.todoId;
    const expandedContentDiv = document.querySelector(
      `#expanded-content-${todoId}`
    );
    expandedContentDiv.classList.toggle("max-h-0");
    event.target.classList.toggle("hidden");
    const lessButton = document.querySelector(`#todo-less-button-${todoId}`);
    lessButton.classList.toggle("hidden");
  };

  const handleTodoLessButton = function (event) {
    const todoId = event.target.dataset.todoId;
    const expandedContentDiv = document.querySelector(
      `#expanded-content-${todoId}`
    );
    expandedContentDiv.classList.toggle("max-h-0");
    event.target.classList.toggle("hidden");
    const moreButton = document.querySelector(`#todo-more-button-${todoId}`);
    moreButton.classList.toggle("hidden");
  };

  const handleProjectNewButton = function (event) {
    openCreateProjectDialog();
  };

  const handleTodoEditButton = function (event) {
    const element = event.target;
    openEditTodoDialog(element.dataset.todoId);
  };

  const handleTodoDeleteButton = function (event) {
    const todoId = event.target.dataset.todoId;
    state.deleteTodo(todoId);
    // TODO - update localStorage
    renderTodos(
      state.getTodos({
        projectId: state.getCurrentProjectId(),
      })
    );
  };

  const handleTodoCancelButton = function (event) {
    todoDialog.close();
  };

  const handleTodoSubmitButton = function (event) {
    // do nothing if the submit button was not clicked
    // if the form was submitted as a create todo (has a hidden input with value "create")
    //   create a new todo with the data in the form
    //   update the state
    //   update the state in local storage
    //   if the new todo was created with a new project name
    //     create a new project with that name
    //     set the current project id with that new project id in the state
    //     update the state in the local storage
    //     re-render the projects select with that new project option selected
    //   re-render the todos under the selected project id

    const todoArgs = {
      id: todoIdInput.value,
      // projectId: "TODO",
      title: todoTitleInput.value,
      dueDate: todoDueDateInput.value,
      priority: Number.parseInt(todoPriorityInput.value),
      description: todoDescriptionInput,
    };
  };

  const handleProjectCancelButton = function (event) {
    projectDialog.close();
  };

  const handleProjectSubmitButton = function (event) {
    // create new project
    // update state (projects, currentProjectId)
    // update localStorage
    // re-render projects component (select options)
  };

  const handleClick = function (event) {
    const element = event.target;
    if (element.dataset.inputType === "todo-new-button") {
      handleTodoNewButton(event);
    } else if (element.dataset.inputType === "todo-cancel-button") {
      handleTodoCancelButton(event);
    } else if (element.dataset.inputType === "todo-submit-button") {
      handleTodoSubmitButton(event);
    } else if (element.dataset.inputType === "todo-more-button") {
      handleTodoMoreButton(event);
    } else if (element.dataset.inputType === "todo-less-button") {
      handleTodoLessButton(event);
    } else if (element.dataset.inputType === "todo-edit-button") {
      handleTodoEditButton(event);
    } else if (element.dataset.inputType === "todo-delete-button") {
      handleTodoDeleteButton(event);
    } else if (element.dataset.inputType === "project-new-button") {
      handleProjectNewButton(event);
    } else if (element.dataset.inputType === "project-cancel-button") {
      handleProjectCancelButton(event);
    } else if (element.dataset.inputType === "project-submit-button") {
      handleProjectSubmitButton(event);
    }
  };

  const attachEventListeners = function (containerElement) {
    containerElement.addEventListener("click", handleClick);
    containerElement.addEventListener("change", handleIsDoneCheckbox);
    projectIdSelect.addEventListener("change", handleProjectIdSelect);
  };

  return {
    renderProjects,
    renderTodos,
    openCreateTodoDialog,
    openEditTodoDialog,
    renderPriorities,
    attachEventListeners,
  };
};

export default displayController;
