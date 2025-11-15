const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://multi-university-landing-pages.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Sample university data
const universityData = {
  'amity': {
    name: 'Amity University',
    location: 'Noida, Uttar Pradesh',
    established: '2005',
    overview: 'Amity University is a leading private university in India, known for its excellence in education, research, and innovation. With state-of-the-art infrastructure and world-class faculty, we provide holistic education to prepare students for global challenges.',
    courses: [
      { name: 'B.Tech Computer Science', duration: '4 years', seats: 120 },
      { name: 'MBA', duration: '2 years', seats: 180 },
      { name: 'BBA', duration: '3 years', seats: 200 },
      { name: 'B.Tech Mechanical', duration: '4 years', seats: 100 },
      { name: 'M.Tech Data Science', duration: '2 years', seats: 60 }
    ],
    fees: {
      'B.Tech Computer Science': { range: '₹2,50,000 - ₹3,00,000', perYear: true },
      'MBA': { range: '₹4,00,000 - ₹5,00,000', perYear: true },
      'BBA': { range: '₹1,50,000 - ₹2,00,000', perYear: true },
      'B.Tech Mechanical': { range: '₹2,20,000 - ₹2,70,000', perYear: true },
      'M.Tech Data Science': { range: '₹3,00,000 - ₹3,50,000', perYear: true }
    },
    placements: {
      averagePackage: '₹8.5 LPA',
      highestPackage: '₹45 LPA',
      topRecruiters: ['Microsoft', 'Amazon', 'Google', 'TCS', 'Infosys', 'Wipro', 'Accenture'],
      placementRate: '95%'
    },
    facilities: [
      'Modern Library with 2L+ Books',
      '24/7 Wi-Fi Campus',
      'State-of-the-art Labs',
      'Sports Complex',
      'Hostel Facilities',
      'Cafeteria & Food Court',
      'Medical Center',
      'Transportation Services'
    ]
  },
  'vit': {
    name: 'VIT University',
    location: 'Vellore, Tamil Nadu',
    established: '1984',
    overview: 'VIT (Vellore Institute of Technology) is one of India\'s premier private universities, recognized for academic excellence and innovation. With a strong focus on research and industry collaboration, VIT prepares students to excel in their chosen fields.',
    courses: [
      { name: 'B.Tech CSE', duration: '4 years', seats: 300 },
      { name: 'B.Tech ECE', duration: '4 years', seats: 250 },
      { name: 'MBA', duration: '2 years', seats: 200 },
      { name: 'BBA', duration: '3 years', seats: 150 },
      { name: 'M.Tech AI & ML', duration: '2 years', seats: 80 }
    ],
    fees: {
      'B.Tech CSE': { range: '₹3,50,000 - ₹4,00,000', perYear: true },
      'B.Tech ECE': { range: '₹3,20,000 - ₹3,70,000', perYear: true },
      'MBA': { range: '₹5,00,000 - ₹6,00,000', perYear: true },
      'BBA': { range: '₹2,00,000 - ₹2,50,000', perYear: true },
      'M.Tech AI & ML': { range: '₹4,00,000 - ₹4,50,000', perYear: true }
    },
    placements: {
      averagePackage: '₹9.2 LPA',
      highestPackage: '₹52 LPA',
      topRecruiters: ['Microsoft', 'Amazon', 'Goldman Sachs', 'Oracle', 'Cisco', 'Dell', 'IBM'],
      placementRate: '97%'
    },
    facilities: [
      'Central Library with 5L+ Books',
      'High-Speed Internet',
      'Advanced Research Labs',
      'Olympic-size Swimming Pool',
      'Hostel with AC/Non-AC Options',
      'Multiple Dining Halls',
      'Health Center',
      'Campus Bus Service'
    ]
  }
};

// API Routes

// Get university data
app.get('/api/university/:id', (req, res) => {
  const { id } = req.params;
  const data = universityData[id.toLowerCase()];
  
  if (!data) {
    return res.status(404).json({ error: 'University not found' });
  }
  
  res.json(data);
});

// Get course fees (simple JSON)
app.get('/api/fees/:universityId', (req, res) => {
  const { universityId } = req.params;
  const data = universityData[universityId.toLowerCase()];
  
  if (!data) {
    return res.status(404).json({ error: 'University not found' });
  }
  
  res.json(data.fees);
});

// Get nested JSON with all university details
app.get('/api/university/:id/details', (req, res) => {
  const { id } = req.params;
  const data = universityData[id.toLowerCase()];
  
  if (!data) {
    return res.status(404).json({ error: 'University not found' });
  }
  
  // Nested JSON structure
  res.json({
    university: {
      basicInfo: {
        name: data.name,
        location: data.location,
        established: data.established
      },
      academic: {
        overview: data.overview,
        courses: data.courses.map(course => ({
          courseDetails: {
            name: course.name,
            duration: course.duration,
            intake: {
              seats: course.seats,
              available: course.seats > 0
            }
          }
        }))
      },
      financial: {
        fees: data.fees,
        scholarships: {
          meritBased: 'Available',
          needBased: 'Available',
          sportsQuota: 'Available'
        }
      },
      career: {
        placements: data.placements,
        internships: {
          provided: true,
          companies: data.placements.topRecruiters
        }
      },
      infrastructure: {
        facilities: data.facilities,
        campusSize: id.toLowerCase() === 'amity' ? '100 acres' : '250 acres',
        hostels: {
          available: true,
          capacity: id.toLowerCase() === 'amity' ? '5000' : '8000'
        }
      }
    }
  });
});

// Submit lead form to Pipedream
app.post('/api/lead/submit', async (req, res) => {
  try {
    const leadData = req.body;
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'state', 'course', 'intakeYear', 'consent'];
    const missingFields = requiredFields.filter(field => !leadData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        missingFields 
      });
    }
    
    // Validate phone number (10 digits, India)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(leadData.phone)) {
      return res.status(400).json({ 
        error: 'Invalid phone number. Must be 10 digits starting with 6-9' 
      });
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      return res.status(400).json({ 
        error: 'Invalid email address' 
      });
    }
    
    // Post to Pipedream webhook
    // Replace with your actual Pipedream webhook URL
    const PIPEDREAM_WEBHOOK_URL = process.env.PIPEDREAM_WEBHOOK_URL || 'https://eozzf7bq5vsk24u.m.pipedream.net';
    
    try {
      const pipedreamResponse = await axios.post(PIPEDREAM_WEBHOOK_URL, {
        timestamp: new Date().toISOString(),
        lead: {
          fullName: leadData.fullName,
          email: leadData.email,
          phone: leadData.phone,
          state: leadData.state,
          course: leadData.course,
          intakeYear: leadData.intakeYear,
          consent: leadData.consent,
          university: leadData.university || 'Unknown'
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      res.json({ 
        success: true, 
        message: 'Lead submitted successfully',
        pipedreamStatus: pipedreamResponse.status
      });
    } catch (pipedreamError) {
      // Log error but still return success (in case Pipedream is down)
      console.error('Pipedream error:', pipedreamError.message);
      res.json({ 
        success: true, 
        message: 'Lead submitted successfully (Pipedream may be unavailable)',
        warning: 'Could not reach Pipedream endpoint'
      });
    }
    
  } catch (error) {
    console.error('Error submitting lead:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});

