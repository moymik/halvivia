import Link from 'next/link';

type StatusBlockProps = {
  status: boolean | null;
  filmRef: string | null;
};

export function StatusBlock({ status, filmRef }: StatusBlockProps) {
  if (status === true) {
    return (
      <div className="">
        Фильм успешно добавлен!&nbsp;
        <Link className="bold text-success" href={filmRef as string}>
          Ссылка
        </Link>
      </div>
    );
  }

  if (status === false) {
    return <div className="text-error">Не удалось добавить фильм :(</div>;
  }

  return null;
}
