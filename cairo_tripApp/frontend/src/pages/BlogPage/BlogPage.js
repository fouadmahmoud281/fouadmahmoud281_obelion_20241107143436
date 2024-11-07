import React, { useState } from 'react';
import './BlogPage.css';
import axios from 'axios';

const BlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveDraft = async () => {
    try {
      const formData = {
        title,
        content,
        tags,
        image: image ? image.name : null,
        isPublished: false
      };
      await axios.post('https://cairo-tripapp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Draft saved successfully');
    } catch (error) {
      setErrorMessage('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    try {
      const formData = {
        title,
        content,
        tags,
        image: image ? image.name : null,
        isPublished: true
      };
      await axios.post('https://cairo-tripapp-backend.cloud-stacks.com/api/posts', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Blog post published successfully');
    } catch (error) {
      setErrorMessage('Failed to publish post');
    }
  };

  return (
    <div className="blog-page">
      <header className="header">
        <h1>Create and Publish Blog Post</h1>
      </header>
      <nav className="navigation">
        <ul>
          <li><a href="#new-post">New Post</a></li>
          <li><a href="#drafts">Drafts</a></li>
          <li><a href="#published-posts">Published Posts</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </nav>
      <main className="editor">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <div className="actions">
          <button onClick={handleSaveDraft}>Save as Draft</button>
          <button onClick={handlePublish}>Publish</button>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </main>
      <footer className="footer">
        <p>© 2023 BlogApp. All rights reserved.</p>
        <a href="#privacy-policy">Privacy Policy</a>
        <a href="#terms-of-service">Terms of Service</a>
      </footer>
    </div>
  );
};

export default BlogPage;
