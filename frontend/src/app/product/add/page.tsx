'use client';

import { NavBar } from '@/components/navbar';
import { ComboboxInput } from './combobox';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AccessDenied from '@/components/access-denied';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const categories: {
  id: number;
  name: string;
}[] = [
  { id: 1, name: 'Cemilan' },
  { id: 2, name: 'Minuman' },
  { id: 3, name: 'Makanan' },
  { id: 4, name: 'Perabotan' },
  { id: 5, name: 'Cleaning' },
  { id: 6, name: 'Obat Herbal' },
  { id: 7, name: 'Elektronik' },
];

export default function Page() {
  const router = useRouter();
  const [category, setCategory] = useState<{
    id: number;
    name: string;
  }>({ id: 1, name: 'Cemilan' });
  const [name, setName] = useState('');
  const [sku, setSKU] = useState('');
  const [weight, setWeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [length, setLength] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validate Name
    if (name.length < 3 || name.length > 50) {
      setError('Name must be between 3 and 50 characters');
      return;
    }

    // Validate Category
    if (
      !categories.find((currCategory) => currCategory.name === category.name)
    ) {
      setError('Invalid category');
      setIsLoading(false);
      return;
    }

    // Validate SKU
    if (sku.length < 3 || sku.length > 10) {
      setError('SKU must be between 3 and 10 characters');
      setIsLoading(false);
      return;
    }

    // Validate Weight, Length, and Height (assuming min: 1, max: 1000 for demonstration)
    const measurements = { weight, length, height, width };
    for (let measurement in measurements) {
      if (
        !measurements[measurement as keyof typeof measurements] ||
        isNaN(measurements[measurement as keyof typeof measurements]!) ||
        measurements[measurement as keyof typeof measurements]! < 1 ||
        measurements[measurement as keyof typeof measurements]! > 1000
      ) {
        setError(`Invalid ${measurement}`);
        setIsLoading(false);
        return;
      }
    }

    // Validate harga
    if (!price || isNaN(price) || price < 1 || price > 100000000) {
      setError('Invalid price');
      setIsLoading(false);
      return;
    }

    // Validate Image URL (a simple validation for demonstration)
    if (!imageURL.startsWith('http://') && !imageURL.startsWith('https://')) {
      setError('Invalid image URL');
      setIsLoading(false);
      return;
    }

    // Validate Description
    if (description.length < 10 || description.length > 200) {
      setError('Description must be between 10 and 200 characters');
      setIsLoading(false);
      return;
    }

    // If all validations pass, process form data
    const res = await fetch(`http://localhost:3000/shop-item/add-item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        CategoryId: category.id,
        categoryName: category.name,
        sku,
        weight,
        width,
        length,
        height,
        image: imageURL,
        description,
        harga: price,
      }),
    });

    if (res.ok) {
     const data = await res.json();
      router.push(`/product/${data.id}`);
    } else if (res.status === 400) {
      const data = await res.json();
      setError(data.message);
    }
    setIsLoading(false);
  };

  if (!session || !session.user) {
    return <AccessDenied />
  }

  return (
        <div className="sm:pt-16 pt-20 sm:h-full bg-white text-slate-700">
          <div className="mx-auto max-w-xl py-20 sm:py-4 lg:max-w-4xl flex flex-col">
            <h1 className="text-2xl font-bold">Add Product</h1>

            <form 
              onSubmit={handleFormSubmit} 
              className="flex flex-col">
              <div className="grid px-2 sm:px-0 grid-cols-1 sm:grid-cols-2 py-4 gap-8 ">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      autoCorrect="off"
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      aria-describedby="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Image URL, Price */}
                <ComboboxInput
                  categories={categories}
                  selectedCategory={category}
                  setSelectedCategory={setCategory}
                />

                <div className="flex flex-col gap-8">
                  <div className="flex gap-2">
                    <div>
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium leading-6 text-slate-900"
                      >
                        Weight (g)
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="weight"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          placeholder="400"
                          value={weight ? weight : ''}
                          onChange={(e) => setWeight(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="length"
                        className="block text-sm font-medium leading-6 text-slate-900"
                      >
                        Length (cm)
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="length"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          placeholder="10"
                          value={length ? length : ''}
                          onChange={(e) => setLength(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="width"
                        className="block text-sm font-medium leading-6 text-slate-900"
                      >
                        Width (cm)
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="width"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          placeholder="10"
                          value={width ? width : ''}
                          onChange={(e) => setWidth(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="height"
                        className="block text-sm font-medium leading-6 text-slate-900"
                      >
                        Height (cm)
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="height"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                          placeholder="20"
                          value={height ? height : ''}
                          onChange={(e) => setHeight(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="sku"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      SKU
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="sku"
                        autoComplete="off"
                        autoCorrect="off"
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        aria-describedby="sku-description"
                        value={sku}
                        onChange={(e) => setSKU(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="image-url"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Image URL
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                        <input
                          type="text"
                          name="image-url"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="www.imageurl.com"
                          value={imageURL}
                          onChange={(e) => {
                            setImageURL(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-slate-900"
                    >
                      Price (Rp)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md">
                        <input
                          type="text"
                          name="price"
                          autoComplete="off"
                          autoCorrect="off"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="10.000"
                          value={price || ''}
                          onChange={(e) => {
                            setPrice(Number(e.target.value));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-slate-900"
                  >
                    Add product description
                  </label>
                  <div className="grow">
                    <textarea
                      rows={4}
                      name="description"
                      id="description"
                      autoComplete="off"
                      autoCorrect="off"
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 h-full"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div 
              className="flex justify-end pt-10 gap-4 items-baseline">
                {error && (
                  <p className='text-red-600 font-medium'>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="disabled:opacity-70 flex gap-1 rounded-md bg-green-700 px-3 py-2 text-sm font-medium text-emerald-50 shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  {isLoading && (
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                  )}
                  Submit Product
                </button>
              </div>
            </form>
          </div>
        </div>
  );
}
