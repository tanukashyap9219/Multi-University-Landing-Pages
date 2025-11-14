# Deployment Guide

This guide provides step-by-step instructions for deploying the University Landing Pages application to free hosting platforms with SSL.

## 🎯 Deployment Options

### Recommended: Vercel (Frontend) + Railway (Backend)

Both platforms offer:
- ✅ Free SSL certificates
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Generous free tiers

## 📦 Frontend Deployment (Vercel)

### Step 1: Prepare the Frontend

1. Ensure your code is pushed to GitHub
2. Make sure `client/package.json` has the build script

### Step 2: Deploy to Vercel

1. **Sign up/Login**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add `REACT_APP_API_URL` with your backend URL
   - Example: `https://your-backend.railway.app/api`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live with SSL!

### Step 3: Update Backend CORS (if needed)

If you encounter CORS issues, update `server/index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-vercel-app.vercel.app'],
  credentials: true
}));
```

## 🖥️ Backend Deployment (Railway)

### Step 1: Prepare the Backend

1. Ensure `server/package.json` has a start script
2. Create a `Procfile` (optional, Railway auto-detects):
   ```
   web: node index.js
   ```

### Step 2: Deploy to Railway

1. **Sign up/Login**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway will auto-detect Node.js
   - Set **Root Directory**: `server`
   - Set **Start Command**: `node index.js`

4. **Environment Variables**
   - Go to Variables tab
   - Add:
     ```
     PORT=5000
     PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook.pipedream.net
     ```

5. **Generate Domain**
   - Go to Settings → Generate Domain
   - Railway provides a free `.railway.app` domain with SSL

6. **Deploy**
   - Railway will automatically deploy
   - Your API will be live!

## 🔄 Alternative: Render

### Frontend on Render

1. Go to https://render.com
2. Create a new "Static Site"
3. Connect GitHub repository
4. Set:
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
5. Add environment variables
6. Deploy

### Backend on Render

1. Create a new "Web Service"
2. Connect GitHub repository
3. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Add environment variables
5. Render provides free SSL automatically

## 🌐 Alternative: Netlify (Frontend) + Heroku (Backend)

### Netlify Frontend

1. Go to https://netlify.com
2. "Add new site" → "Import an existing project"
3. Connect GitHub
4. Set:
   - **Base directory**: `client`
   - **Build command**: `npm install && npm run build`
   - **Publish directory**: `client/build`
5. Add environment variables
6. Deploy

### Heroku Backend

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Set environment variables:
   ```bash
   heroku config:set PORT=5000
   heroku config:set PIPEDREAM_WEBHOOK_URL=https://your-webhook.pipedream.net
   ```
5. Deploy:
   ```bash
   cd server
   git subtree push --prefix server heroku main
   ```

## 🔐 SSL Certificate

All recommended platforms provide **free SSL certificates automatically**:
- ✅ Vercel: Automatic HTTPS
- ✅ Railway: Automatic HTTPS
- ✅ Render: Automatic HTTPS
- ✅ Netlify: Automatic HTTPS
- ✅ Heroku: Automatic HTTPS (on *.herokuapp.com)

No additional configuration needed!

## 🔗 Connecting Frontend to Backend

After deploying both:

1. **Update Frontend Environment Variable**
   - In Vercel/Netlify/Render dashboard
   - Update `REACT_APP_API_URL` to your backend URL
   - Redeploy frontend

2. **Update Backend CORS**
   - Add your frontend URL to allowed origins
   - Redeploy backend

## 📊 Monitoring

### Check Deployment Status

- **Vercel**: Dashboard shows build logs and deployment status
- **Railway**: Dashboard shows logs and metrics
- **Render**: Dashboard shows build and runtime logs

### Test Your Deployment

1. Visit your frontend URL
2. Test the lead form submission
3. Check Pipedream for incoming webhooks
4. Test API endpoints directly

## 🐛 Common Issues

### Build Fails

- Check build logs in platform dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Not Reaching Backend

- Verify `REACT_APP_API_URL` is set correctly
- Check CORS configuration
- Verify backend is running (check logs)

### Pipedream Not Receiving Data

- Verify webhook URL in backend environment variables
- Check backend logs for errors
- Test webhook URL directly with curl

## 🔄 Continuous Deployment

All platforms support automatic deployments:
- Push to `main` branch → Auto-deploy
- Pull requests → Preview deployments (Vercel/Netlify)

## 📝 Post-Deployment Checklist

- [ ] Frontend is accessible via HTTPS
- [ ] Backend API is accessible via HTTPS
- [ ] Lead form submits successfully
- [ ] Pipedream receives webhook data
- [ ] Course fees modal loads correctly
- [ ] Mobile responsive design works
- [ ] All API endpoints return correct data

## 🎉 You're Live!

Your application is now deployed with:
- ✅ Free SSL certificates
- ✅ Mobile & desktop responsive
- ✅ Working APIs
- ✅ Pipedream integration

---

**Need Help?** Check platform documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)

