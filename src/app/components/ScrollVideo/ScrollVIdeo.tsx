"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { BlurredDialog } from '../BlurredDialog/BlurredDialog';
import { Card } from '../Card/Card';
import { Typewriter } from '../Typewriter/Typewriter';
import { Gift } from 'lucide-react';

interface ScrollVideoProps {
  totalFrames: number;
  folderPath: string;
  videoSrc: string;
}

export const ScrollVideo: React.FC<ScrollVideoProps> = ({ 
  totalFrames, 
  folderPath, 
  videoSrc 
}) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const requestRef = useRef<number>();

  // Preloading images
  useEffect(() => {
    const preloadImages = async () => {
      const imageUrls = Array.from({ length: totalFrames }, (_, index) => 
        `${folderPath}${String(index + 75).padStart(4, '0')}.png`
      );

      const imageElements: HTMLImageElement[] = [];
      
      for (let i = 0; i < imageUrls.length; i++) {
        const img = new Image();
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            imageElements.push(img);
            setLoadingProgress(Math.round(((i + 1) / imageUrls.length) * 100));
            resolve();
          };
          
          img.onerror = () => {
            console.error(`Failed to load image: ${imageUrls[i]}`);
            resolve();
          };
          
          img.src = imageUrls[i];
        });
      }

      setImages(imageElements);
    };

    preloadImages();
  }, [totalFrames, folderPath]);

  // Scroll handling with requestAnimationFrame
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    // Cancel any existing animation frame
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    // Use requestAnimationFrame for smoother updates
    requestRef.current = requestAnimationFrame(() => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress within the container
      const scrollProgress = (scrollTop - containerTop) / (containerHeight - windowHeight);
      
      // Ensure scroll progress is between 0 and 1
      const clampedScrollProgress = Math.max(0, Math.min(1, scrollProgress));

      // Interpolate frame index for smoother transitions
      const targetFrameIndex = Math.floor(clampedScrollProgress * (images.length - 1));

      // Check if scroll is complete (reached last frame)
      const isAtEnd = targetFrameIndex >= images.length - 1;

      if (isAtEnd) {
        // Lock scroll position
        window.scrollTo(0, container.offsetTop + containerHeight - windowHeight);
        setIsScrollComplete(true);
        
        // Play video
        videoRef.current?.play();
      }

      // Smooth interpolation between current and target frame
      const smoothFrameIndex = Math.round(
        currentImageIndex + (targetFrameIndex - currentImageIndex) * 0.2
      );

      setCurrentImageIndex(smoothFrameIndex);
    });
  }, [images, currentImageIndex]);

  // Scroll event setup
  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    // Create an artificial scroll height
    container.style.height = `${window.innerHeight * 3}px`;

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Prevent scrolling if scroll is complete
    const preventScroll = (e: Event) => {
      if (isScrollComplete) {
        e.preventDefault();
        window.scrollTo(0, container.offsetTop + container.offsetHeight - window.innerHeight);
      }
    };

    // Add wheel and touchmove event listeners to prevent scrolling
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    // Initial setup
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [images, handleScroll, isScrollComplete]);

  // Loading state
  if (images.length === 0) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div>Cargando</div>
        <div 
          style={{
            width: `${loadingProgress}%`,
            height: '4px',
            backgroundColor: '#fffff0',
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '300vh',
      }}
    >
      {/* Darkening Overlay 
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          opacity: backgroundOpacity,
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'multiply'
        }}
      />
      */}
      {/* Video Container (Behind PNG, Above Darkening) */}
      {isScrollComplete && (
        <div 
        style={{
          position: 'fixed',
          top: '55%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '1920px',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Contenedor padre */}
        <div 
          style={{
            position: 'relative',
            width: '70%', // Para que coincida con el tamaño del video
            height: 'auto',
          }}
        >
          {/* Primer hijo: Video */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <video 
              ref={videoRef}
              src={videoSrc}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '100vh',
                objectFit: 'contain',
              }}
              muted
              playsInline
            />
          </div>
      
          {/* Segundo hijo: Contenedor de botones */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
            }}
          >
            {/* Botones posicionados manualmente */}
            <BlurredDialog 
            trigger={
            <button 
              style={{
                position: 'absolute',
                top: '85%',
                left: '53%',
                transform: 'translate(-50%, -50%)',
                width: "7vw",
                height: "5.6vw"

              }}
            >
            </button>}>
              <Card>
                <h1>Querida Georgy,</h1>
                <Typewriter 
                  speed={20} 
                  text={`Es increíble como todo ha pasado tan rápido, ya estamos en navidad y siento que fue ayer cuando me hablaste enfrente del elevador y yo me estaba muriendo de nervios.\nNi siquiera hemos tenido la oportunidad de decirnos bien lo que sentimos, pero cada abrazo, cada beso y cada "te extrañé" que me das, me lo dicen todo. Me das mucha ternura cuando me haces travesuras, como cuando me cepillas con tu cabello como si fuera un pincel, cuando me muerdes, o cuando me aprietas mi chichi.\nMe da mucha tristeza que este próximo semestre sea el último. No se como le voy a hacer sin ti a mi lado todos los días, sin poder abrazarte ni darte besitos. Te voy a extrañar muchísimo, y se que te voy a llorar mucho también, pero sin importar cómo, se que vamos a encontrar la manera de sobrellevarlo, lo bueno es que somos its y hay un millón de cosas que se pueden hacer en línea.\nAprovecho para decirte que sé que me he tardado en pedirte, y que diario siento la preocupación de que pienses que no quiero comprometerme o alguna cosa así, pero la realidad es que no ha habido mucho tiempo para planear bien algo bonito, y pues dinero tampoco, y no quiero hacerte algo x porque no puedo decepcionar a nuestros futuros hijos.\nOjalá que te la pases muy bonito con tu familia en navidad y año nuevo, y que Santa Claus y los reyes te traigan muchos regalos.\nTe voy a extrañar mucho estas vacaciones :(\n\nTe quiero y te amo mucho♥\nGero`} 
                />
              </Card>
            </BlurredDialog>
            <BlurredDialog 
            trigger={
              <button 
              style={{
                position: 'absolute',
                top: '80%',
                left: '77%',
                transform: 'translate(-50%, -50%)',
                width: "7.2vw",
                height: "10vw"

              }}
            >
            </button>}>
              <Card>
                <div className='w-full h-full flex items-center justify-center'>
                  <div>
                    <Gift size={36}/>
                    <br />
                    <h1>De: Melissa</h1>
                    <br />
                    <h1>Para: Georgy</h1>
                  </div>
                </div>
              </Card>
            </BlurredDialog>
            <a 
              style={{
                position: 'absolute',
                top: '87%',
                left: '67%',
                transform: 'translate(-50%, -50%)',
                width: "4.5vw",
                height: "4vw"
              }}
              href='/cupones'
            >
            </a>
            
          </div>
        </div>
      </div>
      
        
      )}

      {/* Image Container with Gradient */}
      <div style={{ 
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '100%',
        maxWidth: '1920px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        pointerEvents: "none"
      }}>
        <img 
          src={images[currentImageIndex].src} 
          alt="Scroll Image Sequence" 
          style={{ 
            width: '100%', 
            height: 'auto',
            objectFit: 'contain',
            maxHeight: '100vh',
            zIndex: 4,
            pointerEvents: "none"
          }} 
        />
      </div>
    </div>
  );
};