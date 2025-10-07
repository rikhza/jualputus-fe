#!/bin/bash

# Build Script
# Builds the application for production

set -e

echo "🏗️  Building JualPutus for Production"
echo "====================================="
echo ""

# Clean previous build
if [ -d "dist" ]; then
    echo "🧹 Cleaning previous build..."
    rm -rf dist
    echo "✅ Cleaned!"
    echo ""
fi

# Run type check
echo "🔍 Type checking..."
bun run typecheck
echo "✅ Type check passed!"
echo ""

# Run linter
echo "🔍 Linting..."
bun run lint
echo "✅ Lint check passed!"
echo ""

# Build
echo "📦 Building application..."
bun run build
echo "✅ Build completed!"
echo ""

# Show build size
if [ -d "dist" ]; then
    echo "📊 Build size:"
    du -sh dist
    echo ""
fi

echo "🎉 Production build ready!"
echo ""
echo "To preview: bun run preview"
echo ""

