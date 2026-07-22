// src/app/tools/nepal-gold-silver-price/page.tsx
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getGoldSilverPrice } from '@/lib/gold-price';
import styles from './GoldSilverPage.module.css';

export const revalidate = 3600;

export default async function GoldSilverPage() {
  const { gold, silver, updatedAt } = await getGoldSilverPrice();

  const hasData = gold.tola && gold.tenGram && silver.tola && silver.tenGram;

  const dateLabel = new Date(updatedAt).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <main className={styles.main}>
      <Navbar />
      <section className={styles.section}>
        <div className={`container ${styles.container}`}>
          <div className={`${styles.header} animate-fade-in`}>
            <div className={styles.titleRow}>
                
              <h1>
                Gold &amp; Silver Price<span>.</span>
              </h1>
              <span className={styles.dateBadge}>{dateLabel}</span>
            </div>
            <p>Today&apos;s official gold and silver rate in Nepal, per tola and per 10 gram.</p>
          </div>

          {!hasData ? (
            <div className={`${styles.priceBox} animate-fade-in`}>
              <p className={styles.error}>
                Price data is temporarily unavailable. Please check back shortly.
              </p>
            </div>
          ) : (
            <div className={`${styles.grid} animate-fade-in`}>
              <div className={`${styles.card} ${styles.goldCard}`}>
                <span className={styles.label}>Gold &middot; 1 Tola</span>
                <p className={styles.price}>Rs. {gold.tola!.price.toLocaleString()}/-</p>
                <p className={styles.change}>
                  ▲ Rs. {gold.tola!.change.toLocaleString()} (+{gold.tola!.changePercent}%)
                </p>
                <p className={styles.subPrice}>
                  10 Gram: Rs. {gold.tenGram!.price.toLocaleString()}
                </p>
              </div>

              <div className={`${styles.card} ${styles.silverCard}`}>
                <span className={styles.label}>Silver &middot; 1 Tola</span>
                <p className={styles.price}>Rs. {silver.tola!.price.toLocaleString()}/-</p>
                <p className={styles.change}>
                  ▲ Rs. {silver.tola!.change.toLocaleString()} (+{silver.tola!.changePercent}%)
                </p>
                <p className={styles.subPrice}>
                  10 Gram: Rs. {silver.tenGram!.price.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}