export type DescriptionProps = {
  description?: string | null;
};

export function Description({ description }: DescriptionProps) {
  return (
    <section className="flex w-full flex-col items-start gap-5">
      <h2 className={'h2 bold text-5'}>Описание</h2>
      <p>{description ? description : 'Описания пока нет....'}</p>
    </section>
  );
}

export default Description;
