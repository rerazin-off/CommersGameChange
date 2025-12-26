function enableDragAndDrop() {
    const blocks = document.querySelectorAll('.block');
    const dropZone = document.getElementById('dropZone');

    blocks.forEach(block => {
        block.draggable = true;

        block.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData("text/plain", block.innerText);
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const name = e.dataTransfer.getData("text/plain");
        addBlockToCanvas(name);
    });
}



function enableInnerDrop() {
    const innerZones = document.querySelectorAll('[blocks-inner="true"]');

    innerZones.forEach(zone => {
        zone.addEventListener('dragover', e => {
            e.preventDefault();
        });

        zone.addEventListener('drop', e => {
            e.preventDefault();

            const name = e.dataTransfer.getData("text/plain");

            if (name === "Header" || name === "Main" || name === "Footer") {
                alert("Эти блоки нельзя вставлять внутрь MAIN");
                return;
            }

            const innerBlock = document.createElement("div");
            innerBlock.className = `block-visual block-${name.toLowerCase()}`;
            innerBlock.dataset.name = name;

            innerBlock.innerHTML = `
                <div class="delete-btn">×</div>
                ${BLOCK_TEMPLATES[name]}
            `;

            innerBlock.querySelector(".delete-btn").onclick = () => {
                innerBlock.remove();
            };

            zone.appendChild(innerBlock);
        });
    });
}
