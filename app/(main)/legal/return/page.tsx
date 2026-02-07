import Link from 'next/link';
import Image from 'next/image';
import Chevron from '@/public/chevron-right.svg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy | Cher Ami',
  description: 'View the Return Policy for Cher Ami.',
  robots: {
    noimageindex: true,
  },
  alternates: {
    canonical: 'https://thecherami.com/legal/return'
  }
};

export default function Return() {
  const returnPolicyContent = `
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
      <div><div align="center" class="MsoNormal" style="text-align:center;line-height:115%;"><a name="_2cipo4yr3w5d"></a><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>RETURN POLICY</h1></span></span></strong></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><br></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><strong><span data-custom-class="subtitle">Last updated <bdt class="question">February 05, 2026</bdt></span></strong></span></span></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><span style="font-size: 15px;"><br><a name="_2cipo4yr3w5d"></a></span></div></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-component"></bdt>Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for <bdt class="block-container if" data-type="if" id="03b751bb-5eee-5230-df87-d0707fec3124"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="policy_type" data-type="statement"></bdt><bdt data-type="body">a refund only</bdt></bdt><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="policy_type" data-type="statement"></bdt></bdt>. Please see below for more information on our return policy.</span></div></div><div style="line-height: 1.5;"><br></div><div><div class="MsoNormal" data-custom-class="heading_1" style="line-height: 115%;"><a name="_iwimutmowezb"></a><strong><span style="line-height: 115%; font-family: Arial; font-size: 19px;"><h2>RETURNS</h2></span></strong></div></div><div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">All returns must be requested within <bdt class="block-container question question-in-editor" data-id="10b33c27-be1f-aeda-7ea3-7c1f52ee6130" data-type="question">thirty (30)</bdt> days of the purchase date.</span></div></div><div style="line-height: 1.5;"><br></div><div><div class="MsoNormal" data-custom-class="heading_1" style="line-height: 1.5;"><a name="_16t1v96tankw"></a><strong><span style="line-height: 115%; font-family: Arial; font-size: 19px;"><h2>RETURN PROCESS</h2></span></strong></div></div><div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">To return an item, <bdt class="block-container if" data-type="if" id="51c4b423-789c-79e6-4161-743acb653a2d"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="authorization_option" data-type="statement"></bdt></bdt>place the item securely in its original packaging<bdt class="block-container if" data-type="if" id="903ce2af-7990-07ea-2615-36e36315d483"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="return_inlcude_option" data-type="statement"></bdt><bdt data-type="body">, and</bdt></bdt><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="null" data-type="statement"></bdt></bdt> mail your return to the following address:</span></div><div class="MsoNormal" style="line-height: 1.1;"><span style="font-size: 15px;"><span style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><br></span></span></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 115%;"><span style="font-size: 15px;"><span style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-container question question-in-editor" data-id="49265208-ebd3-4d63-5ecb-9fcda064a7d5" data-type="question">__________</bdt><br></span></span></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><span style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">Attn: Returns</span></span></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><span style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-container if" data-type="if" id="2e485380-f516-a019-540b-f82bd718b0df"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="authorization_option" data-type="statement"></bdt></bdt></span></span></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><bdt class="block-container question question-in-editor" data-id="22673e85-8c82-1948-b0e9-b16dd7c6f007" data-type="question">__________</bdt></span></span><bdt class="block-component"></bdt></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><span style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-container question question-in-editor" data-id="765d45c0-0386-b367-b58a-832b154c7ee8" data-type="question">__________</bdt>, <bdt class="block-component"></bdt> <bdt class="block-container question question-in-editor" data-id="85b0476b-4b2d-4b3d-060f-fc67c287cbe7" data-type="question">__________</bdt><bdt class="block-component"></bdt></span></span></div></div><div style="line-height: 1.1;"><br></div><div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-container if" data-type="if" id="b7518b5d-84c0-c06e-ad97-c7421eb67b0b"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="shipping_fee_option" data-type="statement"></bdt><bdt data-type="body">Please note, you will be responsible for all return shipping charges. We strongly recommend that you use a trackable method to mail your return. </bdt></bdt><bdt class="statement-end-if-in-editor" data-type="close"></bdt></bdt><bdt class="block-container if" data-type="if" id="d3f0beb2-1468-a072-da09-6936c6e877e2"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="shipping_fee_option" data-type="statement"></bdt></bdt><bdt class="block-container if" data-type="if" id="48a0f62a-d42f-f443-061d-cbbf93b49154"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="shipping_fee_option" data-type="statement"></bdt></bdt><bdt class="block-container if" data-type="if" id="ac6ab4e0-da32-a003-8324-04d8b43cb50c"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="shipping_fee_option" data-type="statement"></bdt></bdt></span></div><div class="MsoNormal" style="line-height: 1.5;"><br></div><div class="MsoNormal" data-custom-class="heading_1" style="line-height: 1.5;"><a name="_qxq7t4ufn5pr"></a><strong><span style="line-height: 115%; font-family: Arial; font-size: 19px;"><h2>REFUNDS</h2></span></strong></div><div class="MsoNormal" style="line-height: 115%;"><a name="_kcap2nw8xg2p"></a></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">After receiving your return and inspecting the condition of your item, we will process your <bdt class="block-container if" data-type="if" id="4c11860e-4346-687b-5cb3-3727f319e194"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="policy_type" data-type="statement"></bdt><bdt data-type="body">return</bdt></bdt><bdt class="statement-end-if-in-editor" data-type="close"></bdt></bdt>. Please allow at least <bdt class="block-container question question-in-editor" data-id="ab10b1ab-f4a1-256f-29ae-65257d891371" data-type="question">seven (7)</bdt> days from the receipt of your item to process your <bdt class="block-container if" data-type="if" id="4c11860e-4346-687b-5cb3-3727f319e194" style="font-size: 14.6667px;"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="policy_type" data-type="statement"></bdt><bdt data-type="body">return</bdt></bdt><bdt class="statement-end-if-in-editor" data-type="close"></bdt></bdt>.<bdt class="block-container if" data-type="if" id="16f989a0-873e-9d7c-70f2-1c4b9cc7ecc4"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="policy_type" data-type="statement"></bdt><bdt data-type="body"> Refunds may take 1-2 billing cycles to appear on your credit card statement, depending on your credit card company.</bdt></bdt><bdt class="statement-end-if-in-editor" data-type="close"></bdt></bdt><bdt class="block-container if" data-type="if" id="b49c01dc-6b19-275b-5996-06e6aeaaf917"><bdt data-type="conditional-block"><bdt class="block-component" data-record-question-key="customer_notification_option" data-type="statement"></bdt><bdt data-type="body"> We will notify you by email when your return has been processed.</bdt></bdt></bdt><bdt class="block-container if" data-type="if" id="b49c01dc-6b19-275b-5996-06e6aeaaf917"><bdt class="statement-end-if-in-editor" data-type="close"></bdt></bdt></span></div><div class="MsoNormal" style="line-height: 115%;"><a name="_gjdgxs"></a></div><div class="MsoNormal" style="line-height: 1.5;"><br></div><div class="MsoNormal" data-custom-class="heading_1" style="line-height: 1.5;"><a name="_33ujiidflcnn"></a><strong><span style="line-height: 115%; font-family: Arial; font-size: 19px;"><h2>EXCEPTIONS</h2></span></strong><span style="font-size: 15px;"><bdt class="block-component"></bdt><bdt class="block-component"></bdt></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="color: rgb(89, 89, 89);"><span style="font-size: 15px;">For defective or damaged products, please contact us at the contact details below to arrange a refund or exchange.</span></span></div><div data-custom-class="body_text" data-empty="true" style="line-height: 1.5;"><span style="color: rgb(89, 89, 89);"><span style="font-size: 15px;"><bdt class="block-component"></bdt></span></span><span style="font-size: 15px;"><bdt class="block-component"><span style="color: rgb(89, 89, 89);"></bdt></span><span style="color: rgb(89, 89, 89);"><span style="font-size: 15px;"><bdt class="block-component"></bdt><bdt class="block-component"></bdt></span></div><div style="line-height: 1.5;"><br></div><div data-custom-class="heading_1" style="line-height: 1.5;"><span style="font-size: 19px; color: rgb(0, 0, 0);"><strong><h2>QUESTIONS</h2></strong></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);">If you have any questions concerning our return policy, please contact us at:</span></div><div data-custom-class="body_text" style="line-height: 1.1;"><br></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><bdt class="block-component"></bdt></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><bdt class="question"><span style="color: rgb(89, 89, 89);">(646) 500-8693</span></bdt><span style="color: rgb(89, 89, 89);"><bdt class="statement-end-if-in-editor"></bdt></span></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><bdt class="question"><a target="_blank" data-custom-class="link" href="mailto:help@thecherami.com">help@thecherami.com</a></bdt></span><div style="display: none;"><a class="return123" href="https://app.termly.io/dsar/b157c2fc-25a3-4f98-b2f3-315b7ee3bb4c"></a></div></div><style>
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
        <h1 className="text-[1rem] text-[#242832] font-medium underline">
          Return Policy
        </h1>
      </nav>
      <div className="flex flex-col gap-6 pt-12">
        <p className="text-[1rem] text-[#242832] font-medium">
          Last updated February 05, 2026
        </p>
        <p className="text-[1rem] text-[#242832]">
          Thank you for your purchase—we hope your recipient is happy with their magazine!
          However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a refund only.
          Please see below for more information on our return policy.
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.5rem] text-[#242832] font-medium">
            RETURNS
          </h2>
          <p className="text-[1rem] text-[#242832]">
            All returns must be requested within thirty (30) days of the purchase date.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.5rem] text-[#242832] font-medium">
            EXCEPTIONS
          </h2>
          <p className="text-[1rem] text-[#242832]">
            Subsequent returns may not be eligible for return to prevent abuse of our product and services.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[1.5rem] text-[#242832] font-medium">
            QUESTIONS
          </h2>
          <p className="text-[1rem] text-[#242832]">
            If you have any questions concerning our return policy, please contact us at:
            <br /><br />
            (646) 500-8693<br />
            help@thecherami.com
          </p>
        </div>
      </div>
    </div>
  );
}
