interface InformationProps {
  property: string;
  value: string | string[];
}

const Info = ({ property, value }: InformationProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="sm:w-1/2">
        <span
          className="font-fira-mono text-base font-medium leading-[21px] tracking-wide text-[#3E21F3]"
          style={{ whiteSpace: "nowrap" }}
        >
          {property}
        </span>
      </div>
      <div
        className="font-fira-mono text-base font-medium leading-[21px] tracking-wide text-[#1E1E1E] flex items-center sm:w-1/2 overflow-x-hidden w-full"
        style={{ whiteSpace: "nowrap" }}
      >
        {Array.isArray(value)
          ? property === "Community Affiliations:"
            ? value.map((item, index) => (
                <div key={index}>
                  <div className="left-right cursor-pointer hover:text-[#3E21F3] ">
                    <div className="flex w-[190px] justify-center">
                      <span className="mx-1" style={{ whiteSpace: "nowrap" }}>
                        {item}
                      </span>
                      {index >= 0 && <div className="h-[4px] w-[9px] bg-[#3E21F3] rotate-45 my-2"></div>}
                    </div>
                  </div>
                </div>
              ))
            : value.map((item, index) => (
                <div key={index}>
                  <div className="left-right cursor-pointer hover:text-[#3E21F3] ">
                    <div className={`flex justify-center ${index > 1 ? "w-[150px] " : "w-[120px]"}`}>
                      <span className="mx-1" style={{ whiteSpace: "nowrap" }}>
                        {item}
                      </span>
                      {index >= 0 && <div className="h-[4px] w-[9px] bg-[#3E21F3] rotate-45 my-2"></div>}
                    </div>
                  </div>
                </div>
              ))
          : value}
      </div>
    </div>
  );
};

export default Info;
