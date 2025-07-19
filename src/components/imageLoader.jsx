import { useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import styles from '../app/home.module.css';

export default function ImageWithLoader({ src, alt, width, height }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.img} style={{ position: "relative", width, height }}>
      {/* Пока грузится → показываем скелетон */}
      {!loaded && <Skeleton width={width} height={height} />}

      {/* Картинка появится плавно, когда загрузится */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}