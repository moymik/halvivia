'use client';

import { useState } from 'react';

export default function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button onClick={() => setOpen(!open)} className="rounded border px-4 py-2">
        Меню
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded border bg-white shadow-lg">
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Профиль</button>
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Настройки</button>
          <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">Выход</button>
        </div>
      )}
    </div>
  );
}
