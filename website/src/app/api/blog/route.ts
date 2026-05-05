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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { blogId, mediaUrl, type } = body;
    
    const jsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    const existingData = fs.readFileSync(jsonPath, 'utf8');
    const blogs = JSON.parse(existingData);
    
    const index = blogs.findIndex((b: any) => b.id === blogId);
    if (index === -1) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    
    if (type === 'certificateImage') {
      const filePath = path.join(process.cwd(), 'public', blogs[index].certificateImage);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      blogs[index].certificateImage = undefined;
      blogs[index].image = undefined;
    } else {
      if (blogs[index].additionalMedia) {
        blogs[index].additionalMedia = blogs[index].additionalMedia.filter((url: string) => url !== mediaUrl);
        if (blogs[index].additionalMedia.length === 0) blogs[index].additionalMedia = undefined;
      }
      const filePath = path.join(process.cwd(), 'public', mediaUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    
    fs.writeFileSync(jsonPath, JSON.stringify(blogs, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string || '';
    const category = formData.get('category') as string || '';
    const date = formData.get('date') as string || '';
    const excerpt = formData.get('excerpt') as string || '';
    const kicker = formData.get('kicker') as string || '';
    const subHeadline = formData.get('subHeadline') as string || '';
    const author = formData.get('author') as string || '';
    
    const mode = formData.get('mode') as string;
    const editId = formData.get('editId') as string;
    
    const contentText = formData.get('content') as string || '';
    const paragraphs = contentText.split('\n').filter(p => p.trim() !== '');

    const slug = mode === 'edit' && editId ? editId : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const imagesDir = path.join(process.cwd(), 'public', 'images', slug);
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }

    let certificateImagePath = '';
    const certFile = formData.get('certificateImage') as File;
    if (certFile && certFile.name && certFile.size > 0) {
      const extension = certFile.name.split('.').pop();
      const filename = `certificate.${extension}`;
      const filePath = path.join(imagesDir, filename);
      const buffer = Buffer.from(await certFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      certificateImagePath = `/images/${slug}/${filename}`;
    }

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

    const newBlog: any = {
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

    const jsonPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    const existingData = fs.readFileSync(jsonPath, 'utf8');
    const blogs = JSON.parse(existingData);

    if (mode === 'edit' && editId) {
      const index = blogs.findIndex((b: any) => b.id === editId);
      if (index !== -1) {
        const oldBlog = blogs[index];
        newBlog.image = newBlog.image || oldBlog.image;
        newBlog.certificateImage = newBlog.certificateImage || oldBlog.certificateImage;
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
