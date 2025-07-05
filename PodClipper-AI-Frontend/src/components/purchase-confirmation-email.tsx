// emails/PurchaseConfirmationEmail.tsx
type PurchaseConfirmationEmailProps = {
    credits: number;
  };
  
  export function PurchaseConfirmationEmail({ credits }: PurchaseConfirmationEmailProps) {
    return `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 40px 20px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; color: #111827;">🎉 Thank you for your purchase!</h1>
              <p style="margin: 16px 0 0; font-size: 16px; color: #6b7280;">
                Your credits have been added to your PodClipper account.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 24px; text-align: center;">
              <div style="margin: 24px 0; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
                <p style="margin: 0; font-size: 20px; font-weight: 600; color: #111827;">
                  +${credits} Credits
                </p>
              </div>
              <a href="https://podclipper.vercel.app/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #3b82f6; color: #ffffff; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">
                Go to Dashboard
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 32px; font-size: 14px; color: #6b7280; text-align: center;">
              <p style="margin: 0;">If you have any questions, feel free to contact us at <a href="mailto:support@podclipper.ai" style="color: #3b82f6; text-decoration: none;">support@podclipper.ai</a></p>
              <p style="margin-top: 12px;">– The PodClipper Team 🚀</p>
            </td>
          </tr>
        </table>
      </div>
    `;
}
  