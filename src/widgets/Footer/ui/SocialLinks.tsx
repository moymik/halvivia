import Image from 'next/image';
import clsx from 'clsx';

type SocialLinksProps = {
  className?: string;
};

import { footerSocialLinksWithImage } from '@/widgets/Footer/model/footerNavigation';

export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <div className={clsx('flex w-18 gap-5', className)}>
      {footerSocialLinksWithImage.map((sl) => (
        <a key={sl.href} href={sl.href} target="_blank" rel="noopener noreferrer">
          <Image src={sl.image} width={sl.imageWidth} height={sl.imageHeight} alt={sl.alt} />
        </a>
      ))}
    </div>
  );
}
