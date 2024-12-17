// import { useEffect, useRef } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
//
// interface GameProps {
//   game?: string;
// }
//
// const Game = (props: GameProps) => {
//
//   const {
//     game
//   } = props;
//
//   useEffect(() => {
//
//   }, []);
//
//   const iframeGame = useRef(null);
//   const navigate = useNavigate();
//   const {gameId} = useParams<{ gameId: string }>();
//
//   useEffect(() => {
//     if (gameId) {
//       const url = `/path-to-${gameId}`; // Используем gameId для формирования URL
//       if (iframeGame.current) {
//         iframeGame.current.src = url; // Устанавливаем src для iframe
//       }
//     }
//   }, [gameId]);
//
//   useEffect(() => {
//     const iframe = iframeGame.current;
//
//     const handleIframeNavigation = () => {
//       try {
//         const currentUrl = iframe.contentWindow.location.href;
//         console.log('Iframe URL:', currentUrl);
//
//         const invalidUrlPattern = /index\.html\?block=.*/;
//
//         if (invalidUrlPattern.test(currentUrl)) {
//           console.warn('Detected invalid URL in iframe. Redirecting...');
//           navigate('/Yur');
//         }
//       } catch (error) {
//         console.error('Error accessing iframe content:', error);
//         navigate('/1');
//       }
//     };
//
//     iframe.addEventListener('load', handleIframeNavigation);
//
//     return () => {
//       iframe.removeEventListener('load', handleIframeNavigation);
//     };
//   }, [navigate]);
//   console.log(game);
//
//   return (
//     <div>
//       <iframe
//         ref={iframeGame}
//         src={game}
//         width={1920}
//         height={1080}
//       />
//     </div>
//   );
// };
// export default Game;

//

import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface GameProps {
  game: string;
}

const Game = () => {
  const iframeGame = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>(); // Извлекаем gameId из параметров URL

  useEffect(() => {
    if (gameId) {
      const url = `/game/${gameId}`; // Используем gameId для формирования URL
      if (iframeGame.current) {
        iframeGame.current.src = url; // Устанавливаем src для iframe
      }
    }
  }, [gameId]);

  useEffect(() => {
    const iframe = iframeGame.current;
    const handleIframeNavigation = () => {
      try {
        const currentUrl = iframe?.contentWindow?.location.href;
        console.log('Iframe URL:', currentUrl);
        const invalidUrlPattern = /index\.html\?block=.*/;
        if (invalidUrlPattern.test(currentUrl)) {
          console.warn('Detected invalid URL in iframe. Redirecting...');
          navigate('/Yur');
        }
      } catch (error) {
        console.error('Error accessing iframe content:', error);
        navigate('/1');
      }
    };

    if (iframe) {
      iframe.addEventListener('load', handleIframeNavigation);
    }
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeNavigation);
      }
    };
  }, [navigate]);

  return (
    <div>
      <iframe ref={iframeGame} width={1920} height={1080} title="Game Frame" />
    </div>
  );
};

export default Game;