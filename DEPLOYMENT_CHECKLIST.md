# RakshaTantra AI - Azure Deployment Checklist

## Pre-Deployment

- [ ] Azure account created and verified
- [ ] Azure CLI installed and authenticated (`az login`)
- [ ] Node.js v18+ installed
- [ ] Git configured with credentials
- [ ] Repository pushed to GitHub
- [ ] All environment variables documented

## Azure Setup

- [ ] Resource Group created: `RakshaTantra-RG`
- [ ] Location selected: `eastus2`
- [ ] Static Web App resource created
- [ ] GitHub repository connected (if using GitHub Actions)
- [ ] GitHub personal access token generated
- [ ] Secrets configured in GitHub:
  - [ ] `AZURE_STATIC_WEB_APPS_API_TOKEN`
  - [ ] `VITE_API_BASE_URL`
  - [ ] `VITE_CAMERA_SERVICE_URL`

## Application Configuration

- [ ] `.env.production` created with correct values
- [ ] `staticwebapp.config.json` reviewed and updated
- [ ] Build configuration verified in `vite.config.js`
- [ ] API endpoints configured
- [ ] Camera service endpoints configured

## Build & Testing

- [ ] `npm install` completed successfully
- [ ] `npm run build` produces dist folder
- [ ] `npm run preview` works locally
- [ ] All tests passing: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] No console errors or warnings

## Deployment Methods

### Option 1: GitHub Actions (Recommended)

- [ ] `.github/workflows/azure-deploy.yml` created
- [ ] Workflow file committed to repository
- [ ] GitHub Actions enabled in repository settings
- [ ] Secrets configured in GitHub repository settings
- [ ] Test deployment with pull request
- [ ] Verify automatic deployment on merge to master

### Option 2: Azure CLI

- [ ] Run: `bash azure-deploy.sh`
- [ ] Verify deployment status
- [ ] Check application URL

### Option 3: ARM Template

- [ ] Update `azure-deploy-template.json` with correct parameters
- [ ] Deploy: `az deployment group create --resource-group RakshaTantra-RG --template-file azure-deploy-template.json`
- [ ] Verify resource creation

## Post-Deployment

- [ ] Application accessible at Azure URL
- [ ] All pages load correctly
- [ ] Camera feed displays properly
- [ ] Voice alerts functional
- [ ] Multilingual support working
- [ ] Credit system operational
- [ ] AI assistant responsive
- [ ] Notifications displaying correctly

## Monitoring & Maintenance

- [ ] Azure Portal monitoring configured
- [ ] Application Insights enabled
- [ ] Error tracking configured
- [ ] Performance metrics monitored
- [ ] Budget alerts set up
- [ ] Backup strategy implemented

## Security

- [ ] HTTPS enabled (automatic with Azure)
- [ ] Security headers configured in `staticwebapp.config.json`
- [ ] CORS policies reviewed
- [ ] API authentication configured
- [ ] Secrets not committed to repository
- [ ] `.gitignore` includes sensitive files

## Custom Domain (Optional)

- [ ] Domain registered
- [ ] DNS records configured
- [ ] SSL certificate provisioned
- [ ] Custom domain verified in Azure
- [ ] Redirect from old domain configured

## Performance Optimization

- [ ] CDN enabled for static assets
- [ ] Caching headers configured
- [ ] Images optimized
- [ ] Bundle size analyzed
- [ ] Load testing completed

## Documentation

- [ ] Deployment guide updated
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide created
- [ ] Team trained on deployment process

## Rollback Plan

- [ ] Previous version tagged in Git
- [ ] Rollback procedure documented
- [ ] Database backup strategy in place
- [ ] Communication plan for incidents

## Sign-Off

- [ ] Project Manager approval: _______________
- [ ] Tech Lead approval: _______________
- [ ] QA approval: _______________
- [ ] Deployment date: _______________
- [ ] Deployed by: _______________

## Post-Launch Monitoring (First 24 Hours)

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify all features working
- [ ] Monitor user feedback
- [ ] Be ready for quick rollback if needed
