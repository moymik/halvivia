/*
export type KinopoiskFormProps = {

}*/
import Input from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button';

export function KinopoiskForm() {
  return (
    <form className="flex w-full flex-col gap-8 lg:w-[22vw]">
      <div className="flex flex-col items-center gap-3.5">
        <Input
          searchIcon
          placeholder="Поиск"
          className={'text-sm md:text-base lg:text-xl'}
          type="text"
        />
        <label className="text-text-inverse-500 text-sm">Введи название фильма</label>
      </div>
      <div className="space-between text-text-inverse-200 flex flex-row items-center gap-4 text-sm md:text-lg">
        <hr className="flex-1" />
        или
        <hr className="flex-1" />
      </div>
      <div className="flex flex-col items-center gap-3.5">
        <Input placeholder="https://" className="text-sm md:text-base lg:text-xl" type="text" />
        <label className="text-text-inverse-500 text-sm">Укажи ссылку на фильм на Кинопоиске</label>
      </div>
      <Button variant="primaryOnLight" className="w-full lg:text-xl">
        Добавить
      </Button>
    </form>
  );
}

export default KinopoiskForm;
