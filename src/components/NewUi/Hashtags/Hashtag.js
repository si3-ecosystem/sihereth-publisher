

function Hashtag({hashtag}) {
    return (
      <div className="bg-[#ECE9FD] text-[#1E1E1E] font-fira-mono text-base font-normal leading-[21px] tracking-wide w-fit py-3 px-4 rounded-lg text-center hover:text-[#ECE9FD] hover:bg-[#1E1E1E] transition-all ease-out duration-500">
        #{hashtag}
      </div>
    );
}

export default Hashtag;