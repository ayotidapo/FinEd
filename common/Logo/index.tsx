import Image from 'next/image';
import { useRouter } from 'next/router';
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src="/assets/logo.png"
      layout="fill"
      alt="logo"
      onClick={() => router.push('/')}
      className="hand"
    />
  );
};
export const Logo2 = () => {
  const router = useRouter();
  return (
    <Image
      src="/assets/logo-black.png"
      layout="fill"
      alt="logo"
      onClick={() => router.push('/')}
      className="hand"
    />
  );
};
export default Logo;
