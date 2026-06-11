'use client';
/*
export type KinopoiskFormProps = {

}*/
import Input from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button';
import { ChangeEvent, useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { addKinopoiskFilmAction } from '@/features/addKinopoiskFilm/api/actions';
import * as url from 'node:url';
import { redirect } from 'next/navigation';

export function parseKinopoiskFilmId(url: string): number | null {
  if (typeof url !== 'string') return null;

  const match = url.match(/kinopoisk\.ru\/film\/(\d+)\b/);
  return match ? Number(match[1]) : null;
}

export function KinopoiskForm() {
  const [currentRef, setCurrentRef] = useState('');
  const [isValid, setValid] = useState<boolean>(true);

  const debounced = useDebouncedCallback((value: string) => {
    setValid(Boolean(parseKinopoiskFilmId(value)));
  }, 500);

  useEffect(() => {
    debounced(currentRef);
  }, [currentRef, debounced]);

  return (
    <form className="flex w-full flex-col gap-8 lg:w-[22vw]">
      <div className="flex flex-col items-center gap-3.5">
        <Input
          searchIcon
          placeholder="Поиск"
          className={'text-sm md:text-base lg:text-xl'}
          type="text"
          disabled={true}
        />
        <label className="text-text-inverse-500 text-sm">Введи название фильма</label>
      </div>
      <div className="space-between text-text-inverse-200 flex flex-row items-center gap-4 text-sm md:text-lg">
        <hr className="flex-1" />
        или
        <hr className="flex-1" />
      </div>
      <div className="flex flex-col items-center gap-3.5">
        <Input
          value={currentRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCurrentRef(e.target.value);
          }}
          placeholder="https://"
          className="text-sm md:text-base lg:text-xl"
          type="text"
        />
        {!isValid && (
          <label className={'text-error'}>
            *Видеосервис не поддерживается или ссылка некорректная
          </label>
        )}
        <label className="text-text-inverse-500 text-sm">Укажи ссылку на фильм на Кинопоиске</label>
      </div>
      <Button
        onClick={async () => {
          if (!isValid) {
            return null;
          }
          const parsed = parseKinopoiskFilmId(currentRef);
          if (parsed === null) return null;

          const res = await addKinopoiskFilmAction(parsed);
          console.log(res);
          if (res.success) redirect(`/cinema/${res.filmId}`);
        }}
        type="button"
        variant="primaryOnLight"
        className="w-full lg:text-xl"
      >
        Добавить
      </Button>
    </form>
  );
}

export default KinopoiskForm;
