import { useState, useRef, useEffect } from 'react';
import styles from './VideoCarousel.module.css';

// Função para extrair o ID do vídeo do YouTube da URL de incorporação
const getYoutubeVideoId = (embedUrl) => {
  const match = embedUrl.match(/embed\/([^/?]+)/);
  return match ? match[1] : null;
};

const VideoCarousel = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const videoRefs = useRef([]);

  const videos = [
    {
      id: 1,
      title: "Free Fire com YgorX",
      embedUrl: "https://www.youtube.com/embed/VMF86x77ZdE",
      thumbnail: `https://img.youtube.com/vi/${getYoutubeVideoId("https://www.youtube.com/embed/VMF86x77ZdE")}/mqdefault.jpg`
    },
    {
      id: 2,
      title: "Jogadas Épicas YgorX",
      embedUrl: "https://www.youtube.com/embed/SsfSyfjSTVM",
      thumbnail: `https://img.youtube.com/vi/${getYoutubeVideoId("https://www.youtube.com/embed/SsfSyfjSTVM")}/mqdefault.jpg`
    },
    {
      id: 3,
      title: "YgorX - Melhores Momentos",
      embedUrl: "https://www.youtube.com/embed/G38Rl5HUB68",
      thumbnail: `https://img.youtube.com/vi/${getYoutubeVideoId("https://www.youtube.com/embed/G38Rl5HUB68")}/mqdefault.jpg`
    },
    {
      id: 4,
      title: "Estratégias Avançadas com YgorX",
      embedUrl: "https://www.youtube.com/embed/aGQhM_GiQPk",
      thumbnail: `https://img.youtube.com/vi/${getYoutubeVideoId("https://www.youtube.com/embed/aGQhM_GiQPk")}/mqdefault.jpg`
    },
    {
      id: 5,
      title: "Competitivo YgorX",
      embedUrl: "https://www.youtube.com/embed/PEl7glrrlW0",
      thumbnail: `https://img.youtube.com/vi/${getYoutubeVideoId("https://www.youtube.com/embed/PEl7glrrlW0")}/mqdefault.jpg`
    }
  ];

  // Pausar vídeo quando mudar para outro
  useEffect(() => {
    videoRefs.current.forEach((iframe, index) => {
      if (iframe && index !== activeVideo) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc;
      }
    });
  }, [activeVideo]);

  const nextVideo = () => {
    setActiveVideo((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setActiveVideo((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const handleThumbnailClick = (index) => {
    setActiveVideo(index);
  };

  const handleThumbnailError = (e) => {
    e.target.src = '/images/thumbnails/placeholder.svg';
    e.target.alt = 'YgorX - Thumbnail indisponível';
  };

  return (
    <section className={styles.videoSection} id="videos">
      <div className={styles.container}>
        <h2 className={styles.title}>
          <span className={styles.highlight}>Vídeos</span> Em Destaque
        </h2>

        <div className={styles.carouselContainer}>
          <div className={styles.videoWrapper}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`${styles.videoItem} ${
                  index === activeVideo ? styles.active : ''
                }`}
              >
                <iframe
                  src={`${video.embedUrl}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  ref={(el) => (videoRefs.current[index] = el)}
                ></iframe>
                <h3 className={styles.videoTitle}>{video.title}</h3>
              </div>
            ))}
          </div>

          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={prevVideo}
            aria-label="Vídeo anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={nextVideo}
            aria-label="Próximo vídeo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className={styles.thumbnailsContainer}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`${styles.thumbnail} ${
                  index === activeVideo ? styles.activeThumbnail : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={video.thumbnail}
                  alt={`Thumbnail: ${video.title}`}
                  onError={handleThumbnailError}
                />
                <div className={styles.thumbnailOverlay}>
                  {index === activeVideo && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={styles.playingIcon}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <span className={styles.thumbnailTitle}>{video.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCarousel; 