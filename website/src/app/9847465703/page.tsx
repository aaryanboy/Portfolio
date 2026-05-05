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

  // Fetch blogs on mount
  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setBlogs(data || []))
      .catch(err => console.error("Failed to fetch blogs", err));
  }, []);

  const handleSelectPost = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedId(id);
    if (!id) {
        setTitle(''); setCategory(''); setDate(''); setKicker('');
        setSubHeadline(''); setExcerpt(''); setContent('');
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
        // Refresh blogs after update
        const updatedRes = await fetch('/api/blog');
        const updatedBlogs = await updatedRes.json();
        setBlogs(updatedBlogs);
        if (!selectedId) {
            (e.target as HTMLFormElement).reset();
            setTitle(''); setCategory(''); setDate(''); setKicker('');
            setSubHeadline(''); setExcerpt(''); setContent('');
        }
      } else {
        setMessage('Error creating post: ' + data.error);
      }
    } catch (err) {
      setMessage('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>

      <Footer />
    </main>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  background: 'var(--card-bg)',
  border: '1px solid var(--border)',
  color: 'var(--foreground)',
  fontSize: '1rem',
  fontFamily: 'var(--font-geist-sans)'
};
