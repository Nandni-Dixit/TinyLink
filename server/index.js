require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());


function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

//  Health Check
app.get('/healthz', (req, res) => {
  res.status(200).json({ 
    ok: true, 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// CREATE LINK (POST /api/links)
app.post('/api/links', async (req, res) => {
  const { originalUrl, shortCode } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  
  let code = shortCode || generateShortCode();

  try {
    const existing = await prisma.link.findUnique({
      where: { shortCode: code }
    });

    if (existing) {
      return res.status(409).json({ error: 'Short code already exists. Try another one.' });
    }

    
    const newLink = await prisma.link.create({
      data: {
        originalUrl,
        shortCode: code
      }
    });

    res.status(201).json(newLink);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

//  REDIRECT (GET /:code) 
app.get('/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const link = await prisma.link.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    
    await prisma.link.update({
      where: { id: link.id },
      data: { 
        clicks: { increment: 1 },
        lastClickedAt: new Date()
      }
    });

    
    res.redirect(link.originalUrl);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//  Get All Links 
app.get('/api/links', async (req, res) => {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: 'desc' } 
    });
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch links' });
  }
});

//  GET SINGLE LINK STATS (GET /api/links/:code)
app.get('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const link = await prisma.link.findUnique({
      where: { shortCode: code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(link);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE LINK (DELETE /api/links/:code)
app.delete('/api/links/:code', async (req, res) => {
  const { code } = req.params;
  try {
    await prisma.link.delete({
      where: { shortCode: code }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Link not found' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});