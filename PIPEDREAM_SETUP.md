# Pipedream Integration Setup

This guide explains how to set up Pipedream webhook integration for the lead form.

## 🎯 What is Pipedream?

Pipedream is a platform that allows you to connect APIs and automate workflows. We'll use it to receive lead form submissions.

## 📋 Step-by-Step Setup

### Step 1: Create Pipedream Account

1. Go to https://pipedream.com
2. Click "Sign Up" (free account)
3. Sign up with GitHub, Google, or email

### Step 2: Create a New Workflow

1. Once logged in, click **"New Workflow"** button
2. You'll see workflow creation options

### Step 3: Add HTTP Trigger

1. Search for **"HTTP"** in the trigger search
2. Select **"HTTP / Webhook"** trigger
3. Click **"Create Source"**

### Step 4: Configure HTTP Trigger

1. **HTTP Method**: Select `POST`
2. **Response**: You can customize the response message
3. Click **"Save"** or **"Continue"**

### Step 5: Get Your Webhook URL

1. After creating the trigger, you'll see a **webhook URL**
2. It looks like: `https://xxxxx.pipedream.net`
3. **Copy this URL** - you'll need it for the backend

### Step 6: Configure Backend

1. Open `server/.env` file
2. Add your Pipedream webhook URL:
   ```
   PIPEDREAM_WEBHOOK_URL=https://your-webhook-url.pipedream.net
   ```
3. Restart your backend server

### Step 7: Test the Integration

1. Submit a lead form from the landing page
2. Go back to Pipedream workflow
3. You should see the incoming request with lead data

## 🔍 What Data is Sent?

The lead form sends the following data to Pipedream:

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "lead": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "state": "Maharashtra",
    "course": "B.Tech Computer Science",
    "intakeYear": "2024",
    "consent": true,
    "university": "Amity University"
  }
}
```

## 🚀 Advanced: Add Actions to Your Workflow

After receiving the webhook, you can add actions:

### Option 1: Send Email Notification

1. In your Pipedream workflow, click **"+"** to add a step
2. Search for **"Email"** or **"Gmail"**
3. Configure to send email when a new lead arrives

### Option 2: Store in Database

1. Add a step for **"PostgreSQL"**, **"MongoDB"**, or **"Airtable"**
2. Configure to insert lead data into your database

### Option 3: Send to CRM

1. Add integrations like **"Salesforce"**, **"HubSpot"**, or **"Zapier"**
2. Automatically create leads in your CRM

### Option 4: Send SMS

1. Add **"Twilio"** or **"SendGrid"** step
2. Send SMS notifications for new leads

## 📊 Viewing Incoming Leads

### In Pipedream Dashboard

1. Go to your workflow
2. Click on the **"Events"** tab
3. You'll see all incoming webhook requests
4. Click on any event to see the full payload

### Export Data

1. In the Events tab, you can export data as CSV
2. Useful for analysis or backup

## 🔒 Security Considerations

### Webhook Security (Optional)

For production, consider:

1. **Add Authentication**
   - In Pipedream, add HTTP Basic Auth
   - Update backend to send auth headers

2. **Verify Webhook Signature**
   - Pipedream can sign webhooks
   - Verify signature in your workflow

3. **Rate Limiting**
   - Pipedream free tier has rate limits
   - Consider upgrading for high volume

## 🧪 Testing Your Webhook

### Test with cURL

```bash
curl -X POST https://your-webhook-url.pipedream.net \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2024-01-15T10:30:00.000Z",
    "lead": {
      "fullName": "Test User",
      "email": "test@example.com",
      "phone": "9876543210",
      "state": "Maharashtra",
      "course": "B.Tech Computer Science",
      "intakeYear": "2024",
      "consent": true,
      "university": "Amity University"
    }
  }'
```

### Test from Landing Page

1. Fill out the lead form
2. Submit
3. Check Pipedream workflow events
4. Verify data is received correctly

## 🐛 Troubleshooting

### Webhook Not Receiving Data

1. **Check URL**: Verify webhook URL in `.env` matches Pipedream
2. **Check Workflow**: Ensure workflow is active in Pipedream
3. **Check Backend Logs**: Look for errors in server console
4. **Test Directly**: Use cURL to test webhook URL

### Data Not Appearing

1. Check Pipedream workflow is running
2. Verify JSON format is correct
3. Check network tab in browser for API calls

### Rate Limit Issues

- Free tier: 200 invocations/day
- Upgrade to paid plan for higher limits
- Or use multiple workflows for load distribution

## 📈 Monitoring

### Pipedream Dashboard

- View workflow execution history
- See success/failure rates
- Monitor execution time

### Set Up Alerts

1. Add **"Slack"** or **"Email"** action
2. Get notified on errors or high volume

## 🎉 You're All Set!

Your Pipedream integration is now configured. Every lead form submission will:
1. ✅ Be sent to your Pipedream webhook
2. ✅ Appear in your workflow events
3. ✅ Trigger any actions you've configured

---

**Pro Tip**: Use Pipedream's built-in code editor to transform or validate data before sending to other services!

