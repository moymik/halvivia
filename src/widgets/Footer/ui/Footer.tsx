import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FooterNavSection } from './FooterNavSection';
import { footerSections } from '@/widgets/Footer/model/footer.data';

export function Footer() {
  return (
    <footer className="bg-bg-surface border-border-default flex h-60 flex-col gap-6 border-t px-4 py-6 md:h-75 md:gap-11.5 md:px-8.5 md:pt-10.75 md:pb-24 lg:flex-row lg:gap-48.5 lg:px-25">
      {/* Top logo */}
      <Link href="/" className="flex h-7.5 w-33.5 flex-row items-center gap-2.5">
        <Image src="/logo.svg" width={18} height={31} alt="logo" />
        <h4 className={'text-sm font-bold'}>Halva&Povidlo</h4>
      </Link>

      {/* Navigation */}
      <div className="md:gap:33.5 mt-2 flex h-20.5 justify-between gap-23 lg:gap-48.5">
        {footerSections.map((section) => (
          <FooterNavSection
            key={section.name}
            name={section.name}
            links={section.links}
            className={section.name === 'Контакты' ? 'hidden md:flex' : ''}
          />
        ))}
      </div>

      {/* Social icons */}
      <div className="flex gap-4.75 md:hidden">
        <Image src="/discord_logo.svg" width={20} height={17} alt="discord" />
        <Image src="/telegram_logo.svg" width={19} height={17} alt="telegram" />
      </div>
    </footer>
  );
}

export default Footer;
