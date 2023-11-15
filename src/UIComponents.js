"use strict";

const projectComponent = function (args) {
  const { id, name, isCurrent } = args;
  const element = document.createElement("option");
  element.value = id;
  element.textContent = name;
  element.selected = isCurrent ? true : false;
  return element;
};

const todoComponent = function (args) {
  const { id, title, description, dueDate, priority, isDone } = args;

  const element = document.createElement("div");
  element.classList.add("todo-item");
  const innerContent = `
    <div class="flex flex-row gap-x-2 mb-2">
      <div class="">
        <label
          for="is-done-${id}"
          class="absolute -left-[200%] h-0"
          >Done?</label
        >
        <input
          type="checkbox"
          name="is-done-${id}"
          id="is-done-${id}"
          class="border-black border-2 rounded-lg p-2"
          data-checkbox-type="is-done"
          data-todo-id="${id}"
          value="${id}"
          ${isDone ? "checked" : ""}
        />
      </div>
      <div class="">
        <p class="text-ellipsis">${title}</p>
        <p class="text-ellipsis">Due on ${dueDate}</p>
        <div
          class="expanded-content overflow-hidden max-h-0"
          data-expanded-content-id="expanded-${id}"
        >
          <p class="text-ellipsis">Priority ${priority}</p>
          <p class="text-ellipsis">${description}</p>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="border-black border-2 rounded-lg p-2"
      data-button-type="more"
      data-todo-id="${id}"
    >
      More
    </button>
    <button
      type="button"
      class="border-black border-2 rounded-lg p-2 hidden"
      data-button-type="less"
      data-todo-id="${id}"
    >
      Less
    </button>
    <button
      type="button"
      class="border-black border-2 rounded-lg p-2"
      data-button-type="edit"
      data-todo-id="${id}"
    >
      Edit
    </button>
    <button
      type="button"
      class="border-black border-2 rounded-lg p-2"
      data-button-type="delete"
      data-todo-id="${id}"
    >
      Delete
    </button>
  `;
  element.insertAdjacentHTML("beforeend", innerContent);
  return element;
};

const priorityComponent = function (args) {
  const { priority, isSelected } = args;
  const element = document.createElement("option");
  element.value = priority;
  element.textContent = priority;
  element.selected = isSelected;
  return element;
};

export { projectComponent, todoComponent, priorityComponent };
