function addStartEvent() {
    const startButton = document.querySelector(".start-button");
    const tiles = document.querySelectorAll(".tile");
    startButton.addEventListener("click", () => {
        startButton.classList.remove("start-button");
        
        tiles.forEach((tile, index) => {
            setTimeout(() => {
                tile.classList.add("become-visible");
            }, index * 100);
        });
    });
}

addStartEvent();