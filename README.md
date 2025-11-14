# University Landing Pages

A full-stack application featuring two responsive landing pages for private universities with lead form integration and API endpoints.

## 🚀 Features

- **Two Landing Pages**: 
  - LP-1: Amity University
  - LP-2: VIT University
- **Lead Form**: Integrated with Pipedream webhook
- **Course Fees Modal**: Dynamic fee information from API
- **Responsive Design**: Mobile and desktop optimized
- **RESTful APIs**: Simple and nested JSON endpoints

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, Axios
- **Backend**: Node.js, Express
- **Styling**: CSS3 with responsive design
- **API Integration**: Pipedream webhook

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Pipedream account (for webhook integration)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd Task
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```
   Or install separately:
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Set up environment variables**
   
   Create `server/.env` file:
   ```env
   PORT=5000
   PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url.pipedream.net
   ```
   
   Create `client/.env` file (optional, defaults to localhost):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

### Development Mode

Run both frontend and backend concurrently:
```bash
npm run dev
```

Or run separately:

**Backend Server:**
```bash
npm run server
```

**Frontend Client:**
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Routes

- `/` or `/amity` - Amity University Landing Page
- `/vit` - VIT University Landing Page

## 📡 API Endpoints

### Get University Data
```
GET /api/university/:id
```
Returns university information (amity or vit)

### Get Course Fees
```
GET /api/fees/:universityId
```
Returns course-wise fee structure

### Get Nested University Details
```
GET /api/university/:id/details
```
Returns nested JSON with all university details

### Submit Lead Form
```
POST /api/lead/submit
```
Body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "state": "Maharashtra",
  "course": "B.Tech Computer Science",
  "intakeYear": "2024",
  "consent": true,
  "university": "Amity University"
}
```

### Health Check
```
GET /api/health
```

## 🔗 Pipedream Integration

### Setting up Pipedream Webhook

1. **Create a Pipedream Account**
   - Go to https://pipedream.com
   - Sign up for a free account

2. **Create a New Workflow**
   - Click "New Workflow"
   - Select "HTTP" trigger
   - Copy the webhook URL

3. **Configure the Webhook URL**
   - Add the URL to `server/.env`:
     ```
     PIPEDREAM_WEBHOOK_URL=https://your-webhook-url.pipedream.net
     ```

4. **Test the Integration**
   - Submit a lead form from the landing page
   - Check your Pipedream workflow to see the incoming data

### Sample Pipedream Workflow

You can add steps in Pipedream to:
- Store leads in a database
- Send email notifications
- Integrate with CRM systems
- Send SMS alerts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🚢 Deployment

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

**Frontend (Vercel):**
1. Push code to GitHub
2. Import project to Vercel
3. Set build command: `cd client && npm install && npm run build`
4. Set output directory: `client/build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend-url.com/api`

**Backend (Railway/Render):**
1. Connect GitHub repository
2. Set root directory: `server`
3. Set start command: `node index.js`
4. Add environment variables from `.env`

### Option 2: Netlify (Frontend) + Heroku (Backend)

Similar process as above, using Netlify for frontend and Heroku for backend.

### Option 3: Full Stack on Render

1. Create a Web Service
2. Set build command: `npm run install-all && cd client && npm run build`
3. Set start command: `cd server && node index.js`
4. Configure environment variables

### SSL Certificate

All recommended platforms (Vercel, Netlify, Railway, Render) provide free SSL certificates automatically.

## 📁 Project Structure

```
Task/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage1.js
│   │   │   ├── LandingPage2.js
│   │   │   ├── LeadForm.js
│   │   │   ├── FeesModal.js
│   │   │   └── *.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js
│   └── package.json
├── package.json
└── README.md
```

## 🧪 Testing the APIs

### Using cURL

**Get University Data:**
```bash
curl http://localhost:5000/api/university/amity
```

**Get Course Fees:**
```bash
curl http://localhost:5000/api/fees/amity
```

**Submit Lead Form:**
```bash
curl -X POST http://localhost:5000/api/lead/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "state": "Maharashtra",
    "course": "B.Tech Computer Science",
    "intakeYear": "2024",
    "consent": true,
    "university": "Amity University"
  }'
```

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is in use, change it in `server/.env`:
```
PORT=5001
```

### CORS Issues
CORS is enabled in the backend. If you encounter issues, check the `cors` configuration in `server/index.js`.

### Pipedream Not Receiving Data
1. Verify the webhook URL in `.env`
2. Check Pipedream workflow is active
3. Review server logs for errors

## 📝 License

This project is open source and available for educational purposes.

## 👤 Author

Created as part of a technical assessment.

---

**Note**: Remember to update the Pipedream webhook URL in your production environment variables before deploying!

# Multi-Uuniversity-Landing-Pages
