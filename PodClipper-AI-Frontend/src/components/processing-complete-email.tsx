// emails/ProcessingCompleteEmail.tsx
type ProcessingCompleteEmailProps = {
    clipsFound: number;
    videoTitle?: string;
  };
  
  export function ProcessingCompleteEmail({ clipsFound, videoTitle }: ProcessingCompleteEmailProps) {
    return `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fafb; padding: 40px 20px;">
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);">
          <tr>
            <td style="padding: 32px; text-align: center;">
              <h1 style="margin: 0; font-size: 26px; color: #111827;">✅ Your video has been processed!</h1>
              <p style="margin: 16px 0 0; font-size: 16px; color: #6b7280;">
                ${videoTitle ? `The video <strong>"${videoTitle}"</strong> is ready.` : "Your video is ready."}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px; text-align: center;">
              <div style="margin: 24px 0; padding: 16px; background-color: #f0fdf4; border-radius: 8px; border: 1px solid #10b981;">
                <p style="margin: 0; font-size: 18px; font-weight: 500; color: #065f46;">
                  We’ve created <strong>${clipsFound}</strong> highlight${clipsFound === 1 ? "" : "s"} from your video!
                </p>
              </div>
              <a href="https://podclipper.vercel.app/dashboard" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background-color: #10b981; color: #ffffff; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">
                View My Clips
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px; font-size: 14px; color: #6b7280; text-align: center;">
              <p style="margin: 0;">Questions or feedback? Reach us at <a href="mailto:support@podclipper.ai" style="color: #10b981; text-decoration: none;">support@podclipper.ai</a></p>
              <p style="margin-top: 12px;">– The PodClipper Team 🎬</p>
            </td>
          </tr>
        </table>
      </div>
    `;
  }
  