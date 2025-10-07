#!/bin/bash

# Test Script
# Runs all tests with proper setup

set -e

echo "🧪 Running JualPutus Tests"
echo "========================="
echo ""

# Check if Playwright is installed
if ! bunx playwright --version &> /dev/null; then
    echo "🎭 Playwright not found. Installing..."
    bunx playwright install
    echo ""
fi

# Run type check first
echo "🔍 Type checking..."
bun run typecheck
echo "✅ Type check passed!"
echo ""

# Run linter
echo "🔍 Linting..."
bun run lint
echo "✅ Lint check passed!"
echo ""

# Run E2E tests
echo "🎭 Running E2E tests..."
bun run test:e2e

echo ""
echo "✅ All tests passed!"
echo ""

