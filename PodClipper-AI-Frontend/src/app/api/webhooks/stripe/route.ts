// stripe listen --forward-to localhost:3000/api/webhooks/stripe

import { PurchaseConfirmationEmail } from "~/components/purchase-confirmation-email";

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { env } from "~/env";
import { db } from "~/server/db";
import { sendEmail } from "~/actions/email";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-06-30.basil",
});

const webhookSecret = env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") ?? "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error("Webhook signature verification failed", error);
      return new NextResponse("Webhook signature verification failed", {
        status: 400,
      });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerId = session.customer as string;

      const retreivedSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items"] },
      );

      const lineItems = retreivedSession.line_items;
      if (lineItems && lineItems.data.length > 0) {
        const priceId = lineItems.data[0]?.price?.id ?? undefined;

        if (priceId) {
          let creditsToAdd = 0;

          if (priceId === env.STRIPE_SMALL_CREDIT_PACK) {
            creditsToAdd = 50;
          } else if (priceId === env.STRIPE_MEDIUM_CREDIT_PACK) {
            creditsToAdd = 150;
          } else if (priceId === env.STRIPE_LARGE_CREDIT_PACK) {
            creditsToAdd = 500;
          }

          await db.user.update({
            where: { stripeCustomerId: customerId },
            data: {
              credits: {
                increment: creditsToAdd,
              },
            },
          });

          // Retrieve customer email
          const user = await db.user.findUnique({
            where: { stripeCustomerId: customerId },
            select: { email: true },
          });
          
          if (user?.email) {
            await sendEmail({
              to: user.email,
              subject: "Thanks for your purchase 🎉 - PodClipper",
              html: PurchaseConfirmationEmail({ credits: creditsToAdd }),
            });
          }
        }
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new NextResponse("Webhook error", { status: 500 });
  }
}
