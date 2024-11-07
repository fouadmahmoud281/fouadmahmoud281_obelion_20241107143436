const BlogPost = require('../models/BlogPostModel');

// Create a new blog post (Save as draft or publish)
exports.createBlogPost = async (req, res) => {
  try {
    const { title, content, tags, image, isPublished } = req.body;
    const newPost = await BlogPost.create({ title, content, tags, image, isPublished });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
};

// Get all blog posts (Drafts and Published)
exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
};

// Get a single blog post by ID
exports.getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve blog post' });
  }
};

// Update an existing blog post
exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, image, isPublished } = req.body;
    const post = await BlogPost.findByPk(id);
    if (post) {
      await post.update({ title, content, tags, image, isPublished });
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
};

// Delete a blog post
exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (post) {
      await post.destroy();
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } else {
      res.status(404).json({ error: 'Blog post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
};
