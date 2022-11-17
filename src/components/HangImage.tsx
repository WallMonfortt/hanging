import hang0 from '../assets/0.png';
import hang1 from '../assets/1.png';
import hang2 from '../assets/2.png';
import hang3 from '../assets/3.png';
import hang4 from '../assets/4.png';
import hang5 from '../assets/5.png';
import hang6 from '../assets/6.png';
import hang7 from '../assets/7.png';
import hang8 from '../assets/8.png';
import hang9 from '../assets/9.png';

const images: string[] = [hang0, hang1, hang2, hang3, hang4, hang5, hang6, hang7, hang8, hang9];

interface Props {
    attempts: number;
}

export function HangImage({ attempts }: Props) {
    if (attempts > 9) {
        attempts = 9;
    }
  return (
    <div>
      <img src={images[attempts]} alt="hang0" style={{width:250}} />

    </div>
  );
}