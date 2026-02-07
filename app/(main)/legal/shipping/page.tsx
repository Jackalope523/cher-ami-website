import Link from 'next/link';
import Image from 'next/image';
import Chevron from '@/public/chevron-right.svg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy | Cher Ami',
  description: 'View the Shipping Policy for Cher Ami.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/legal/shipping'
  }
};

export default function Shipping() {
  const shippingPolicyContent = `
    <!DOCTYPE html>
    <html lang="en">
    
    <style>
  [data-custom-class='body'], [data-custom-class='body'] * {
          background: transparent !important;
        }
[data-custom-class='title'], [data-custom-class='title'] * {
          font-family: Arial !important;
font-size: 26px !important;
color: #000000 !important;
        }
[data-custom-class='subtitle'], [data-custom-class='subtitle'] * {
          font-family: Arial !important;
color: #595959 !important;
font-size: 14px !important;
        }
[data-custom-class='heading_1'], [data-custom-class='heading_1'] * {
          font-family: Arial !important;
font-size: 19px !important;
color: #000000 !important;
        }
[data-custom-class='heading_2'], [data-custom-class='heading_2'] * {
          font-family: Arial !important;
font-size: 17px !important;
color: #000000 !important;
        }
[data-custom-class='body_text'], [data-custom-class='body_text'] * {
          color: #595959 !important;
font-size: 14px !important;
font-family: Arial !important;
        }
[data-custom-class='link'], [data-custom-class='link'] * {
          color: #3030F1 !important;
font-size: 14px !important;
font-family: Arial !important;
word-break: break-word !important;
        }
</style>

      <div data-custom-class="body">
      <div><div><div><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>SHIPPING DELIVERY POLICY</h1></span></span></strong></div><div><span style="color: rgb(127, 127, 127);"><strong><span style="font-size: 15px;"><span data-custom-class="subtitle">Last updated <bdt class="question">February 05, 2026</bdt></span></span></strong></span></div><div><br></div><div><br></div><div><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"></bdt>This Shipping & Delivery Policy is part of our <bdt class="question">Terms and Conditions</bdt> ("Terms") and should be therefore read alongside our main Terms: <span style="color: rgb(0, 58, 250);"><bdt class="question"><a target="_blank" data-custom-class="link" href="https://thecherami.com/legal/terms">https://thecherami.com/legal/terms</a></bdt></span>.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span></span></span></span></span></span></span></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">Please carefully review our Shipping & Delivery Policy when purchasing our products. This policy will apply to any order you place with us.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span data-custom-class="heading_1"><strong><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><strong><h2>WHAT ARE MY SHIPPING DELIVERY OPTIONS?</h2></strong></span></span></span></strong></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"><bdt class="block-component"></span></bdt></span></span></span></span></span></span></span><span data-custom-class="body_text"><bdt class="block-component"></bdt></span></span></span></div><div style="line-height: 1.5;"><strong><span data-custom-class="heading_2"><h3>Free Shipping</h3></span></strong></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">We offer free <bdt class="question">standard</bdt> shipping <bdt class="block-component"></bdt><bdt class="block-component"><bdt class="block-component"></bdt></bdt>on all orders<bdt class="else-block"></bdt></span></span></span><bdt class="else-block"></bdt></span></span></span></bdt></span><span data-custom-class="body_text">.</span><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span> <bdt class="block-component"></bdt></bdt></span></span></span></span><span data-custom-class="body_text"><bdt class="block-component"></bdt></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="block-component"></bdt></bdt></span></span></span></div><div style="line-height: 1.5;"><span data-custom-class="heading_1"><strong><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><strong><h2>HOW IS MY SUBSCRIPTION FULFILLED?</h2></strong></span></span></span></strong></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">If you are buying a subscription then we will deliver on: <bdt class="question">The first two weeks of each month depending on printing and shipping times.</bdt><bdt class="block-component"></bdt></span></span></span></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span></span></span></span></div><div><div><div><div><div><div><div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><strong><h2>DO YOU DELIVER INTERNATIONALLY?</h2></strong></span><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"></bdt></span></span></span></div></div></div></div></div></div></div></div><div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">We do not offer international shipping.</span><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="block-component"></bdt></bdt></span></span></span></span></span></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="block-component"></bdt><bdt class="block-component"></bdt></span></span></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="block-component"><bdt class="block-component"></bdt></bdt></bdt></bdt></bdt></span></span></span></span></span></span></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><strong><h2>QUESTIONS ABOUT RETURNS?</h2></strong></span></span></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">If you have questions about returns, please review our Return Policy: <span style="color: rgb(0, 58, 250);"><bdt class="question"><a target="_blank" data-custom-class="link" href="https://thecherami.com/legal/return">https://thecherami.com/legal/return</a></bdt></span>.</span></span></span></div><div style="line-height: 1.5;"><br></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span></span></span></span></div><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><strong><h2>HOW CAN YOU CONTACT US ABOUT THIS POLICY?</h2></strong></span></span></span><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">If you have any further questions or comments, you may contact us by:</span><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"></bdt></bdt></bdt></span></span></span></bdt> </span></span></span></span></span></span></span></span></span></bdt> </span></span></span></span><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="heading_1"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"></bdt></bdt></bdt></span></span></span></bdt></span></span></span></span></span></span></span></span></span></bdt></span></span></span></span><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="block-component"></bdt></bdt></span></span></span></div><ul><li><span style="font-size: 15px; color: rgb(89, 89, 89);"><span style="font-size: 15px; color: rgb(89, 89, 89);"><span data-custom-class="body_text">Email: <bdt class="question"><a target="_blank" data-custom-class="link" href="mailto:help@thecherami.com">help@thecherami.com</a></bdt></span></span></span></li></ul><div><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="block-component"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"></bdt></bdt></bdt></span></span></span></bdt></span></span></span></span></span></span></span></span></span></bdt></span></span></span></span><span data-custom-class="body_text"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"><bdt class="statement-end-if-in-editor"><bdt class="block-component"></bdt></bdt></bdt></span></span></span></span></span></span></div><ul><li><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text">Online contact form: <span style="color:(0, 58, 250);"><bdt class="question"><a target="_blank" data-custom-class="link" href="https://thecherami.com/contact">https://thecherami.com/contact</a></bdt></span></span></span></span></li></ul><div style="line-height: 1.5;"><span style="color: rgb(127, 127, 127);"><span style="color: rgb(89, 89, 89); font-size: 15px;"><span data-custom-class="body_text"><bdt class="statement-end-if-in-editor"></bdt></span></span></span></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div></div><div style="display: none;"><a class="shipping123" href="https://app.termly.io/dsar/9389124f-6c69-4b84-9019-4caa2f7c0a17"></a></div></div><style>
      ul {
        list-style-type: square;
      }
      ul > li > ul {
        list-style-type: circle;
      }
      ul > li > ul > li > ul {
        list-style-type: square;
      }
      ol li {
        font-family: Arial ;
      }
    </style>
      </div>
      
    </html>
  `;

  return (
    <div className="bg-[#FCFBF8] max-w-[1200px] mx-auto px-5 pt-12 pb-36">
      <nav className="flex flex-row gap-x-4 py-3">
        <Link href="/legal" className="text-[1rem] text-[#242832] font-medium">
          Legal
        </Link>
        <Image
          src={Chevron}
          alt="A right facing chevron"
          width={24}
          height={24}
        />
        <p className="text-[1rem] text-[#242832] font-medium underline">
          Shipping Policy
        </p>
      </nav>
      <div>
        <div dangerouslySetInnerHTML={{ __html: shippingPolicyContent }} />
      </div>
    </div>
  );
}
