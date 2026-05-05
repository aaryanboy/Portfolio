import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    if (!fs.existsSync(jsonPath)) return NextResponse.json([]);
    const existingData = fs.readFileSync(jsonPath, 'utf8');
    return NextResponse.json(JSON.parse(existingData));
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse text fields
    const title = formData.get('title') as string || '';
    const category = formData.get('category') as string || '';
    const date = formData.get('date') as string || '';
    const excerpt = formData.get('excerpt') as string || '';
    const kicker = formData.get('kicker') as string || '';
    const subHeadline = formData.get('subHeadline') as string || '';
    const author = formData.get('author') as string || '';
    
    // Check if we are editing
    const mode = formData.get('mode') as string;
    const editId = formData.get('editId') as string;
    
    // Convert content from textarea to array of paragraphs
    const contentText = formData.get('content') as string || '';
    const paragraphs = contentText.split('\n').filter(p => p.trim() !== '');

    // Generate or re-use Slug
    const slug = mode === 'edit' && editId ? editId : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    // Handle Image Uploads
    const imagesDir = path.join(process.cwd(), 'public', 'images', slug);
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    let certificateImagePath = '';
    const certFile = formData.get('certificateImage') as File;
    if (certFile && certFile.name) {
      const extension = certFile.name.split('.').pop();
      const filename = `certificate.${extension}`;
      const filePath = path.join(imagesDir, filename);
      
      const buffer = Buffer.from(await certFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      
      certificateImagePath = `/images/${slug}/${filename}`;
    }

    // Handle Additional Media
    const additionalMediaPaths: string[] = [];
    const mediaFiles = formData.getAll('additionalMedia') as File[];
    
    for (let i = 0; i < mediaFiles.length; i++) {
        const file = mediaFiles[i];
        if (file && file.name && file.size > 0) {
            const extension = file.name.split('.').pop() || 'jpg';
            const filename = `media_${Date.now()}_${i}.${extension}`;
            const filePath = path.join(imagesDir, filename);
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(filePath, buffer);
            additionalMediaPaths.push(`/images/${slug}/${filename}`);
        }
    }

    // Process other fields (keeping it simple for MVP)
    const newBlog = {
      id: slug,
      title,
      date,
      category,
      excerpt,
      kicker,
      subHeadline,
      author,
      paragraphs,
      image: certificateImagePath || undefined,
      certificateImage: certificateImagePath || undefined,
      additionalMedia: additionalMediaPaths.length > 0 ? additionalMediaPaths : undefined
    };

    // Read existing JSON
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    const existingData = fs.readFileSync(jsonPath, 'utf8');
    const blogs = JSON.parse(existingData);

    // Append or Overwrite
    if (mode === 'edit' && editId) {
        const index = blogs.findIndex((b: any) => b.id === editId);
        if (index !== -1) {
            // Keep old images if not overwritten
            const oldBlog = blogs[index];
            newBlog.image = newBlog.image || oldBlog.image;
            newBlog.certificateImage = newBlog.certificateImage || oldBlog.certificateImage;
            
            // if we are keeping old media? The user might want to accumulate or replace.
            // For now, let's accumulate so they don't lose old images
            if (oldBlog.additionalMedia) {
                newBlog.additionalMedia = [...(newBlog.additionalMedia || []), ...oldBlog.additionalMedia];
            }
            blogs[index] = newBlog;
        } else {
            blogs.push(newBlog);
        }
    } else {
        blogs.push(newBlog);
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(blogs, null, 2));

    return NextResponse.json({ success: true, id: slug });
  } catch (error) {
    console.error("Error creating blog post", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
