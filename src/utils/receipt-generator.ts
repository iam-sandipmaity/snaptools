import type { PaymentDetails } from '@/pages/PaymentSuccess';

export const generateReceiptImage = async (paymentDetails: PaymentDetails): Promise<string> => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Set canvas dimensions
  canvas.width = 800;
  canvas.height = 600;

  // Set background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add border
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Add logo and header
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 32px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Payment Receipt', canvas.width / 2, 80);

  // Add success checkmark
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 150, 40, 0, Math.PI * 2);
  ctx.fillStyle = '#22c55e20';
  ctx.fill();
  ctx.strokeStyle = '#22c55e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2 - 15, 150);
  ctx.lineTo(canvas.width / 2 - 5, 165);
  ctx.lineTo(canvas.width / 2 + 15, 135);
  ctx.stroke();

  // Add payment details
  ctx.fillStyle = '#1a1a1a';
  ctx.font = '20px Inter, system-ui, sans-serif';
  ctx.textAlign = 'left';
  
  const details = [
    ['Payment ID:', paymentDetails.razorpay_payment_id],
    ['Amount:', `${paymentDetails.amount} ${paymentDetails.currency}`],
    ['Status:', paymentDetails.status],
    ['Date:', paymentDetails.timestamp]
  ];

  details.forEach(([label, value], index) => {
    const y = 250 + (index * 50);
    ctx.fillStyle = '#64748b';
    ctx.fillText(label, 100, y);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillText(value as string, 300, y);
  });

  // Add donation message
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'italic 22px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(
    `I have donated ${paymentDetails.amount} ${paymentDetails.currency} to SnapTools`,
    canvas.width / 2,
    500
  );

  // Convert canvas to image
  return canvas.toDataURL('image/png');
};