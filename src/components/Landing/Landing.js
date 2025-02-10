import "./landing.css";
import { useSelector } from "react-redux";
function Landing({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content);

  return (
    <div
      id="landing_container"
      className="border hover:border-gray-400"
      onClick={() => setIsOpen("landing")}
    >
      <div className="landing_innerContainer">
        <div className="landing_info">
          <h1 className="landing_heading">
            {websiteData?.landing?.title}
            <br />
            {websiteData?.landing?.subTitle}
          </h1>
          <div className="stand_box">
            <span className="border"></span>
            <p className="standbox_title">{websiteData?.landing?.hashTagTitle}</p>
            <div className="tags">
              {websiteData?.landing?.hashTags?.length &&
                websiteData?.landing?.hashTags?.map((hash) => <p>#{hash}</p>)}
            </div>
          </div>
          <div className="animation_region animation_region_pc">
            {websiteData?.landing?.categories?.map((value, index) => {
              return (
                <div className="anim" key={index}>
                  <div className="inner_anim">
                    <p className="top_hide">{value.title}</p>
                    <p className="special_hide">{value.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="animation_region animation_region_mobile">
            {websiteData?.landing?.categories.map((value, index) => (
              <div key={index} className="anim">
                <div className="inner_anim">
                  <p className="top_hide">
                    {value.title}{" "}
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="arrow-right-02">
                          <path
                            id="Vector"
                            d="M20 12L3 12"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            id="Vector_2"
                            d="M15 17C15 17 20 13.3176 20 12C20 10.6824 15 7 15 7"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                  </p>
                  <p className="special_hide">
                    <span>{value.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="landing_img">
          {websiteData?.landing?.userimg?.path &&
            (typeof websiteData?.landing?.userimg?.path === "object" ? (
              <img src={URL.createObjectURL(websiteData?.landing?.userimg?.path)} alt="" />
            ) : (
              <img src={websiteData?.landing?.userimg?.path} alt="" />
            ))}

          {/* <img src={websiteData?.landing?.userimg} /> */}
          <div className={`img_name ${websiteData?.landing?.name}`}>
            <p>{websiteData?.landing?.name}</p>
            <small>({websiteData?.landing?.pronoun})</small>
          </div>
        </div>
      </div>

      <div className="marquee_outer_wrapper">
        <div className="marquee">
          <div className="track">
            <div className="content">
              {websiteData?.landing?.marquee?.map((item, index) => {
                return (
                  <>
                    <h1 key={index}>{item} </h1>
                    <h1>~</h1>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
