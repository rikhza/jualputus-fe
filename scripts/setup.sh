#!/bin/bash

# JualPutus Setup Script
# This script sets up the development environment

set -e

echo "🚀 JualPutus Frontend Setup"
echo "============================"
echo ""

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
    echo "❌ Bun is not installed!"
    echo ""
    echo "Please install Bun first:"
    echo "curl -fsSL https://bun.sh/install | bash"
    echo ""
    echo "Or using npm:"
    echo "npm install -g bun"
    exit 1
fi

echo "✅ Bun is installed: $(bun --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
bun install

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Install Playwright browsers
echo "🎭 Installing Playwright browsers..."
bunx playwright install

echo ""
echo "✅ Playwright browsers installed!"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env 2>/dev/null || echo "# Environment Variables" > .env
    echo "✅ .env file created!"
    echo ""
fi

# Run type check
echo "🔍 Running type check..."
bun run typecheck

echo ""
echo "✅ Type check passed!"
echo ""

# Display next steps
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start development server: bun run dev"
echo "2. Run tests: bun run test:e2e"
echo "3. Build for production: bun run build"
echo ""
echo "Happy coding! 💻"

