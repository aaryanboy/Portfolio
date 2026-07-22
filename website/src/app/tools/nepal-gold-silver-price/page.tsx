// src/app/tools/nepal-gold-silver-price/page.tsx
import { getGoldSilverPrice } from '@/lib/gold-price';

export const revalidate = 3600;

export default async function GoldPricePage() {
  const { gold, silver, updatedAt } = await getGoldSilverPrice();

  if (!gold.tola || !gold.tenGram || !silver.tola || !silver.tenGram) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-1">
          Today&apos;s Gold &amp; Silver Price in Nepal
        </h1>
        <p className="text-red-500 mt-4">
          Price data is temporarily unavailable. Please try again shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-1">
        Today&apos;s Gold &amp; Silver Price in Nepal
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Updated {new Date(updatedAt).toLocaleString()}
      </p>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-50 p-6">
          <span className="text-xs font-bold text-red-700 uppercase">
            Gold &middot; 1 Tola
          </span>
          <p className="text-4xl font-bold mt-2">
            Rs. {gold.tola.price.toLocaleString()}/-
          </p>
          <p className="text-green-600 text-sm mt-1">
            ▲ Rs. {gold.tola.change.toLocaleString()} (+{gold.tola.changePercent}%)
          </p>
          <p className="text-gray-500 text-sm mt-2">
            10 Gram: Rs. {gold.tenGram.price.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 p-6">
          <span className="text-xs font-bold text-slate-700 uppercase">
            Silver &middot; 1 Tola
          </span>
          <p className="text-4xl font-bold mt-2">
            Rs. {silver.tola.price.toLocaleString()}/-
          </p>
          <p className="text-green-600 text-sm mt-1">
            ▲ Rs. {silver.tola.change.toLocaleString()} (+{silver.tola.changePercent}%)
          </p>
          <p className="text-gray-500 text-sm mt-2">
            10 Gram: Rs. {silver.tenGram.price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}