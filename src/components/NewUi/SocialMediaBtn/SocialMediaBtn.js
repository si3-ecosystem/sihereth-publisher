const SocialMediaBtn = ({ socialMedia }) => {
  return (
    <div className="bg-[#C8BAFD] rounded-[12px] py-3 px-4 w-fit ">
      <span className="font-fira-mono text-base font-medium leading-6 text-[#1E1E1E]">
        {socialMedia}
      </span>
    </div>
  );
};

export default SocialMediaBtn;