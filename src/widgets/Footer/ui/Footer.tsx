import Link from 'next/link';

import { LogoIcon } from '../../../shared/ui/icons';

import { SocialLinksContainer } from './SocialLinksContainer';
import { FooterNavSection } from './FooterNavSection';
import { FOOTER_SECTIONS, isContactSection } from '../config/footer.config';

export function Footer() {
  return (
    <footer className="bg-bg-surface border-border-default flex h-60.5 flex-col gap-6 border-t px-4 py-6.5 md:h-75 md:gap-11.5 md:px-8.5 md:pt-10.75 md:pb-24 lg:h-60 lg:flex-row lg:gap-48.5 lg:px-12.5 lg:pt-10 lg:pb-18 xl:gap-53 xl:px-25 2xl:gap-61 2xl:px-74">
      {/* Top logo */}
      <Link href="/" className="flex h-7.5 w-33.5 flex-row items-center gap-2.5">
        <LogoIcon className={'w-4'}></LogoIcon>
        <h4 className={'text-sm font-normal'}>Halva&Povidlo</h4>
      </Link>

      {/* Navigation */}
      <div className="md:gap:33.5 mt-2 flex h-20.5 justify-between gap-23 md:mt-0 lg:gap-48.5 xl:gap-53 2xl:gap-61">
        {FOOTER_SECTIONS.map((section) => (
          <FooterNavSection
            key={section.id}
            id={section.id}
            title={section.title}
            links={section.links}
            className={isContactSection(section) ? 'hidden md:flex' : ''}
          />
        ))}
      </div>

      {/* Social icons */}
      <SocialLinksContainer className={'md:hidden'}></SocialLinksContainer>
    </footer>
  );
}

export default Footer;
