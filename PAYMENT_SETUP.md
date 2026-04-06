# Payment QR Code Setup

## How It Works

1. Customer clicks "Buy Now" on any product
2. They're redirected to `/payment` page
3. Payment page shows:
   - Order summary with product details
   - Total amount (including 18% GST)
   - QR code for UPI payment
   - Payment instructions

## Setup Instructions

### 1. Upload Your Payment QR Code

Place your UPI payment QR code image in the `public` folder:

```
technovalves/public/payment-qr.png
```

The QR code should be:
- A valid UPI QR code (from Google Pay, PhonePe, Paytm, etc.)
- PNG or JPG format
- Square aspect ratio recommended
- Clear and scannable

### 2. Generate Your UPI QR Code

You can generate a UPI QR code from:
- **Google Pay**: Settings → Business Tools → QR Code
- **PhonePe**: Profile → My QR Code → Download
- **Paytm**: Profile → Payment Settings → Show QR Code
- **Any Bank App**: Usually in Profile or Settings

### 3. Test the Flow

1. Go to `/products`
2. Click "Buy Now" on any product
3. Verify the payment page shows:
   - Correct product details
   - Correct pricing with GST
   - Your QR code image
4. Test scanning the QR code with your phone

## Payment Flow

```
Products Page → Click "Buy Now" → Payment Page (QR Code) → Confirmation
```

## Features

- ✅ Order summary with GST calculation
- ✅ Unique order ID generation
- ✅ 30-minute payment validity timer
- ✅ Step-by-step payment instructions
- ✅ Payment confirmation button
- ✅ Cancel option to return to products
- ✅ Automatic redirect after confirmation

## Customization

### Change GST Rate
Edit `src/pages/Payment.tsx` line with GST calculation:
```typescript
// Current: 18% GST
<span>₹{(product.price * 0.18).toLocaleString('en-IN')}</span>

// Change to 12%:
<span>₹{(product.price * 0.12).toLocaleString('en-IN')}</span>
```

### Change QR Code Path
If you want to use a different filename, edit `src/pages/Payment.tsx`:
```typescript
<img src="/payment-qr.png" alt="Payment QR Code" />
// Change to:
<img src="/your-qr-code.png" alt="Payment QR Code" />
```

## Important Notes

- Payment verification is manual (within 24 hours message shown)
- Customer clicks "I've Completed Payment" after paying
- You'll need to verify payments manually via your UPI app
- Consider adding a backend system for automatic verification later

## Next Steps

1. Upload your QR code as `/public/payment-qr.png`
2. Test the complete flow
3. Consider adding email notifications for payment confirmations
4. Add order tracking system (future enhancement)
