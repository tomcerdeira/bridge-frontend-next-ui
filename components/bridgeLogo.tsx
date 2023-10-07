
import Image from 'next/image';

export const BridgeLogo = () => (
  <div>
    <Image
      priority
      src="/bridge-logo.png"
      height={32}
      width={32}
      alt="Follow us on Twitter"
      style={{ fill: 'none' }}
    />
  </div>
  );