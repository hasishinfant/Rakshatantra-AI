# Azure Deployment Guide - RakshaTantra AI Worker Safety System

## Prerequisites

1. **Azure Account**: Create a free account at https://azure.microsoft.com/free/
2. **Azure CLI**: Install from https://docs.microsoft.com/cli/azure/install-azure-cli
3. **Node.js**: v18+ installed locally
4. **Git**: For version control

## Quick Start Deployment

### Step 1: Install Azure CLI

```bash
# macOS
brew install azure-cli

# Or download from: https://docs.microsoft.com/cli/azure/install-azure-cli
```

### Step 2: Authenticate with Azure

```bash
az login --use-device-code
```

This will open a browser window for authentication.

### Step 3: Create Resource Group

```bash
az group create \
  --name RakshaTantra-RG \
  --location eastus2
```

### Step 4: Build the Application

```bash
npm install
npm run build
```

### Step 5: Deploy to Azure Static Web Apps

```bash
# Option A: Using the provided script
bash azure-deploy.sh

# Option B: Manual deployment
npx @azure/static-web-apps-cli deploy ./dist \
  --app-name "rakshatantra-dashboard" \
  --resource-group "RakshaTantra-RG" \
  --location "eastus2" \
  --env "production"
```

## Detailed Setup Instructions

### Create Static Web App via Azure Portal

1. Go to https://portal.azure.com
2. Click "Create a resource"
3. Search for "Static Web App"
4. Click "Create"
5. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource Group**: RakshaTantra-RG (or create new)
   - **Name**: rakshatantra-dashboard
   - **Region**: East US 2
   - **Hosting Plan**: Free
   - **GitHub Details**: Connect your GitHub repo (optional)

### Configure GitHub Actions (Optional)

If deploying via GitHub:

1. Create `.github/workflows/azure-static-web-apps-deploy.yml`
2. Configure the workflow to build and deploy on push

### Environment Variables

Create a `.env.production` file:

```env
VITE_API_BASE_URL=https://your-api-endpoint.azurewebsites.net
VITE_CAMERA_SERVICE_URL=https://your-camera-service.azurewebsites.net
VITE_ENVIRONMENT=production
```

## Monitoring & Management

### View Deployment Status

```bash
az staticwebapp show \
  --name rakshatantra-dashboard \
  --resource-group RakshaTantra-RG
```

### View Logs

```bash
az staticwebapp logs \
  --name rakshatantra-dashboard \
  --resource-group RakshaTantra-RG
```

### Custom Domain Setup

```bash
az staticwebapp hostname set \
  --name rakshatantra-dashboard \
  --resource-group RakshaTantra-RG \
  --hostname your-domain.com
```

## Cost Optimization

- **Static Web Apps Free Tier**: Includes 100 GB bandwidth/month
- **Recommended**: Use Azure CDN for global distribution
- **Monitoring**: Set up budget alerts in Azure Portal

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Authentication Issues
```bash
# Re-authenticate
az logout
az login --use-device-code
```

### Deployment Timeout
- Check internet connection
- Verify resource group exists
- Ensure sufficient quota in subscription

## Next Steps

1. Set up CI/CD pipeline with GitHub Actions
2. Configure custom domain
3. Enable HTTPS (automatic with Azure)
4. Set up monitoring and alerts
5. Configure backup and disaster recovery

## Support

For issues, check:
- Azure Static Web Apps docs: https://docs.microsoft.com/azure/static-web-apps/
- Azure CLI reference: https://docs.microsoft.com/cli/azure/
