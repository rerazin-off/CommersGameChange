import {EventBus} from '../EventBus';
import {Scene} from 'phaser';

export class Game_Level2 extends Scene {
    private background: Phaser.GameObjects.Image;
    private deleteBtn: Phaser.GameObjects.Image;
    private cellSize: number = 75; // Размер шага
    private fieldX: number = 297;
    private fieldY: number = 137;
    private fieldWidth: number = 560;
    private fieldHeight: number = 560;
    private finishX: number; // Координаты финишной клетки
    private finishY: number;

    private robot: Phaser.Physics.Arcade.Sprite;
    private finishImg: Phaser.GameObjects.Image;
    private moveQueue: string[] = [];
    private commandText: Phaser.GameObjects.Text;
    private currentDirection: string = 'down';
    private isExecuting: boolean = false;

    // Кнопки
    private robotButton: Phaser.GameObjects.Container;
    private moveButton: Phaser.GameObjects.Container;
    private rotateButton: Phaser.GameObjects.Container;
    private stepButtons: Phaser.GameObjects.Container[] = [];
    private addNewLine: boolean = false;
    private commandTextContainer: Phaser.GameObjects.Container;
    private currentX: number = 0;
    private currentY: number = 0;
    private commandTextMatrix = [];
    private isFirstUse = true;
    private limitTaskText: Phaser.GameObjects.Text;


    backgroundModal: Phaser.GameObjects.Graphics;
    modalBackground: Phaser.GameObjects.Graphics;

    startGame: boolean;

    init(data: any){
        this.startGame = data.startGame;
    }

    constructor() {
        super('Game_Level2');
    }

    create() {
        // Установка фона
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        // Финальная клетка
        this.finishX = this.fieldX + this.cellSize * 4 + this.cellSize / 2 + 3; // Координаты финишной клетки
        this.finishY = this.fieldY + this.cellSize * 5 + this.cellSize / 2 + this.cellSize/5.5;
        this.add.image(this.finishX, this.finishY, 'finish').setOrigin(0.5, 0.5);

        // Создание робота
        this.robot = this.physics.add.sprite(this.fieldX + this.cellSize * 4 + this.cellSize / 2, this.fieldY + this.cellSize + this.cellSize / 2, 'robot_down');
        this.robot.setCollideWorldBounds(true);
        this.robot.setOrigin(0.5, 0.7);

        this.anims.create({
            key: 'up',
            frames: [{ key: 'robot', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'down',
            frames: [{ key: 'robot_down', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'left',
            frames: [{ key: 'robot_left', frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: 'right',
            frames: [{ key: 'robot_right', frame: 0 }],
            frameRate: 10,
        });

        // Установка границ области для робота
        this.physics.world.setBounds(this.fieldX, this.fieldY, this.fieldWidth, this.fieldHeight);
        this.robot.body.setCollideWorldBounds(true);
        this.robot.body.onWorldBounds = true;

        let titleLevel = this.add.graphics();
        titleLevel.fillStyle(0xFFFFFF);
        titleLevel.fillRoundedRect(this.sys.game.config.width as number / 2 + 50, 20, 850, 100, 15);

        this.add.text(this.sys.game.config.width as number / 2 + 210, 42, 'Чтобы узнать историю развития ЭВМ, вам \n необходимо написать команды для робота.', {
            fontFamily: 'Montserrat',
            fontSize: 24,
            color: '#000000',
            align: 'center',

        });

        this.commandText = this.add.text(1000, 150, '', {
            fontSize: '24px',
            fill: '#00e9f0',
            fontFamily: 'Montserrat',
            fontStyle: 'bold',
        });
        this.commandTextContainer = this.add.container(1000, 150);


        // Создание кнопки "Robot"
        var radiusModal = 10; // Радиус закругления углов
        var widthModal = 140; // Ширина прямоугольника
        var heightModal = 45; // Высота прямоугольника
        var borderWidth = 2; // Ширина границы
        var borderColor = 0x00e9f0; // Цвет границы
        var fillColor = 0x00e9f0; // Цвет заливки по умолчанию
        var textColor = '#ffffff'; // Цвет текста по умолчанию

        // Создаем текстовый объект
        var robotTextBtn = this.add.text(0, 0, 'Robot', {
            fontSize: '24px',
            color: textColor,
            fontFamily: 'Montserrat',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Создаем контейнер для текста и фона
        this.robotButton = this.add.container(this.sys.game.config.width as number / 2 + 120, 870, [robotTextBtn]);

        // Создаем графический объект для фона кнопки
        var backgroundModal = this.add.graphics();
        backgroundModal.lineStyle(borderWidth, borderColor, 1);
        backgroundModal.fillStyle(fillColor, 1); // Устанавливаем цвет фона
        backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем закругленный прямоугольник
        backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем границу
        this.robotButton.addAt(backgroundModal, 0); // Добавляем фон в контейнер

        // Добавляем интерактивность к контейнеру
        this.robotButton.setSize(widthModal, heightModal);
        this.robotButton.setInteractive({ useHandCursor: true });

        // Функция обновления фона и текста
        const updaterobotButtonStyle = (bgColor: number, txtColor: string) => {
            backgroundModal.clear();
            backgroundModal.lineStyle(borderWidth, borderColor, 1);
            backgroundModal.fillStyle(bgColor, 1);
            backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
            backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
            robotTextBtn.setColor(txtColor);
        };

        // Добавляем обработчики событий для взаимодействия с кнопкой
        this.robotButton.on('pointerover', () => {
            updaterobotButtonStyle(0xffffff, '#00e9f0'); // Белый фон и красный текст при наведении
        });

        this.robotButton.on('pointerout', () => {
            updaterobotButtonStyle(0x00e9f0, '#ffffff'); // Возвращаем оригинальные цвета
        });

        this.robotButton.on('pointerdown', () => {
            updaterobotButtonStyle(0xffffff, '#00e9f0'); // Белый фон и красный текст при нажатии
            // Действие при нажатии на кнопку
            this.showMoveButtons()
        });

        this.robotButton.on('pointerup', () => {
            updaterobotButtonStyle(0xffffff, '#00e9f0'); // Белый фон и красный текст при отпускании
        });


        //Запустить
        var startTextBtn = this.add.text(0, 0, 'Запустить', {
            fontSize: '24px',
            color: '#3e3e40',
            fontFamily: 'Montserrat',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Создаем контейнер для текста и фона
        this.moveButton = this.add.container(this.sys.game.config.width as number - 130, 870, [startTextBtn]);

        // Создаем графический объект для фона кнопки
        var startBtnBg = this.add.graphics();
        startBtnBg.lineStyle(2, 0xffffff, 1);
        startBtnBg.fillStyle(0xe7cb2b, 1); // Устанавливаем цвет фона
        startBtnBg.fillRoundedRect(-200 / 2, -45 / 2, 200, 45, 10); // Рисуем закругленный прямоугольник
        startBtnBg.strokeRoundedRect(-200 / 2, -45 / 2, 200, 45, 10); // Рисуем границу
        this.moveButton.addAt(startBtnBg, 0); // Добавляем фон в контейнер

        // Добавляем интерактивность к контейнеру
        this.moveButton.setSize(200, 45);
        this.moveButton.setInteractive({ useHandCursor: true });

        // Функция обновления фона и текста
        const updatestartButtonStyle = (bgColor: number, txtColor: string) => {
            startBtnBg.clear();
            startBtnBg.lineStyle(2, 0xffffff, 1);
            startBtnBg.fillStyle(bgColor, 1);
            startBtnBg.fillRoundedRect(-200 / 2, -45 / 2, 200, 45, 10);
            startBtnBg.strokeRoundedRect(-200 / 2, -45 / 2, 200, 45, 10);
            startTextBtn.setColor(txtColor);
        };

        // Добавляем обработчики событий для взаимодействия с кнопкой
        this.moveButton.on('pointerover', () => {
            updatestartButtonStyle(0x3e3e40, '#fff'); // Белый фон и красный текст при наведении
        });

        this.moveButton.on('pointerout', () => {
            updatestartButtonStyle(0xe7cb2b, '#3e3e40'); // Возвращаем оригинальные цвета
        });

        this.moveButton.on('pointerdown', () => {
            updatestartButtonStyle(0x3e3e40, '#fff'); // Белый фон и красный текст при нажатии
            // Действие при нажатии на кнопку
            this.startMoveTasks()
        });

        this.moveButton.on('pointerup', () => {
            updatestartButtonStyle(0x3e3e40, '#fff'); // Белый фон и красный текст при отпускании
        });

        //Сброс всех параметров
        this.moveQueue = [];
        this.commandText.setText('');
        this.addNewLine = false;
        this.currentDirection = 'down';
        this.currentY = 0;
        this.isFirstUse = true;

        EventBus.emit('current-scene-ready', this);
    }

    showMoveButtons() {

        // Отключение кнопки "Robot"
        this.robotButton.disableInteractive();

        // Создание кнопки "Move"
        var moveTextBtn = this.add.text(0, 0, 'Move', {
            fontSize: '24px',
            color: '#fff',
            fontFamily: 'Montserrat',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Создаем контейнер для текста и фона
        this.moveButton = this.add.container(this.sys.game.config.width as number / 2 + 114, 790, [moveTextBtn]);

        // Создаем графический объект для фона кнопки
        var moveBtnBg = this.add.graphics();
        moveBtnBg.lineStyle(2, 0xffffff, 1);
        moveBtnBg.fillStyle(0x4db200, 1); // Устанавливаем цвет фона
        moveBtnBg.fillRoundedRect(-130 / 2, -45 / 2, 130, 45, 10); // Рисуем закругленный прямоугольник
        moveBtnBg.strokeRoundedRect(-130 / 2, -45 / 2, 130, 45, 10); // Рисуем границу
        this.moveButton.addAt(moveBtnBg, 0); // Добавляем фон в контейнер

        // Добавляем интерактивность к контейнеру
        this.moveButton.setSize(130, 45);
        this.moveButton.setInteractive({ useHandCursor: true });

        // Функция обновления фона и текста
        const updateMoveButtonStyle = (bgColor: number, txtColor: string) => {
            moveBtnBg.clear();
            moveBtnBg.lineStyle(2, 0xffffff, 1);
            moveBtnBg.fillStyle(bgColor, 1);
            moveBtnBg.fillRoundedRect(-130 / 2, -45 / 2, 130, 45, 10);
            moveBtnBg.strokeRoundedRect(-130 / 2, -45 / 2, 130, 45, 10);
            moveTextBtn.setColor(txtColor);
        };
        // Добавляем обработчики событий для взаимодействия с кнопкой
        this.moveButton.on('pointerover', () => {
            updateMoveButtonStyle(0xffffff, '#4db200'); // Белый фон и красный текст при наведении
        });
        this.moveButton.on('pointerout', () => {
            updateMoveButtonStyle(0x4db200, '#ffffff'); // Возвращаем оригинальные цвета
        });
        this.moveButton.on('pointerdown', () => {
            updateMoveButtonStyle(0xffffff, '#4db200'); // Белый фон и красный текст при нажатии
            // Действие при нажатии на кнопку
            this.showStepButtons();
            this.turnBtnDisable();
        });
        this.moveButton.on('pointerup', () => {
            updateMoveButtonStyle(0xffffff, '#4db200'); // Белый фон и красный текст при отпускании
        });
        this.tweens.add({
            targets: [this.moveButton, this.rotateButton],
            alpha: { from: 0, to: 1 },
            duration: 500,
        });
        this.addCommandText('Robot.', '#00e9f0', true);
    }

    showStepButtons() {
        this.addCommandText('move ', '#4db200');
        // Создание кнопок для выбора количества шагов
        // Создание кнопок для выбора количества шагов
        const buttonWidth = 40; // Ширина кнопки
        const buttonSpacing = 10; // Расстояние между кнопками
        const totalButtons = 6; // Общее количество кнопок
        const startX = (this.sys.game.config.width as number) / 2 + 74 ;

        for (let i = 1; i <= totalButtons; i++) {
            let stepButtonText = this.add.text(0, 0, `${i}`, {
                fontSize: '24px',
                color: '#fff',
                fontFamily: 'Montserrat',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            // Создаем контейнер для текста и фона
            let stepButton = this.add.container(startX + (i - 1) * (buttonWidth + buttonSpacing), 710, [stepButtonText]);

            // Создаем графический объект для фона кнопки
            let stepBtnBg = this.add.graphics();
            stepBtnBg.lineStyle(2, 0xffffff, 1);
            stepBtnBg.fillStyle(0xfe027d, 1); // Устанавливаем цвет фона
            stepBtnBg.fillRoundedRect(-buttonWidth / 2, -45 / 2, buttonWidth, 45, 10); // Рисуем закругленный прямоугольник
            stepBtnBg.strokeRoundedRect(-buttonWidth / 2, -45 / 2, buttonWidth, 45, 10); // Рисуем границу
            stepButton.addAt(stepBtnBg, 0); // Добавляем фон в контейнер

            // Добавляем интерактивность к контейнеру
            stepButton.setSize(buttonWidth, 45);
            stepButton.setInteractive({ useHandCursor: true });

            // Функция обновления фона и текста
            const updateStepButtonStyle = (bgColor, txtColor) => {
                stepBtnBg.clear();
                stepBtnBg.lineStyle(2, 0xffffff, 1);
                stepBtnBg.fillStyle(bgColor, 1);
                stepBtnBg.fillRoundedRect(-buttonWidth / 2, -45 / 2, buttonWidth, 45, 10);
                stepBtnBg.strokeRoundedRect(-buttonWidth / 2, -45 / 2, buttonWidth, 45, 10);
                stepButtonText.setColor(txtColor);
            };

            // Добавляем обработчики событий для взаимодействия с кнопкой
            stepButton.on('pointerover', () => {
                updateStepButtonStyle(0xffffff, '#fe027d'); // Белый фон и красный текст при наведении
            });
            stepButton.on('pointerout', () => {
                updateStepButtonStyle(0xfe027d, '#ffffff'); // Возвращаем оригинальные цвета
            });
            stepButton.on('pointerdown', () => {
                updateStepButtonStyle(0xffffff, '#fe027d'); // Белый фон и красный текст при нажатии
                // Действие при нажатии на кнопку
                this.addMoveTask(`forward ${i}`);
                this.hideStepButtons();
                this.hideMoveButtons();
                this.resetRobotButton();
                // Добавляем только цифру в текст команд
                this.addCommandText(i, '#fe027d');
            });
            stepButton.on('pointerup', () => {
                updateStepButtonStyle(0xffffff, '#fe027d'); // Белый фон и красный текст при отпускании
            });

            this.stepButtons.push(stepButton);

            // Анимация появления кнопок
            this.tweens.add({
                targets: stepButton,
                alpha: { from: 0, to: 1 },
                duration: 500,
                delay: i * 100,
            });
        }
    }

    turnBtnDisable() {
        this.moveButton.disableInteractive();
    }

    resetRobotButton() {
        this.robotButton.setInteractive();
    }

    hideMoveButtons() {
        if (this.moveButton) {
            this.moveButton.destroy();
        }
        if (this.rotateButton) {
            this.rotateButton.destroy();
        }
    }

    hideStepButtons() {
        this.stepButtons.forEach(button => button.destroy());
        this.stepButtons = [];
    }

    addMoveTask(action: string) {
        this.moveQueue.push(action);
        this.addNewLine = true;
    }

    startMoveTasks() {
        if (!this.isExecuting && this.moveQueue.length > 0) {
            this.isExecuting = true;
            this.executeMoveTask();
        } else {
            console.log(`Нет задач`);
        }
    }

    executeMoveTask() {
        console.log(this.moveQueue)

        if (this.moveQueue.length === 0) {
            this.isExecuting = false;
            this.checkFinish();
            return;
        }

        const action = this.moveQueue.shift()!;
        const [command, steps] = action.split(' ');

        // В зависимости от действия выполняем нужное действие
        switch (command) {
            case 'forward':
                this.time.delayedCall(200, () => {
                    this.moveForward(parseInt(steps, 10));
                });
                break;
            default:
                console.log(`Неизвестное действие: ${action}`);
        }

    }

    moveForward(steps: number) {
        // Двигаем робота в текущем направлении
        let deltaX = 0, deltaY = 0;

        switch (this.currentDirection) {
            case 'up':
                deltaY = -this.cellSize * steps;
                this.robot.anims.play('up', true);
                break;
            case 'right':
                deltaX = this.cellSize * steps;
                this.robot.anims.play('right', true);
                break;
            case 'down':
                deltaY = this.cellSize * steps;
                this.robot.anims.play('down', true);
                break;
            case 'left':
                deltaX = -this.cellSize * steps;
                this.robot.anims.play('left', true);
                break;
        }

        const newX = this.robot.x + deltaX;
        const newY = this.robot.y + deltaY;

        // Проверка, находится ли новое положение робота внутри границ
        if (newX >= this.fieldX + this.cellSize / 2 && newX <= this.fieldX + this.fieldWidth - this.cellSize / 2 &&
            newY >= this.fieldY + this.cellSize / 2 && newY <= this.fieldY + this.fieldHeight - this.cellSize / 2) {
            this.tweens.add({
                targets: this.robot,
                x: newX,
                y: newY,
                duration: 500 * steps,
                onComplete: () => {
                    this.robot.anims.stop();
                    if (this.currentDirection === 'right') {
                        this.robot.setTexture('robot_stay_right'); // Возвращаем текстуру к robot_stay_right
                    } else if (this.currentDirection === 'left') {
                        this.robot.setTexture('robot_stay_left'); // Возвращаем текстуру к robot_stay_left
                    }
                    this.executeMoveTask();
                }
            });
        } else {
            // Если новое положение вне границ, пропускаем эту задачу и переходим к следующей
            if (this.currentDirection === 'right') {
                this.robot.setTexture('robot_stay_right'); // Возвращаем текстуру к robot_stay_right
            } else if (this.currentDirection === 'left') {
                this.robot.setTexture('robot_stay_left'); // Возвращаем текстуру к robot_stay_left
            }
            this.executeMoveTask();
        }
    }

    addCommandText(text: string, color: string, newLine: boolean = false) {
        const countMoveQueue = this.commandTextContainer.length;
        if (countMoveQueue < 1){
            this.isFirstUse = true;
        }
        if (countMoveQueue > 12 && newLine) {
            this.limitTaskText = this.add.text(1420, 720 , 'Превышен лимит команд!', {
                fontSize: '24px',
                color: '#e7cb2b',
                fontFamily: 'Montserrat',
                fontStyle: 'bold'
            }).setOrigin(0.5);
            this.robotButton.disableInteractive();
            this.hideMoveButtons();
        } else {
            if (newLine) {
                if (this.isFirstUse){
                    this.currentY = 0;
                }else{
                    this.currentY +=40;
                }
                this.isFirstUse = false;
                this.currentX = 0;

                const commandContainer = this.add.container(this.currentX, this.currentY);

                const commandText = this.add.text(0, 0, text, {
                    fontFamily: 'Montserrat',
                    fontSize: 24,
                    color: color,
                    align: 'left',
                });

                // Создаем кнопку удаления и устанавливаем ее на нужную позицию
                const deleteBtn = this.add.image(800, 12, 'delete')
                    .setScale(0.07, 0.07)
                    .setInteractive()
                    .setOrigin(0.5, 0.5);

                // Добавляем обработчик нажатия на кнопку удаления
                deleteBtn.on('pointerdown', () => {
                    this.deleteTask(commandContainer);
                });

                // Добавляем текст и кнопку в контейнер команды
                commandContainer.add(commandText);
                commandContainer.add(deleteBtn);

                // Добавляем контейнер команды в основной контейнер
                this.commandTextContainer.add(commandContainer);
                // Добавляем контейнер команды в двумерный массив
                this.commandTextMatrix.push(commandContainer);

            } else {
                // Создаем текстовый объект для одного слова
                const commandText = this.add.text(this.currentX + 80, 0, text, {
                    fontFamily: 'Montserrat',
                    fontSize: 24,
                    color: color,
                    align: 'left',
                });
                // Добавляем текст в основной контейнер
                this.commandTextContainer.add(commandText);

                // Обновляем текущую позицию X
                this.currentX += commandText.width + 10;

                // Добавляем текст в последний контейнер строки команды
                if (this.commandTextMatrix.length > 0) {
                    const lastCommandContainer = this.commandTextMatrix[this.commandTextMatrix.length - 1];
                    lastCommandContainer.add(commandText);
                }
            }
        }
    }

    deleteTask(commandContainer: Phaser.GameObjects.Container, text: string) {
        // Удаляем контейнер из commandTextMatrix и с экрана
        const index = this.commandTextMatrix.indexOf(commandContainer);
        if (index !== -1) {
            this.commandTextMatrix.splice(index, 1);
            this.moveQueue.splice(index, 1);
            commandContainer.destroy();
        }
        this.hideMoveButtons();
        this.hideStepButtons();
        this.updateCommandPositions();
    }

    updateCommandPositions(){
        this.currentY = 0;
        this.commandTextMatrix.forEach((commandContainer, rowIndex) => {
            commandContainer.y = this.currentY;
            if (rowIndex < this.commandTextMatrix.length - 1) {
                this.currentY += 40;
            }
        });
        this.resetRobotButton();
        this.limitTaskText.destroy();
    }

    checkFinish() {
        const tolerance = this.cellSize / 4; // Допустимое отклонение для проверки
        const distance = Phaser.Math.Distance.Between(this.robot.x, this.robot.y, this.finishX, this.finishY);

        console.log(`Робот координаты: (${this.robot.x}, ${this.robot.y}), Финиш координаты: (${this.finishX}, ${this.finishY}), Расстояние: ${distance}`);

        if (distance < tolerance) {
            this.showModal(tolerance, distance);
            this.moveQueue = [];
        } else {
            this.showModal(tolerance, distance);
        }
    }

    showModal(tolerance: number, distance: number) {
        // Затемнение фона и остальные элементы модального окна создаются после задержки
        this.time.delayedCall(1000, () => {
            this.backgroundModal = this.add.graphics();
            this.backgroundModal.fillStyle(0x000000, 0.8);
            this.backgroundModal.fillRect(0, 0 , this.sys.game.config.width as number, this.sys.game.config.height as number)
            // Create the backgroundModal for the modal window
            this.modalBackground = this.add.graphics();
            this.modalBackground.fillStyle(0xFFFFFF);
            this.modalBackground.fillRoundedRect(this.sys.game.config.width as number / 2 - 435, 200, 870, 440, 100);

            if (distance < tolerance){
                // Create the title text
                let title = this.add.text(this.sys.game.config.width as number / 2, 50, 'Уровень пройден!', {
                    fontFamily: 'Montserrat',
                    fontSize: 36,
                    color: '#000000',
                    align: 'center',
                }).setOrigin(0.5, 0.5);

                // Create the description text
                this.finishImg = this.add.image(this.sys.game.config.width as number / 2, this.sys.game.config.height as number / 2 - 50, 'finish_img2')
                    .setOrigin(0.5, 0.5);

                var radiusModal = 10; // Радиус закругления углов
                var widthModal = 350; // Ширина прямоугольника
                var heightModal = 66; // Высота прямоугольника
                var borderWidth = 2; // Ширина границы
                var borderColor = 0x00efa6; // Цвет границы
                var fillColor = 0x00efa6; // Цвет заливки по умолчанию
                var textColor = '#ffffff'; // Цвет текста по умолчанию

                // Создаем текстовый объект
                var text = this.add.text(0, 0, 'Следующий уровень', {
                    fontSize: '28px',
                    color: textColor,
                    fontFamily: 'Montserrat',
                    fontStyle: 'bold'
                }).setOrigin(0.5);

                // Создаем контейнер для текста и фона
                var button = this.add.container(this.sys.game.config.width as number / 2, 830, [text]);

                // Создаем графический объект для фона кнопки
                var backgroundModal = this.add.graphics();
                backgroundModal.lineStyle(borderWidth, borderColor, 1);
                backgroundModal.fillStyle(fillColor, 1); // Устанавливаем цвет фона
                backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем закругленный прямоугольник
                backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем границу
                button.addAt(backgroundModal, 0); // Добавляем фон в контейнер

                // Добавляем интерактивность к контейнеру
                button.setSize(widthModal, heightModal);
                button.setInteractive({ useHandCursor: true });

                // Функция обновления фона и текста
                const updateButtonStyle = (bgColor: number, txtColor: string) => {
                    backgroundModal.clear();
                    backgroundModal.lineStyle(borderWidth, borderColor, 1);
                    backgroundModal.fillStyle(bgColor, 1);
                    backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
                    backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
                    text.setColor(txtColor);
                };

                // Добавляем обработчики событий для взаимодействия с кнопкой
                button.on('pointerover', () => {
                    updateButtonStyle(0xffffff, '#00ff99'); // Белый фон и красный текст при наведении
                });

                button.on('pointerout', () => {
                    updateButtonStyle(0x00ff99, '#ffffff'); // Возвращаем оригинальные цвета
                });

                button.on('pointerdown', () => {
                    updateButtonStyle(0xffffff, '#00efa6'); // Белый фон и красный текст при нажатии
                    // Действие при нажатии на кнопку

                    this.scene.start('Game_Level3');
                });

                button.on('pointerup', () => {
                    updateButtonStyle(0xffffff, '#00ff99'); // Белый фон и красный текст при отпускании
                });

            }else {

                // Create the title text
                let title = this.add.text(this.sys.game.config.width as number / 2 - 85, 250, 'Ошибка', {
                    fontFamily: 'Montserrat',
                    fontStyle: 'bold',
                    fontSize: 36,
                    color: '#000000',
                    align: 'center',
                });

                // Create the description text
                let description = this.add.text(this.sys.game.config.width as number / 2 - 310, 400, 'В коде допущена ошибка. Попробуйте еще раз.', {
                    fontFamily: 'Montserrat',
                    fontSize: 26,
                    color: '#000000',
                    align: 'center',
                });

                var radiusModal = 10; // Радиус закругления углов
                var widthModal = 320; // Ширина прямоугольника
                var heightModal = 66; // Высота прямоугольника
                var borderWidth = 2; // Ширина границы
                var borderColor = 0xf7005b; // Цвет границы
                var fillColor = 0xf7005b; // Цвет заливки по умолчанию
                var textColor = '#ffffff'; // Цвет текста по умолчанию

                // Создаем текстовый объект
                var text = this.add.text(0, 0, 'Начать сначала', {
                    fontSize: '28px',
                    color: textColor,
                    fontFamily: 'Montserrat',
                    fontStyle: 'bold'
                }).setOrigin(0.5);

                // Создаем контейнер для текста и фона
                var button = this.add.container(this.sys.game.config.width as number / 2, 560, [text]);

                // Создаем графический объект для фона кнопки
                var backgroundModal = this.add.graphics();
                backgroundModal.lineStyle(borderWidth, borderColor, 1);
                backgroundModal.fillStyle(fillColor, 1); // Устанавливаем цвет фона
                backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем закругленный прямоугольник
                backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal); // Рисуем границу
                button.addAt(backgroundModal, 0); // Добавляем фон в контейнер

                // Добавляем интерактивность к контейнеру
                button.setSize(widthModal, heightModal);
                button.setInteractive({ useHandCursor: true });

                // Функция обновления фона и текста
                const updateButtonStyle = (bgColor: number, txtColor: string) => {
                    backgroundModal.clear();
                    backgroundModal.lineStyle(borderWidth, borderColor, 1);
                    backgroundModal.fillStyle(bgColor, 1);
                    backgroundModal.fillRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
                    backgroundModal.strokeRoundedRect(-widthModal / 2, -heightModal / 2, widthModal, heightModal, radiusModal);
                    text.setColor(txtColor);
                };

                // Добавляем обработчики событий для взаимодействия с кнопкой
                button.on('pointerover', () => {
                    updateButtonStyle(0xffffff, '#f7005b'); // Белый фон и красный текст при наведении
                });

                button.on('pointerout', () => {
                    updateButtonStyle(0xf7005b, '#ffffff'); // Возвращаем оригинальные цвета
                });

                button.on('pointerdown', () => {
                    updateButtonStyle(0xffffff, '#f7005b'); // Белый фон и красный текст при нажатии
                    // Действие при нажатии на кнопку
                    this.scene.restart()
                });

                button.on('pointerup', () => {
                    updateButtonStyle(0xffffff, '#f7005b'); // Белый фон и красный текст при отпускании
                });


            }
        }, [], this);
    }

}
