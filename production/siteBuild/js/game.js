const BLOCKS = ["Header", "Main", "Footer", "Hero", "Section", "Article", "Sidebar"];

function createBlockList() {
    const list = document.getElementById("blockList");
    BLOCKS.forEach(name => {
        const div = document.createElement("div");
        div.className = "block";
        div.innerText = name;
        div.draggable = true;
        div.ondragstart = (e) => e.dataTransfer.setData("text/plain", name);
        list.appendChild(div);
    });
}

function addBlockToCanvas(name, targetZone) {
    const dropZone = targetZone || document.getElementById("dropZone");

    // Проверки для MAIN и Header/Footer
    // if (!targetZone && name !== "Header" && name !== "Main" && name !== "Footer") {
    //     alert("Этот блок можно ставить только внутрь MAIN");
    //     return;
    // }

    if (name === "Header" && document.querySelector('[blocks-name="Header"]')) {
        alert("Header уже размещён");
        return;
    }
    if (name === "Footer" && document.querySelector('[blocks-name="Footer"]')) {
        alert("Footer уже размещён");
        return;
    }

    // Создаём блок
    const div = document.createElement("div");
    div.className = `block-visual block-${name.toLowerCase()}`;
    div.dataset.name = name;
    div.draggable = true;
    div.ondragstart = (e) => e.dataTransfer.setData("text/plain", name);

    div.innerHTML = `
        <div class="delete-btn">×</div>
        ${BLOCK_TEMPLATES[name]}
    `;

    // Если MAIN — создаём внутреннюю drop-зону
    if (name === "Main") {
        const innerDrop = document.createElement("div");
        innerDrop.className = "inner-drop";
        innerDrop.dataset.inner = "true";
        innerDrop.innerHTML = ``;
        div.appendChild(innerDrop);
        enableInnerDrop(innerDrop); // активируем drop для внутренней зоны
    }

    // Удаление блока
    div.querySelector(".delete-btn").onclick = () => div.remove();

    dropZone.appendChild(div);
}

// Проверка правильности порядка
function checkOrder() {
    // Снимаем прошлую подсветку
    document.querySelectorAll(".block-visual").forEach(el => {
        el.classList.remove("correct", "wrong");
    });

    // Получаем корневые блоки
    const rootBlocks = Array
      .from(document.querySelectorAll("#dropZone > .block-visual"))
      .map(b => b.dataset.name);

    const correctRoot = ["Header", "Main", "Footer"];

    // Подсветка корневых
    const rootElements = Array.from(document.querySelectorAll("#dropZone > .block-visual"));
    rootElements.forEach((el, i) => {
        if (rootBlocks[i] === correctRoot[i]) {
            el.classList.add("correct");
        } else {
            el.classList.add("wrong");
        }
    });

    // Проверка корня
    const rootCorrect = JSON.stringify(rootBlocks) === JSON.stringify(correctRoot);

    // Проверяем внутренние блоки MAIN
    const main = document.querySelector('[blocks-name="Main"] .inner-drop');
    if (!main) {
        alert("MAIN отсутствует!");
        return;
    }

    const insideBlocks = Array
      .from(main.children)
      .filter(c => c.classList.contains("block-visual"))
      .map(b => b.dataset.name);

    const correctInside = ["Hero", "Section", "Article", "Sidebar"];

    // Подсветка внутренних
    const innerElements = Array
      .from(main.children)
      .filter(c => c.classList.contains("block-visual"));

    innerElements.forEach((el, i) => {
        if (insideBlocks[i] === correctInside[i]) {
            el.classList.add("correct");
        } else {
            el.classList.add("wrong");
        }
    });

    // Проверка внутреннего порядка
    const insideCorrect = JSON.stringify(insideBlocks) === JSON.stringify(correctInside);

    // Сообщение студенту
    if (rootCorrect && insideCorrect) {
        alert("Отлично! Структура собрана правильно!");
    } else {
        alert("Есть ошибки! Правильные подсвечены зелёным, ошибки — красным.");
    }
}

// Drag-and-drop для корня
function enableDragAndDrop() {
    const dropZone = document.getElementById("dropZone");

    dropZone.ondragover = (e) => e.preventDefault();
    dropZone.ondrop = (e) => {
        e.preventDefault();
        const name = e.dataTransfer.getData("text/plain");
        addBlockToCanvas(name);
    };
}

// Drag-and-drop для внутренней зоны MAIN
function enableInnerDrop(innerZone) {
    const zone = innerZone || document.querySelectorAll(".inner-drop");
    const zones = zone.length ? zone : [zone];

    zones.forEach(z => {
        z.ondragover = (e) => e.preventDefault();
        z.ondrop = (e) => {
            e.preventDefault();
            e.stopPropagation(); // <--- ВОТ ЭТО ОЧЕНЬ ВАЖНО!

            const name = e.dataTransfer.getData("text/plain");

            if (name === "Header" || name === "Footer" || name === "Main") {
                alert("Эти блоки нельзя помещать внутрь MAIN");
                return;
            }

            addBlockToCanvas(name, z);
        };
    });
}


window.onload = () => {
    createBlockList();
    enableDragAndDrop();
    document.getElementById("checkBtn").onclick = checkOrder;
};



const BLOCK_TEMPLATES = {
    Header: `
        <div class="header-content">
            <div class="logo">LOGO</div>
            <nav class="menu">
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
            </nav>
        </div>
    `,

    Navigation: `
        <div class="nav-content">
            <span>Главная</span>
            <span>Новости</span>
            <span>О компании</span>
            <span>Контакты</span>
        </div>
    `,

    Hero: `
        <div class="hero-content">
            <div class="hero-title">Добро пожаловать!</div>
            <div class="hero-subtitle">Создай свою первую веб-страницу</div>
        </div>
    `,

    Main: `
        <div class="main-content">
            <p>Основной контент страницы.</p>
            <p>Здесь обычно размещают текст, изображения, статьи.</p>
        </div>
    `,

    Section: `
        <div class="section-content">
            <h3>Раздел сайта</h3>
            <div class="cards">
                <div class="card">Карточка 1</div>
                <div class="card">Карточка 2</div>
                <div class="card">Карточка 3</div>
            </div>
        </div>
    `,

    Article: `
        <div class="article-content">
            <h3>Статья</h3>
            <p>Здесь расположен текст статьи. Он может быть длинный, с изображениями и примерами.</p>
        </div>
    `,

    Sidebar: `
        <div class="sidebar-content">
            <h4>Навигация</h4>
            <ul>
                <li>Профиль</li>
                <li>Сообщения</li>
                <li>Настройки</li>
            </ul>
        </div>
    `,

    Footer: `
        <div class="footer-content">
            <div>© 2025 Все права защищены</div>
            <div class="links">
                <span>Политика</span>
                <span>Условия</span>
            </div>
        </div>
    `
};
