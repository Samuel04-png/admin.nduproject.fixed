# Changelog

## [Unreleased] - TengaLoans Rebranding

### Changed
- **Product Rebranding**: Renamed "LoanSage" to "TengaLoans" throughout the application
  - Updated all product name references in `src/pages/HomePage.tsx`
  - Changed product showcase section title from "LoanSage Product Showcase" to "TengaLoans Product Showcase"
  - Updated all user-facing text from "LoanSage" to "TengaLoans"
  
- **URL Updates**: Updated all external links from Vercel deployment URL to the new domain
  - Changed floating badge link from `https://loansage-iwezhjgya-skamanga85-7017s-projects.vercel.app/` to `https://tengaloans.com`
  - Updated CTA button links to point to `https://tengaloans.com`
  - Updated all "Try LoanSage" buttons to "Try TengaLoans" with new URL

- **Image Path Updates**: Migrated image assets from `laonsage/` folder to `tengaloans/` folder
  - Updated thumbnail image path: `laonsage/thumbnail.png` → `tengaloans/thumbnail.png`
  - Updated loans page image path: `laonsage/loanspage.png` → `tengaloans/loanspage.png`
  - Updated loan details image path: `laonsage/loandetails.png` → `tengaloans/loandetails.png`
  - All image references in `src/pages/HomePage.tsx` now use the new `tengaloans/` folder

### Files Modified
1. `src/pages/HomePage.tsx`
   - Line 245: Comment updated to "TengaLoans Product Showcase"
   - Line 250: URL updated to `https://tengaloans.com`
   - Line 257: Button text changed from "Try LoanSage" to "Try TengaLoans"
   - Line 276: Product name in heading changed to "TengaLoans"
   - Line 283: Product description updated to reference "TengaLoans"
   - Line 289: Footer text updated to reference "TengaLoans"
   - Line 302: Image path updated to `tengaloans/thumbnail.png`
   - Line 303: Alt text updated to "TengaLoans Dashboard Preview"
   - Line 327: Image path updated to `tengaloans/loanspage.png`
   - Line 334: Image path updated to `tengaloans/loandetails.png`
   - Line 377: Feature section heading updated to reference "TengaLoans"
   - Line 465: CTA text updated to reference "TengaLoans"
   - Line 475: CTA button URL updated to `https://tengaloans.com`
   - Line 481: CTA button text updated to "Try TengaLoans Free"

2. `public/` directory
   - Removed: `public/laonsage/` folder (old folder)
   - Added: `public/tengaloans/` folder with updated images
     - `tengaloans/thumbnail.png` (updated thumbnail)
     - `tengaloans/loanspage.png`
     - `tengaloans/loandetails.png`

### Summary of Changes
- **Total files modified**: 1 source file (`src/pages/HomePage.tsx`)
- **Total files moved/renamed**: 3 image files (moved from `laonsage/` to `tengaloans/`)
- **Total references updated**: 
  - 9 instances of "LoanSage" → "TengaLoans"
  - 2 instances of old Vercel URL → `https://tengaloans.com`
  - 3 image path references updated

### Deployment Notes
- Changes are committed locally but not yet pushed to GitHub
- GitHub Actions workflow (`.github/workflows/deploy.yml`) is already configured for automatic deployment
- Once pushed to `main` branch, the deployment will trigger automatically
- The site will be available at: `https://byteandberry.com` (as configured in `CNAME`)

### Testing Checklist
- [ ] Verify all "TengaLoans" text displays correctly
- [ ] Verify all links point to `https://tengaloans.com`
- [ ] Verify all images load from `tengaloans/` folder
- [ ] Test floating badge link functionality
- [ ] Test CTA button link functionality
- [ ] Verify responsive design on mobile devices
- [ ] Check browser console for any errors

