import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import Link from 'next/link';
import { ArrowLeft, Award } from 'lucide-react';
import blogsData from '@/data/blogs.json';
import { notFound } from 'next/navigation';

export default async function DynamicBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const blog = blogsData.find((b) => b.id === resolvedParams.id) as any;

  if (!blog) {
    notFound();
  }

  return (
    <main className={styles.mainWrapper}>
      <Navbar />
      <div className={styles.newspaperBackground}>
        <div className={styles.pageLayout}>
          <article className={styles.newspaperContainer}>
            <div className={styles.topBar}>
              <Link href="/" className={styles.backLink}>
                <ArrowLeft size={14} />
                BACK
              </Link>
              <span className={styles.date}>{blog.date?.toUpperCase()}</span>
            </div>

            <div className={styles.thickLine}></div>

            <header className={styles.header}>
              <p className={styles.kicker}>{blog.kicker || blog.category}</p>
              <h1 className={styles.mainHeadline}>{blog.title}</h1>
              {blog.subHeadline && <h2 className={styles.subHeadline}>{blog.subHeadline}</h2>}
            </header>

            <div className={styles.thickLine}></div>
            
            <div className={styles.byline}>
              <span className={styles.author}>By <strong>{blog.author || 'Aryan Bajracharya'}</strong></span>
              <span className={styles.category}>
                <Award size={14} /> {blog.category}
              </span>
            </div>

            <div className={styles.doubleLine}></div>

            {/* Mobile Feature Image - Only visible on small screens */}
            {blog.certificateImage && (
              <div className={`${styles.sideImageWrapper} ${styles.mobileOnly}`}>
                <figure className={styles.figureNone}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={blog.certificateImage} alt="Feature Image" className={styles.imageRounded} />
                  {blog.certificateCaption && (
                    <figcaption className={styles.sideFigcaption}>{blog.certificateCaption}</figcaption>
                  )}
                </figure>
              </div>
            )}

            <div className={styles.mainColumn}>
              {blog.paragraphs && blog.paragraphs.length > 0 ? (
                <>
                  <p className={styles.firstParagraph}>
                    <span className={styles.dropCap}>{blog.paragraphs[0].charAt(0)}</span>
                    {blog.paragraphs[0].slice(1)}
                  </p>
                  {blog.paragraphs.slice(1).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </>
              ) : (
                <p>{blog.excerpt}</p>
              )}

              {blog.blockquote && (
                <blockquote className={styles.blockquote}>
                  &quot;{blog.blockquote}&quot;
                </blockquote>
              )}

              {blog.sectionTitle && (
                <h3 className={styles.sectionTitle}>{blog.sectionTitle}</h3>
              )}
              
              {blog.sectionParagraphs && blog.sectionParagraphs.map((p, idx) => (
                <p key={`sp-${idx}`}>{p}</p>
              ))}

              {blog.images && blog.images.length > 0 && (
                <div className={styles.imageWrapperRow}>
                  {blog.images.map((img: any, idx: number) => (
                     <figure key={idx} className={styles.figureBox}>
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={img.src} alt={img.caption || "Image"} className={styles.image} />
                       {img.caption && <figcaption>{img.caption}</figcaption>}
                     </figure>
                  ))}
                </div>
              )}

              {blog.additionalMedia && blog.additionalMedia.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '3rem', marginBottom: '2rem' }}>
                  <h3 className={styles.sectionTitle}>Media Gallery</h3>
                  {blog.additionalMedia.map((mediaUrl: string, idx: number) => {
                    const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
                    return (
                      <figure key={idx} className={styles.figureBox} style={{ margin: 0, width: '100%', position: 'relative' }}>
                        {isVideo ? (
                          <video src={mediaUrl} controls style={{ width: '100%', display: 'block', backgroundColor: '#000' }} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={mediaUrl} alt="Gallery Media" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        )}
                      </figure>
                    );
                  })}
                </div>
              )}
            </div>
            
            <div className={styles.bottomFooterInfo}>
               <span>{blog.footerInfo || "Aryan Bajracharya — PORTFOLIO 2026"}</span>
            </div>
          </article>

          <aside className={styles.sidePaperContainer}>
            <div className={styles.sideColumn}>
              {/* Feature Image moved to sidebar - Only visible on large screens */}
              {blog.certificateImage && (
                <div className={`${styles.sideImageWrapper} ${styles.desktopOnly}`}>
                  <figure className={styles.figureNone}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={blog.certificateImage} alt="Feature Image" className={styles.imageRounded} />
                    {blog.certificateCaption && (
                      <figcaption className={styles.sideFigcaption}>{blog.certificateCaption}</figcaption>
                    )}
                  </figure>
                </div>
              )}

              {blog.takeaways && blog.takeaways.length > 0 && (
                <div className={styles.sideBox}>
                  <h5>KEY TAKEAWAYS</h5>
                  <ul>
                    {blog.takeaways.map((takeaway, idx) => (
                      <li key={idx}>{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              {blog.eventInfo && (
                <div className={styles.sideBox}>
                  <h5>ABOUT THE EVENT</h5>
                  <p>{blog.eventInfo}</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  );
}
