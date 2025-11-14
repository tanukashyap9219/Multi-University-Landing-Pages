#!/bin/bash

echo "🚀 Setting up University Landing Pages..."
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

# Create .env files if they don't exist
if [ ! -f "server/.env" ]; then
    echo "📝 Creating server/.env file..."
    cat > server/.env << EOF
PORT=5000
PIPEDREAM_WEBHOOK_URL=https://your-pipedream-webhook-url.pipedream.net
EOF
    echo "✅ Created server/.env - Please update PIPEDREAM_WEBHOOK_URL"
fi

if [ ! -f "client/.env" ]; then
    echo "📝 Creating client/.env file..."
    cat > client/.env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF
    echo "✅ Created client/.env"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update server/.env with your Pipedream webhook URL"
echo "2. Run 'npm run dev' to start the application"
echo ""

