//UI
export default function createNewGridUI(user) {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  grid.id = user + "Grid";
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(user + "Index" + i);
    cell.addEventListener("mouseenter", () => {
      cell.classList.add("hover");
    });
    cell.addEventListener("mouseleave", () => {
      cell.classList.remove("hover");
    });

    grid.appendChild(cell);
  }

  document.querySelector(".game").appendChild(grid);
}
