'use client';

import Input from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button';
import { ChangeEvent, useState, useTransition, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { addKinopoiskFilmAction } from '@/features/addKinopoiskFilm/api/actions';

//TODO: убрать /film/ из обязательных
export function parseKinopoiskFilmId(url: string): number | null {
  if (typeof url !== 'string') return null;

  const match = url.match(/kinopoisk\.ru\/[^/]+\/(\d+)\b/);
  return match ? Number(match[1]) : null;
}

export function KinopoiskForm() {
  const [currentRef, setCurrentRef] = useState('');
  const [isValidOrEmpty, setValidOrEmpty] = useState<boolean>(true);
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string>('');

  function onSubmit() {
    startTransition(async function () {
      if (!isValidOrEmpty) {
        return;
      }
      const parsed = parseKinopoiskFilmId(currentRef);
      if (parsed === null) return;

      const res = await addKinopoiskFilmAction(parsed);
      if (res.success) setStatus('Фильм успешно добавлен!');
      else setStatus('Не удалось добавить фильм :(');
    });
  }

  const debounced = useDebouncedCallback((value: string) => {
    if (currentRef == '') {
      setValidOrEmpty(true);
      setStatus('');
    } else setValidOrEmpty(Boolean(parseKinopoiskFilmId(value)));
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
        <label className="text-text-inverse-500 text-xs lg:text-sm">Введи название фильма</label>
      </div>
      <div className="space-between text-text-inverse-200 flex flex-row items-center gap-4 text-sm md:text-lg">
        <hr className="flex-1" />
        или
        <hr className="flex-1" />
      </div>
      <div className="flex flex-col items-center gap-2.5 lg:gap-3">
        <div className="flex min-h-14 w-full flex-col items-center gap-1 lg:h-17.5">
          <Input
            value={currentRef}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setCurrentRef(e.target.value);
            }}
            placeholder="https://"
            className="text-sm md:text-base lg:text-xl"
            type="text"
          />
          <label
            className={`text-error block w-fit text-[10px] transition-opacity duration-200 lg:text-xs ${isValidOrEmpty ? '-translate-y-1 opacity-0' : 'translate-y-0 opacity-100'} `}
          >
            *Видеосервис не поддерживается или ссылка некорректная
          </label>
        </div>
        <label className="text-text-inverse-500 text-xs lg:text-sm">
          Укажи ссылку на фильм на Кинопоиске
        </label>
      </div>
      <Button
        disabled={isPending}
        onClick={onSubmit}
        type="button"
        variant="primaryOnLight"
        className="w-full lg:text-xl"
      >
        {isPending ? 'Добавление...' : 'Добавить'}
      </Button>
      {status ? <div className={'text-primary'}>{status}</div> : ''}
    </form>
  );
}

export default KinopoiskForm;
