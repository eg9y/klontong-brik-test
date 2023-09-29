/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';

export function ComboboxInput({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: { id: number; name: string }[];
  selectedCategory: { id: number; name: string };
  setSelectedCategory: (category: { id: number; name: string }) => void;
}) {
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? categories
      : categories.filter((category) => {
          return category.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedCategory} onChange={setSelectedCategory}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-slate-900">
        Category
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(category?: { id: string; name: string }) => {
            return category?.name || categories[0].name;
          }}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-slate-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  cn(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-green-600 text-white' : 'text-slate-900',
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={cn(
                        'block truncate',
                        !!selected && 'font-semibold',
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={cn(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-green-600',
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
