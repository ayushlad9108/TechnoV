# TechnoValves - Multi-Page Setup Complete

## Pages Created

1. **Home** (`/`) - Original landing page with all sections
2. **Products** (`/products`) - Product catalog with Razorpay integration
3. **Industries** (`/industries`) - Industries served showcase
4. **Engineering** (`/engineering`) - Engineering capabilities
5. **Contact** (`/contact`) - Contact form with mailto integration
6. **Get Quote** (`/get-quote`) - Quote request form

## Features Implemented

### Products Page
- Product catalog with filtering by category
- **Buy Now** button on each product
- Razorpay payment gateway integration (placeholder key)
- Product specifications and pricing

### Contact Page
- Contact form that redirects to email
- Opens default mail client with pre-filled subject and body
- Contact information display
- Map placeholder

### Get Quote Page
- Comprehensive quote request form
- Redirects to sales email with all details
- Industry and valve type selection

## Razorpay Integration Setup

To enable Razorpay payments:

1. Sign up at https://razorpay.com/
2. Get your API Key ID from the dashboard
3. Replace `YOUR_RAZORPAY_KEY_ID` in `src/pages/Products.tsx` with your actual key
4. The Razorpay script is already loaded in `index.html`

## Email Configuration

Contact and Quote forms use `mailto:` links:
- Contact: `info@technovalves.com`
- Quote: `sales@technovalves.com`

Update these email addresses in:
- `src/pages/Contact.tsx`
- `src/pages/GetQuote.tsx`

## Image Placeholders

Replace placeholder images with actual images:

### Products Page
- `/images/valve-ball.png`
- `/images/valve-gate.png`
- `/images/valve-globe.png`

### Industries Page
- `/images/industry-oil-gas.jpg`
- `/images/industry-chemical.jpg`
- `/images/industry-power.jpg`
- `/images/industry-water.jpg`

### Engineering Page
- Engineering hero image (currently shows placeholder)

## Running the Project

```bash
npm run dev
```

Navigate to:
- http://localhost:5173/ - Home
- http://localhost:5173/products - Products
- http://localhost:5173/industries - Industries
- http://localhost:5173/engineering - Engineering
- http://localhost:5173/contact - Contact
- http://localhost:5173/get-quote - Get Quote

## Next Steps

1. Replace placeholder images with actual product/industry images
2. Add your Razorpay API key
3. Update email addresses
4. Add more products to the catalog
5. Customize content and specifications
