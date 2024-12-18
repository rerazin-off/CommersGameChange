import { useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

interface GameProps {
  game?: string;
}

const Game = (props: GameProps) => {

  const {
    game
  } = props;

  useEffect(() => {

  }, []);

  const iframeGame = useRef(null);
  const navigate = useNavigate();
  const {gameId} = useParams<{ gameId: string }>();

  useEffect(() => {
    if (gameId) {
      const url = `/path-to-${gameId}`; // Используем gameId для формирования URL

import { useNavigate, useSearchParams } from 'react-router-dom';

const Game = () => {

  const iframeGame = useRef<HTMLIFrameElement>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {

      if (iframeGame.current) {
        iframeGame.current.src = url;
      }
    } else {
      const backLink = searchParams.get('backLink');
      if (backLink) {
        navigate(backLink);
      } else {
        window.history.back();
      }
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    const iframe = iframeGame.current;

    const handleIframeNavigation = () => {
      try {

        const currentUrl = iframe.contentWindow.location.href;
        console.log('Iframe URL:', currentUrl);


        const currentUrl = iframe?.contentWindow?.location.href;

        const invalidUrlPattern = /index\.html\?block=.*/;

        if (invalidUrlPattern.test(currentUrl)) {
          const backLink = searchParams.get('backLink');
          if (backLink) {
            navigate(backLink);
          } else {
            window.history.back();
          }
        }
      } catch (error) {
        const backLink = searchParams.get('backLink');
        if (backLink) {
          navigate(backLink);
        } else {
          window.history.back();
        }
      }
    };


    iframe.addEventListener('load', handleIframeNavigation);

    if (iframe) {
      iframe.addEventListener('load', handleIframeNavigation);
    }


    return () => {
      iframe.removeEventListener('load', handleIframeNavigation);
    };

  }, [navigate]);
  console.log({game});

  return (
    <div>
      <iframe
        ref={iframeGame}
        src={game}
        width={1920}
        height={1080}
      />

  }, [searchParams, navigate]);

  return (
    <div>
      <iframe ref={iframeGame} src="" width={1920} height={1080} title="Game Frame" />

    </div>
  );
};
export default Game;





