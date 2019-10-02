///////////////
// Main script for interactions with window

window.addEventListener("load", () => startDesign());

function startDesign() {
  const $canvas = document.getElementById("game-canvas");
  const $exportButton = document.getElementById("export-button");
  $exportButton.addEventListener("click", () => {
    const img = $canvas.toDataURL("image/png");
    const $img = document.getElementById("image-goes-here");
    $img.innerHTML = `<img src="${img}" alt="my azulejo design" />`;
  });

  const game = new Drawing($canvas);
  game.startMenu();
}
