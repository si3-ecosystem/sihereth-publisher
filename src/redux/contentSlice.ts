import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentState } from "@/utils/types";

const initialState: ContentState = {
  landing: {
    fullName: "Kara Howard",
    title: "SI<3> Founder",
    headline: "& I create equitable platforms for the new economy.",
    hashTags: ["collaboration", "equity", "impact", "decentralization", "education"],
    region: "North America",
    organizationAffiliations: ["Si<3>"],
    communityAffiliations: ["OnChair Dreamers", "Cosmos Cartel", "The Phoenix Guild"],
    superPowers: ["Empathy", "Focus", "Leaps of Faith"],
    image: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345809/girl_hhqylb.png",
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
      "My career began as an Equity Research analyst on Wall St. I started the MBA program at NYU in the Fall of 2008, right as the market crashed, with Occupy Wall St. protests happening outside our campus doors. As often happens, times of crises create opportunity and I shifted my career focus from finance to marketing & entrepreneurship.",
    values:
      " I experienced shared value when I SI women & non-binary creators grow. My value lies in my ability to understand collaboration models at an ecosystemic level, and focus my energy towards my intentions."
  },
  live: {
    image: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345811/live_muepdq.png",
    url: "https://res.cloudinary.com/dq033xs8n/video/upload/v1744345277/vid_cy6pec.mp4",
    walletUrl: "https://pb.aurpay.net/pb/page/html/paymentbutton.html?token=pb_plugin_link_token_h6hzBGgZzFW1G5eO",
    details: [
      {
        title: "website",
        heading: "SI<3> and the Si Her Co-Active"
      },
      {
        title: "youtube",
        heading: "Unlocking NFT's For Meta Impact"
      },
      {
        title: "podcast",
        heading: "Diversity in the New Economy"
      }
    ]
  },
  organizations: [
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345807/base_ad5an0.png",
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345807/solana_lbprwc.png",
    "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345810/lukso_ytxf1e.png"
  ],
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
  available: {
    avatar: "https://res.cloudinary.com/dq033xs8n/image/upload/v1744345808/avatar_zmxvul.png",
    availableFor: ["collaboration", "advising", "speaking"],
    ctaText: "Join SI<3>",
    ctaUrl: "https://www.si3.space"
  },
  socialChannels: [
    {
      icon: "https://res.cloudinary.com/dq033xs8n/image/upload/v1746343758/LinkedIn_w2mz9f.svg",
      url: "https://www.linkedin.com"
    },
    {
      icon: "https://res.cloudinary.com/dq033xs8n/image/upload/v1746343757/Instagram_lyhjoi.svg",
      url: "https://www.instagram.com"
    },
    {
      icon: "https://res.cloudinary.com/dq033xs8n/image/upload/v1746344739/Twitter_geucw3.svg",
      url: "https://twitter.com"
    }
  ],
  isNewWebpage: true
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setAllContent: (state, action: PayloadAction<ContentState>) => {
      return action.payload;
    },
    updateContent: (state, action: PayloadAction<{ section: keyof ContentState; data: any }>) => {
      const { section, data } = action.payload;
      if (section === "isNewWebpage" && typeof data === "boolean") {
        state.isNewWebpage = data;
        return;
      }
      if (!state[section]) {
        console.error(`Invalid section: ${section}`);
        return;
      }
      if (Array.isArray(state[section])) {
        state[section] = data;
        return;
      }
      if (typeof state[section] === "object" && data !== null && typeof data === "object") {
        Object.keys(data).forEach((key) => {
          (state[section] as any)[key] = data[key];
        });
        return;
      }
    },
    updateArrayItem: (
      state,
      action: PayloadAction<{
        section: keyof ContentState;
        fieldName: string;
        index: number;
        value: any;
      }>
    ) => {
      const { section, fieldName, index, value } = action.payload;
      if (!state[section] || typeof state[section] !== "object") {
        console.error(`Invalid section: ${section}`);
        return;
      }
      const field = (state[section] as any)[fieldName];
      if (!Array.isArray(field)) {
        console.error(`Field ${fieldName} is not an array in section ${section}`);
        return;
      }
      if (index < 0 || index >= field.length) {
        console.error(`Invalid index ${index} for array with length ${field.length}`);
        return;
      }
      field[index] = value;
    },
    addArrayItem: (
      state,
      action: PayloadAction<{
        section: keyof ContentState;
        fieldName: string;
        value: any;
      }>
    ) => {
      const { section, fieldName, value } = action.payload;
      if (!state[section] || typeof state[section] !== "object") {
        console.error(`Invalid section: ${section}`);
        return;
      }
      const field = (state[section] as any)[fieldName];
      if (!Array.isArray(field)) {
        console.error(`Field ${fieldName} is not an array in section ${section}`);
        return;
      }
      field.push(value);
    },
    removeArrayItem: (
      state,
      action: PayloadAction<{
        section: keyof ContentState;
        fieldName: string;
        index: number;
      }>
    ) => {
      const { section, fieldName, index } = action.payload;
      if (!state[section] || typeof state[section] !== "object") {
        console.error(`Invalid section: ${section}`);
        return;
      }
      const field = (state[section] as any)[fieldName];
      if (!Array.isArray(field)) {
        console.error(`Field ${fieldName} is not an array in section ${section}`);
        return;
      }
      if (index < 0 || index >= field.length) {
        console.error(`Invalid index ${index} for array with length ${field.length}`);
        return;
      }
      field.splice(index, 1);
    },
    clearContent: () => initialState
  }
});

export const { setAllContent, updateContent, updateArrayItem, addArrayItem, removeArrayItem, clearContent } =
  contentSlice.actions;

export default contentSlice.reducer;
