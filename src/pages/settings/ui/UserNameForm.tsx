'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserNameAction, type UpdateUserNameState } from '@/entities/user/api/actions';

type UserNameFormProps = {
  initialName: string;
};

const initialState: UpdateUserNameState = {
  success: false,
};

export function UserNameForm({ initialName }: UserNameFormProps) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [state, setState] = useState(initialState);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateUserNameAction(state, formData);

      setState(result);

      if (result.success) {
        setIsEditing(false);
        router.refresh();
      }
    });
  };

  const handleEdit = () => {
    setName(initialName);
    setState(initialState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(initialName);
    setState(initialState);
    setIsEditing(false);
  };

  return (
    <form action={handleSubmit}>
      {isEditing ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="flex-1">
            <label className="sr-only" htmlFor="user-name">
              Имя пользователя
            </label>

            <input
              id="user-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              minLength={2}
              maxLength={20}
              required
              disabled={isPending}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-white outline-none focus:border-zinc-500 disabled:opacity-50"
            />

            {state.error && <p className="mt-2 text-sm text-red-400">{state.error}</p>}
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {isPending ? 'Сохраняем...' : 'Сохранить'}
            </button>

            <button
              type="button"
              disabled={isPending}
              onClick={handleCancel}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              Отмена
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <span>{initialName}</span>

          <button
            type="button"
            onClick={handleEdit}
            className="text-sm text-blue-400 transition-colors hover:text-blue-300"
          >
            Изменить
          </button>
        </div>
      )}

      {state.success && !isEditing && <p className="mt-2 text-sm text-green-400">Имя сохранено.</p>}
    </form>
  );
}
