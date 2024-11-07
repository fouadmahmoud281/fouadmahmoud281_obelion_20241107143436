import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogEditor.css';
import axios from 'axios';

const BlogEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const saveDraft = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('image', image);
      formData.append('isPublished', false);

      await axios.post('https://cairo-tripapp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Draft saved successfully');
    } catch (error) {
      alert('Failed to save draft');
    }
  };

  const publishPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('tags', tags);
      formData.append('image', image);
      formData.append('isPublished', true);

      await axios.post('https://cairo-tripapp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post published successfully');
    } catch (error) {
      alert('Failed to publish post');
    }
  };

  return (
    <div className="blog-editor-container">
      <header>
        <h1>Create and Publish Blog Post</h1>
      </header>
      <nav>
        <Link to="/new-post">New Post</Link>
        <Link to="/drafts">Drafts</Link>
        <Link to="/published-posts">Published Posts</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <main>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea value={content} onChange={handleContentChange}></textarea>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <input type="text" value={tags} onChange={handleTagsChange} />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="action-buttons">
          <button onClick={saveDraft}>Save as Draft</button>
          <button onClick={publishPost} className="primary">Publish</button>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 BlogApp. All rights reserved.</p>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
      </footer>
    </div>
  );
};

export default BlogEditor;
