import { useEffect, useState } from 'react';

const svgs = import.meta.glob('../../assets/svgs/*.svg', { eager: true });

export default function RandomSVG() {
  const [src, setSrc] = useState(null);

  useEffect(() => {
    const keys = Object.keys(svgs);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    setSrc(svgs[randomKey].default);
  }, []);

  return (
    <div className="w-full flex justify-center">
      {src && <img src={src} alt="Random SVG" className="w-[20vw]" />}
    </div>
  );
}
