import imgPerson2 from '../../../assets/img/game_assets/pensionGalaxy-img/person2.svg';
import imgPerson3 from '../../../assets/img/game_assets/pensionGalaxy-img/person3.svg';
import imgPerson4 from '../../../assets/img/game_assets/pensionGalaxy-img/person4.svg';
import imgPerson5 from '../../../assets/img/game_assets/pensionGalaxy-img/person5.svg';
import imgPerson6 from '../../../assets/img/game_assets/pensionGalaxy-img/person6.svg';
import imgPerson7 from '../../../assets/img/game_assets/pensionGalaxy-img/person7.svg';
import imgPerson8 from '../../../assets/img/game_assets/pensionGalaxy-img/person8.svg';
import imgPerson25 from '../../../assets/img/game_assets/pensionGalaxy-img/person25.svg';
import condition1 from '../../../assets/img/game_assets/pensionGalaxy-img/condition1.svg';
import condition2 from '../../../assets/img/game_assets/pensionGalaxy-img/condition2.svg';
import condition3 from '../../../assets/img/game_assets/pensionGalaxy-img/condition3.svg';
import condition4 from '../../../assets/img/game_assets/pensionGalaxy-img/condition4.svg';

export const Persons = [
  {
    id: 1,
    name: 'Максим',
    img: imgPerson25,
    profession:'Командир звездного десанта',
    mainInf: [
      {name:'стаж', value: '40 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value:
          [
            {coefficient: 2, text:'Участвовал в Третьей Войне с Ксеноморфами'},
            {coefficient:1.5, text:'10 лет служил на планете Корвус-9(гравитация 3G).'}
          ]},
      {name:'средняя зарплата', value: 85000}
    ]
  },
  {
    id: 2,
    name: 'Ева',
    img: imgPerson2,
    profession: 'ДНК-архитектор (создаёт биологические корабли)',
    mainInf: [
      {name:'стаж', value: '67 лет'},
      {name:'раса', value: 'киборг'},
      {name:'особые условия', value: [
          {coefficient: 1.5, text: 'Работала в лаборатории с патогенами (опасные уловия)'}
        ]},
      {name:'средняя зарплата', value: 120000}
    ]
  },
  {
    id: 3,
    name: 'Микара',
    img: imgPerson3,
    profession: 'Ксенолингвистка',
    mainInf: [
      {name:'стаж', value: '73 года'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: [
          {coefficient: 1.5, text:'Работа с опасными языками (например, языком Древних, вызывающим безумие, опасные условия).'}
        ]},
      {name:'средняя зарплата', value: 95000}
    ]
  },
  {
    id: 4,
    name: 'Бион',
    img: imgPerson4,
    profession:'Археолог исчезнувших цивилизаций',
    mainInf: [
      {name:'стаж', value: '30 лет'},
      {name:'раса', value: 'киборг'},
      {name:'особые условия', value: [
          {coefficient:1.7, text: 'Обнаружил артефакты с аномальными свойствами'}
        ]},
      {name:'средняя зарплата', value: 78000}
    ]
  },
  {
    id: 5,
    name: 'Барс',
    img: imgPerson5,
    profession:'Садовник кислотных джунглей Венеры',
    mainInf: [
      {name:'стаж', value: '80 лет'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Выращивал хищные растения для фармацевтики'}
        ]},
      {name:'средняя зарплата', value: 65000}
    ]
  },
  {
    id: 6,
    name: 'Глеб',
    img: imgPerson6,
    profession:'Спасатель',
    mainInf: [
      {name:'стаж', value: '28 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Работа в опасных условиях'}
        ]},
      {name:'средняя зарплата', value: 97000}
    ]
  },
  {
    id: 7,
    name: 'Арчи',
    img: imgPerson7,
    profession:'Композитор гравитационных волн',
    mainInf: [
      {name:'стаж', value: '200 лет'},
      {name:'раса', value: 'инопланетное существо'},
      {name:'особые условия', value: []},
      {name:'средняя зарплата', value: 114000}
    ]
  },
  {
    id: 8,
    name: 'Маркус',
    img: imgPerson8,
    profession:'Охотник на космических пиратов',
    mainInf: [
      {name:'стаж', value: '35 лет'},
      {name:'раса', value: 'человек'},
      {name:'особые условия', value: [
          {coefficient:1.5, text: 'Работа в опасных условиях'}
        ]},
      {name:'средняя зарплата', value: 110000}
    ]
  },
]

export const Conditions = [
  {
    value: 1.5,
    title:'работа в опасных условиях \n' +
      '(гравитация > 2G, радиация, патогены)',
    img: condition1
  },
  {
    value: 1.7,
    title:'работа с аномальными\n' +
      'артефактами',
    img: condition2
  },
  {
    value: 2.0,
    title:'Участие в межгалактических \n' +
      'конфликтах',
    img: condition3
  },
  {
    value: 1.8,
    title:'работа с психоактивными \n' +
      'материалами',
    img: condition4
  },
]

// import React, { useEffect, useRef } from 'react';
// import classes from './PensionGalaxy.module.scss'
//
// const PensionGalaxy = () => {
//   const dragContainerRef = useRef(null);
//   const spinContainerRef = useRef(null);
//   const autoRotateInterval = useRef(null);
//
//   const config = {
//     radius: 500,
//     autoRotate: true,
//     autoRotateSpeed: -0.2,
//     rotateSpeed: -60,
//     bgMusicControls: true
//   };
//
//   // State for rotation
//   const rotation = useRef({
//     sX: 0,
//     sY: 0,
//     nX: 0,
//     nY: 0,
//     desX: 0,
//     desY: 0,
//     tX: 0,
//     tY: 10
//   });
//
//   // Media items
//   const mediaItems = [
//     { type: 'image', src: 'https://images.pexels.com/photos/206395/pexels-photo-206395.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/1462636/pexels-photo-1462636.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: null },
//     { type: 'image', src: 'https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', alt: '', link: 'https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg' },
//     { type: 'image', src: 'https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761', alt: '' }
//   ];
//
//   useEffect(() => {
//     setTimeout(() => init(1000), 1000);
//     document.addEventListener('pointerdown', handlePointerDown);
//     document.addEventListener('wheel', handleWheel);
//
//     // Запускаем автоматическое вращение
//     startAutoRotate();
//
//     return () => {
//       document.removeEventListener('pointerdown', handlePointerDown);
//       document.removeEventListener('wheel', handleWheel);
//       stopAutoRotate(); // Очищаем интервал при размонтировании
//     };
//   }, []);
//
//   const startAutoRotate = () => {
//     if (autoRotateInterval.current) return;
//
//     autoRotateInterval.current = setInterval(() => {
//       rotation.current.tX += config.autoRotateSpeed;
//       applyTransform(dragContainerRef.current);
//     }, 16); // ~60 FPS
//   };
//
//   const stopAutoRotate = () => {
//     if (autoRotateInterval.current) {
//       clearInterval(autoRotateInterval.current);
//       autoRotateInterval.current = null;
//     }
//   };
//
//   const init = (delayTime) => {
//     const spinContainer = spinContainerRef.current;
//     if (!spinContainer) return;
//
//     const mediaElements = [
//       ...spinContainer.getElementsByTagName('img'),
//       ...spinContainer.getElementsByTagName('video')
//     ];
//
//     mediaElements.forEach((element, index) => {
//       element.style.transform = `rotateY(${index * (360 / mediaElements.length)}deg) translateZ(${config.radius}px)`;
//       element.style.transition = 'transform 1s';
//       element.style.transitionDelay = delayTime ? '1s' : `${(mediaElements.length - index) / 4}s`;
//     });
//
//     // Убираем CSS анимацию, так как теперь используем JS-анимацию
//     spinContainer.style.animation = 'none';
//   };
//
//   const applyTransform = (obj) => {
//     const { tY, tX } = rotation.current;
//
//     rotation.current.tY = Math.max(0, Math.min(180, tY));
//
//     // Apply the angle
//     if (obj) {
//       obj.style.transform = `rotateX(${-rotation.current.tY}deg) rotateY(${rotation.current.tX}deg)`;
//     }
//   };
//
//   const playSpin = (yes) => {
//     if (yes) {
//       startAutoRotate();
//     } else {
//       stopAutoRotate();
//     }
//   };
//
//   const handlePointerDown = (e) => {
//     stopAutoRotate(); // Останавливаем автоматическое вращение при взаимодействии
//     clearInterval(dragContainerRef.current.timer);
//     rotation.current.sX = e.clientX;
//     rotation.current.sY = e.clientY;
//
//     const handlePointerMove = (e) => {
//       rotation.current.nX = e.clientX;
//       rotation.current.nY = e.clientY;
//       rotation.current.desX = rotation.current.nX - rotation.current.sX;
//       rotation.current.desY = rotation.current.nY - rotation.current.sY;
//       rotation.current.tX += rotation.current.desX * 0.1;
//       rotation.current.tY += rotation.current.desY * 0.1;
//       applyTransform(dragContainerRef.current);
//       rotation.current.sX = rotation.current.nX;
//       rotation.current.sY = rotation.current.nY;
//     };
//
//     const handlePointerUp = () => {
//       dragContainerRef.current.timer = setInterval(() => {
//         rotation.current.desX *= 0.95;
//         rotation.current.desY *= 0.95;
//         rotation.current.tX += rotation.current.desX * 0.1;
//         rotation.current.tY += rotation.current.desY * 0.1;
//         applyTransform(dragContainerRef.current);
//
//         if (Math.abs(rotation.current.desX) < 0.5 && Math.abs(rotation.current.desY) < 0.5) {
//           clearInterval(dragContainerRef.current.timer);
//           playSpin(true); // Возобновляем автоматическое вращение
//         }
//       }, 17);
//
//       document.removeEventListener('pointermove', handlePointerMove);
//       document.removeEventListener('pointerup', handlePointerUp);
//     };
//
//     document.addEventListener('pointermove', handlePointerMove);
//     document.addEventListener('pointerup', handlePointerUp);
//   };
//
//   const handleWheel = (e) => {
//     const d = e.deltaY / 20;
//     config.radius += d;
//     init(1);
//   };
//
//   return (
//     <div className={classes.container}>
//       <div className={classes.dragContainer} ref={dragContainerRef}>
//         <div className={classes.spinContainer} ref={spinContainerRef}>
//           {mediaItems.map((item, index) => {
//             return item.link ? (
//               <a key={index} target="_blank" href={item.link} rel="noopener noreferrer">
//                 <img src={item.src} alt={item.alt} className={classes.image1}/>
//               </a>
//             ) : (
//               <img key={index} src={item.src} alt={item.alt} />
//             );
//           })}
//           <p>3D Tiktok Carousel</p>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default PensionGalaxy;