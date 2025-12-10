const btnAddTask = document.querySelector(".app__button--add-task");
const formAddTask = document.querySelector(".app__form-add-task");
const formTextArea = document.querySelector(".app__form-textarea");

const tasks = []

btnAddTask.addEventListener("click", () => {
    formAddTask.classList.toggle("hidden");
})

formAddTask.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const task = {
        descricao: formTextArea.value
    }
    tasks.push(task);
    localStorage.setItem("tarefas",JSON.stringify(tasks));
})