#!/bin/bash
echo "🚀 Preparing Azure Static Web Apps Deployment..."

# Check for Azure CLI
if ! command -v az &> /dev/null
then
    echo "❌ Azure CLI (az) not found."
    echo "👉 Please install it first: brew install azure-cli"
    exit 1
fi

echo "✅ Azure CLI found. Authenticating..."
az login --use-device-code

echo "📦 Deploying static files to Azure Static Web Apps..."
npx @azure/static-web-apps-cli deploy ./dist --app-name "rakshatantra-dashboard" --resource-group "RakshaTantra-RG" --location "eastus2" --env "production"
