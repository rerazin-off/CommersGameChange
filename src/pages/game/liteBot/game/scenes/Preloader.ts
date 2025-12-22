import { Scene } from 'phaser';
import {Game_Level2} from "./Game_Level2.ts";
import {Test} from "./Test.ts";

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        
    }
    
    preload ()
    {
        // Загрузка изображений
        this.load.image('background', 'src/assets/img/game_assets/litebot-img/bgFullHD.jpg');
        this.load.image('finish', 'src/assets/img/game_assets/litebot-img/finish.png');
        this.load.image('delete', 'src/assets/img/game_assets/litebot-img/delete.png');
        this.load.spritesheet('robot', 'src/assets/img/game_assets/litebot-img/robot-up.png', { frameWidth: 100, frameHeight: 70 });
        this.load.spritesheet('robot_left', 'src/assets/img/game_assets/litebot-img/robot-left.png', { frameWidth: 100, frameHeight: 70 });
        this.load.spritesheet('robot_right', 'src/assets/img/game_assets/litebot-img/robot-right.png', { frameWidth: 100, frameHeight: 70 });
        this.load.spritesheet('robot_down', 'src/assets/img/game_assets/litebot-img/robot-down.png', { frameWidth: 100, frameHeight: 70 });
        this.load.spritesheet('robot_stay_left', 'src/assets/img/game_assets/litebot-img/robot_stay_left.png', { frameWidth: 100, frameHeight: 70 });
        this.load.spritesheet('robot_stay_right', 'src/assets/img/game_assets/litebot-img/robot_stay_right.png', { frameWidth: 100, frameHeight: 70 });

        //изображения для победы
        this.load.image('finish_img1', 'src/assets/img/game_assets/litebot-img/finish/1.jpg');
        this.load.image('finish_img2', 'src/assets/img/game_assets/litebot-img/finish/2.jpg');
        this.load.image('finish_img3', 'src/assets/img/game_assets/litebot-img/finish/3.jpg');
        this.load.image('finish_img4', 'src/assets/img/game_assets/litebot-img/finish/4.jpg');
        this.load.image('finish_img5', 'src/assets/img/game_assets/litebot-img/finish/5.jpg');
        
    }

    create ()
    {
        let startGame =  true;
        this.scene.start('Game_Level1', {startGame});
    }
}
