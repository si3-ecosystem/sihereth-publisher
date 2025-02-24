import runes from "@/assets/images/runes.png";
import Image from "next/image";
function Value() {
  return (
    <div className="py-16 px-6 bg-white space-y-12 flex flex-col sm:flex-row sm:flex-row-reverse sm:gap-6 sm:pb-8 lg:px-12 lg:pb-10 lg:gap-24 xxl:py-[118px] xxl:px-16 xxl:gap-32">
      <div className="space-y-12 value sm:translate-y-4 lg:w-1/2 xxl:translate-y-0 xxl:space-y-8">
        <div className="bg-[#ECE9FD] py-3 px-4 font-fira-mono text-lg font-medium leading-[30px] tracking-wide uppercase w-fit rounded-[12px] lg:px-6 lg:py-4 lg:text-xl xxl:text-[24px] xxl:leading-9">
          My Value
        </div>
        <div className="font-clash-display text-4xl font-medium leading-[50.4px] text-black w-[303px] sm:text-2xl sm:w-fit sm:leading-16 lg:text-[40px] lg:leading-[55px] xxl:text-[48px] xxl:leading-[57.6px]">
          I experienced shared value when I SI women & non-binary creators grow. My value lies in my ability to
          understand collaboration models at an ecosystemic level, and focus my energy towards my intentions.
        </div>
      </div>

      <div className="space-y-6 sm:space-y-8 sm:w-fit sm:-translate-y-10 lg:w-1/2 xxl:space-y-10 xxl:-translate-y-0">
        <Image src={runes} width={103} height={103} alt="value logo" />

        <p className="font-dm-sans font-normal text-[20px] leading-[30px] text-black w-[342px] sm:text-[18px] sm:leading-[20px] lg:w-full lg:text-[22px] lg:leading-[32px] xxl:text-[24px] xxl:leading-[33.6px]">
          My career began as an Equity Research analyst on Wall St. I started the MBA program at NYU in the Fall of
          2008, right as the market crashed, with Occupy Wall St. protests happening outside our campus doors. As often
          happens, times of crises create opportunity and I shifted my career focus from finance to marketing &
          entrepreneurship. I began my entrepreneurial journey with ups and downs and great learning - most importantly,
          discovering my passion and purpose in supporting women in elevating their voices and professional and personal
          success.
        </p>
      </div>
    </div>
  );
}

export default Value;
