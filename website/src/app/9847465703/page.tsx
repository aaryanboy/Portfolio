"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AdminNewPost() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('Aryan Bajracharya');
  const [kicker, setKicker] = useState('');
  const [subHeadline, setSubHeadline] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');

  // Existing media for preview
  const [existingCertImage, setExistingCertImage] = useState('');
  const [existingMedia, setExistingMedia] = useState<string[]>([]);

  // Fetch blogs on mount
  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setBlogs(data || []))
      .catch(err => console.error("Failed to fetch blogs", err));
  }, []);

  const refreshBlogs = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    setBlogs(data || []);
  };

  const handleSelectPost = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    if (!id) {
      setTitle(''); setCategory(''); setDate(''); setKicker('');
      setSubHeadline(''); setExcerpt(''); setContent('');
      setExistingCertImage(''); setExistingMedia([]);
      return;
    }
    const blog = blogs.find(b => b.id === id);
    if (blog) {
      setTitle(blog.title || '');
      setCategory(blog.category || '');
      setDate(blog.date || '');
      setAuthor(blog.author || 'Aryan Bajracharya');
      setKicker(blog.kicker || '');
      setSubHeadline(blog.subHeadline || '');
      setExcerpt(blog.excerpt || '');
      setContent(blog.paragraphs ? blog.paragraphs.join('\n\n') : '');
      setExistingCertImage(blog.certificateImage || '');
      setExistingMedia(blog.additionalMedia || []);
    }
  };

  const handleDeleteMedia = async (mediaUrl: string, type: 'additionalMedia' | 'certificateImage') => {
    if (!selectedId) return;
    if (!confirm(`Remove this ${type === 'certificateImage' ? 'featured image' : 'media item'}?`)) return;
    
    try {
      const res = await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: selectedId, mediaUrl, type }),
      });
      const data = await res.json();
      if (data.success) {
        if (type === 'certificateImage') {
          setExistingCertImage('');
        } else {
          setExistingMedia(prev => prev.filter(url => url !== mediaUrl));
        }
        setMessage('Media removed successfully!');
        await refreshBlogs();
      } else {
        setMessage('Error removing media: ' + data.error);
      }
    } catch {
      setMessage('Error removing media.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    if (selectedId) {
      formData.append('mode', 'edit');
      formData.append('editId', selectedId);
    }

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Success! Post ${selectedId ? 'updated' : 'created'} at /blog/${data.id}`);
        await refreshBlogs();
        if (!selectedId) {
          (e.target as HTMLFormElement).reset();
          setTitle(''); setCategory(''); setDate(''); setKicker('');
          setSubHeadline(''); setExcerpt(''); setContent('');
        }
      } else {
        setMessage('Error creating post: ' + data.error);
      }
    } catch {
      setMessage('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      <Navbar />
      
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', color: 'var(--accent)', marginBottom: '2rem' }}>{selectedId ? 'Edit Post' : 'Create New Post'}</h1>
        
        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Select Action</label>
          <select 
            value={selectedId} 
            onChange={handleSelectPost}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            <option value="">-- Create a New Post --</option>
            {blogs.map(b => (
               <option key={b.id} value={b.id}>Edit: {b.title}</option>
            ))}
          </select>
        </div>

        {message && (
          <div style={{ padding: '1rem', background: 'rgba(201,162,39,0.1)', border: '1px solid var(--accent)', marginBottom: '2rem', color: 'var(--foreground)' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Title</label>
              <input name="title" required value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} placeholder="Enter post title" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Category</label>
              <input name="category" required value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} placeholder="e.g. Experience, Certificate" />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
             <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Date</label>
              <input name="date" required value={date} onChange={e => setDate(e.target.value)} style={inputStyle} placeholder="e.g. May 2026" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Author</label>
              <input name="author" required value={author} onChange={e => setAuthor(e.target.value)} style={inputStyle} />
            </div>
          </div>

           <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Kicker (Top left tiny text)</label>
              <input name="kicker" value={kicker} onChange={e => setKicker(e.target.value)} style={inputStyle} placeholder="e.g. SKILL SHIKSHYA" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Sub-Headline</label>
              <input name="subHeadline" value={subHeadline} onChange={e => setSubHeadline(e.target.value)} style={inputStyle} placeholder="e.g. CERTIFICATE & EXPERIENCE" />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Short Excerpt (For poster card)</label>
            <textarea name="excerpt" required value={excerpt} onChange={e => setExcerpt(e.target.value)} style={{ ...inputStyle, minHeight: '80px' }} placeholder="Summary to show on the wall..." />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Main Content (Paragraphs separated by new line)</label>
            <textarea name="content" required value={content} onChange={e => setContent(e.target.value)} style={{ ...inputStyle, minHeight: '200px' }} placeholder="Write your post here..." />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Certificate / Featured Image</label>
            <input type="file" name="certificateImage" accept="image/*" style={{ ...inputStyle, padding: '0.5rem' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)' }}>Additional Media (Upload photos and videos for the gallery below the post)</label>
            <input type="file" name="additionalMedia" multiple accept="image/*,video/mp4,video/webm" style={{ ...inputStyle, padding: '0.5rem' }} />
          </div>

          {/* ===== EXISTING MEDIA PREVIEW ===== */}
          {selectedId && (existingCertImage || existingMedia.length > 0) && (
            <div style={{ border: '1px solid var(--border)', padding: '1.5rem', background: 'var(--background-secondary)' }}>
              <h3 style={{ fontFamily: 'Cinzel, serif', color: 'var(--accent)', marginBottom: '1rem', fontSize: '1.1rem' }}>
                Existing Media
              </h3>

              {existingCertImage && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)', fontSize: '0.85rem' }}>Featured Image</label>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={existingCertImage} alt="Featured" style={{ maxWidth: '200px', height: 'auto', border: '1px solid var(--border)' }} />
                    <button
                      type="button"
                      onClick={() => handleDeleteMedia(existingCertImage, 'certificateImage')}
                      style={deleteButtonStyle}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {existingMedia.length > 0 && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--foreground-dim)', fontSize: '0.85rem' }}>Gallery Media ({existingMedia.length} items)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {existingMedia.map((url, idx) => (
                      <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                        {isVideo(url) ? (
                          <video src={url} style={{ width: '150px', height: '100px', objectFit: 'cover', border: '1px solid var(--border)', background: '#000' }} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={url} alt={`Media ${idx + 1}`} style={{ width: '150px', height: '100px', objectFit: 'cover', border: '1px solid var(--border)' }} />
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteMedia(url, 'additionalMedia')}
                          style={deleteButtonStyle}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '1rem', 
              background: 'var(--accent)', 
              color: 'var(--background)', 
              fontWeight: 700,
              fontFamily: 'Cinzel',
              letterSpacing: '0.1em',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '1rem'
            }}
          >
            {loading ? 'Publishing...' : selectedId ? 'Update Post' : 'Publish Post'}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8rem',
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
  fontSize: '1rem',
  fontFamily: 'var(--font-geist-sans)'
};

const deleteButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-8px',
  right: '-8px',
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  background: '#c0392b',
  color: '#fff',
  border: 'none',
  fontSize: '14px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'sans-serif',
  lineHeight: 1,
};
