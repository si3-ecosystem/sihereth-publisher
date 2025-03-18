import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentState } from "@/utils/types";
import base from "@/assets/images/base.png";
import solana from "@/assets/images/solana.png";
import lukso from "@/assets/images/lukso.png";
import liveImg1 from "@/assets/images/liveImg1.png";

const initialState: ContentState = {
  navbar: {
    websiteName: "",
    links: []
  },
  landing: {
    title: "Kara",
    headline: "& I create equitable platforms for the new economy.",
    hashTags: ["collaboration", "equity", "impact", "decentralization", "education"],
    region: "Latin America",
    organizationAffiliations: ["Si<3>"],
    communityAffiliations: ["OnChair Dreamers", "Cosmos Cartel", "The Phoenix Guild"],
    superPowers: ["Empathy", "Focus", "Leaps of Faith"],
    image: "@/assets/images/girl.png",
    name: "Kara Howard",
    pronoun: "SHE/HER"
  },
  slider: [
    "INCLUSIVE PLATFORMS",
    "decentralizing currencies & technologies",
    "ECOSYSTEM GROWTH",
    "COLLABORATE WITH WEB3"
  ],
  value: {
    experience:
      "My career began as an Equity Research analyst on Wall St. I started the MBA program at NYU in the Fall of 2008, right as the market crashed, with Occupy Wall St. protests happening outside our campus doors. As often happens, times of crises create opportunity and I shifted my career focus from finance to marketing & entrepreneurship. I began my entrepreneurial journey with ups and downs and great learning - most importantly, discovering my passion and purpose in supporting women in elevating their voices and professional and personal success.",
    values:
      " I experienced shared value when I SI women & non-binary creators grow. My value lies in my ability to understand collaboration models at an ecosystemic level, and focus my energy towards my intentions."
  },
  live: {
    image: liveImg1,
    video: "/videos/vid.mp4",
    details: [
      {
        title: "website",
        heading: "SI<3> and the Si Her Co-Active",
        body: "A community focused on building the next era of Web3."
      },
      {
        title: "youtube",
        heading: "Unlocking NFT's For Meta Impact",
        body: "My participation at NFT NYC in 2023."
      },
      {
        title: "podcast",
        heading: "Diversity in the New Economy",
        body: "My participation in W3B Talks where I talk about diversity."
      }
    ]
  },
  organizations: [base, solana, lukso],
  timeline: [
    {
      title: "Co-Creating SI<3>",
      to: "",
      from: "PRESENT"
    },
    {
      title: "Personal Development Retreat",
      to: "",
      from: "2022"
    },
    {
      title: "Managed the Feminine Intelligence",
      to: "2021",
      from: "2017"
    },
    {
      title: "VP of Growth & Partnerships at Clevertap",
      to: "2019",
      from: "2015"
    },
    {
      title: "MBA from NYU Stern & Marketing Entrepreneurship",
      to: "",
      from: "2025"
    },
    {
      title: "BSC from UW Madison - Personal Finance",
      to: "",
      from: "2004"
    },
    {
      title: "Equity Research Associate / Financial Analyst",
      to: "2010",
      from: "2002"
    }
  ],
  available: ["collaboration", "advising", "speaking"],
  socialChannels: [
    {
      text: "linkedin",
      url: ""
    },
    {
      text: "instagram",
      url: ""
    },
    {
      text: "twitter",
      url: ""
    }
  ],
  isNewWebpage: true
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<{ section: keyof ContentState; data: any }>) => {
      const { section, data } = action.payload;
      if (section === "isNewWebpage" && typeof data === "boolean") {
        state.isNewWebpage = data;
      } else if (Array.isArray(state[section])) {
        state[section] = data;
      } else if (state[section] && typeof state[section] === "object") {
        state[section] = {
          ...state[section],
          ...data
        };
      } else {
        console.error(`Invalid section or data type: ${section}`);
      }
    }
  }
});

export const { updateContent } = contentSlice.actions;
export default contentSlice.reducer;
