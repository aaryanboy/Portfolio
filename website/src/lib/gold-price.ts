// src/lib/gold-price.ts

interface PricePoint {
    date: string;
    price: number;
  }
  
  interface BullionUnit {
    unitName: string;
    price: number;
    change: number;
    changePercent: number;
    priceHistory: PricePoint[];
  }
  
  interface Bullion {
    name: string;
    symbol: string;
    nepaliName: string;
    iconUrl: string;
    changePercent: number;
    units: BullionUnit[];
  }
  
  export interface GoldSilverPrice {
    gold: {
      tola: BullionUnit | undefined;
      tenGram: BullionUnit | undefined;
    };
    silver: {
      tola: BullionUnit | undefined;
      tenGram: BullionUnit | undefined;
    };
    updatedAt: string;
  }
  
  export async function getGoldSilverPrice(): Promise<GoldSilverPrice> {
    const res = await fetch(
      'https://arthakendra.com/widget/gold-silver-widget',
      { next: { revalidate: 3600 } }
    );
    const html = await res.text();
  
    // [\s\S]*? instead of .*?s — works without the ES2018 's' regex flag
    const match = html.match(/const bullionData = (\[[\s\S]*?\]);/);
  
    if (!match) {
      throw new Error('Could not find bullionData in the page — source may have changed.');
    }
  
    const bullionData: Bullion[] = JSON.parse(match[1]);
  
    const gold = bullionData.find((b) => b.symbol === 'GOLD');
    const silver = bullionData.find((b) => b.symbol === 'SILVER');
  
    const getUnit = (bullion: Bullion | undefined, unitName: string) =>
      bullion?.units.find((u) => u.unitName === unitName);
  
    return {
      gold: {
        tola: getUnit(gold, '1 TOLA'),
        tenGram: getUnit(gold, '10 GRAM'),
      },
      silver: {
        tola: getUnit(silver, '1 TOLA'),
        tenGram: getUnit(silver, '10 GRAM'),
      },
      updatedAt: new Date().toISOString(),
    };
  }