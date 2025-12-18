import Link from 'next/link';
import Image from 'next/image';
import Chevron from '@/public/chevron-right.svg';

export default function Privacy() {
  const privacyPolicyContent = `
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
      <div><div align="center" class="MsoNormal" style="text-align:center;line-height:115%;"><a name="_2cipo4yr3w5d"></a><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><strong><span style="font-size: 26px;"><span data-custom-class="title"><h1>RETURN POLICY</h1></span></span></strong></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><br></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><span style="font-size: 15px;"><span style="color: rgb(89, 89, 89);"><strong><span data-custom-class="subtitle">Last updated <bdt class="question">November 20, 2025</bdt></span></strong></span></span></div><div align="center" class="MsoNormal" style="text-align: left; line-height: 150%;"><span style="font-size: 15px;"><br><a name="_2cipo4yr3w5d"></a></span></div></div><div class="MsoNormal" data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);"><bdt class="block-component"></bdt></span></div><div data-custom-class="heading_1"><strong><span style="font-size: 19px;"><h2>REFUNDS</h2></span></strong></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;">All sales are final and no refund will be issued.<bdt class="block-component"></bdt></span></div><div style="line-height: 1.5;"><br></div><div data-custom-class="heading_1" style="line-height: 1.5;"><span style="font-size: 19px; color: rgb(0, 0, 0);"><strong><h2>QUESTIONS</h2></strong></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);">If you have any questions concerning our return policy, please contact us at:</span></div><div data-custom-class="body_text" style="line-height: 1.1;"><br></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><bdt class="block-component"></bdt></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px;"><bdt class="question"><span style="color: rgb(89, 89, 89);">(646) 500-8693</span></bdt><span style="color: rgb(89, 89, 89);"><bdt class="statement-end-if-in-editor"></bdt></span></span></div><div data-custom-class="body_text" style="line-height: 1.5;"><span style="font-size: 15px; color: rgb(89, 89, 89);"><bdt class="question"><a target="_blank" data-custom-class="link" href="mailto:help@thecherami.com">help@thecherami.com</a></bdt></span></div><style>
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
          Return Policy
        </p>
      </nav>
      <div>
        <div dangerouslySetInnerHTML={{ __html: privacyPolicyContent }} />
      </div>
    </div>
  );
}
