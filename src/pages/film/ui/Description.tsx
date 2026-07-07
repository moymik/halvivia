export type DescriptionProps = {
  description?: string | null;
};

export function Description({ description }: DescriptionProps) {
  return (
    <section className="text-text-primary md:text-text-inverse flex w-full flex-col items-start gap-5">
      <h2 className={'h2 lg:text-h1-size text-xl'}>Описание</h2>
      <p className={'text-sm lg:text-base'}>
        {description ? description : 'Описания пока нет....'}
      </p>
    </section>
  );
}

export default Description;
