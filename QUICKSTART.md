# Quick Start Guide

Get up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Set Up Environment Variables

**Backend** (`server/.env`):
```env
PORT=5000
PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url.pipedream.net
```

**Frontend** (`client/.env` - optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Development Server

```bash
npm run dev
```

This starts both frontend (port 3000) and backend (port 5000).

### 4. Access the Application

- **Amity University**: http://localhost:3000 or http://localhost:3000/amity
- **VIT University**: http://localhost:3000/vit

## 📝 Pipedream Setup (2 minutes)

1. Go to https://pipedream.com and sign up
2. Create a new workflow with HTTP trigger
3. Copy the webhook URL
4. Add it to `server/.env` as `PIPEDREAM_WEBHOOK_URL`
5. Restart the server

## ✅ Test the Application

1. Visit http://localhost:3000
2. Click "Check Course-wise Fees" - modal should open
3. Fill out the lead form and submit
4. Check Pipedream workflow for incoming data

## 🎯 Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions
- See [PIPEDREAM_SETUP.md](./PIPEDREAM_SETUP.md) for advanced Pipedream configuration

---

**That's it!** Your application is ready to use. 🎉

