import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ContentState } from "@/utils/types";

const initialState: ContentState = {
  landing: {
    fullName: "Kara Howard",
    title: "SI<3> Founder",
    headline: "& I create equitable platforms for the new economy.",
    hashTags: ["collaboration", "inclusivity", "impact", "transparency", "acessibility"],
    region: "North America",
    organizationAffiliations: ["Si<3>"],
    communityAffiliations: ["Si Her", "BitQueens"],
    superPowers: ["Empathy", "Focus", "Leaps of Faith"],
    image: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386821/girl_ainxhw.png",
    pronoun: "SHE/HER"
  },
  slider: ["focussed pathways", "economic freedom", "human potential", "collaborative growth"],
  value: {
    experience:
      "My professional experience includes twelve years of womxn-in-tech community leadership and fifteen years in growth and partnerships in emerging technology. I am a strong ecosystem builder and connecter, and enjoy creating collaborative value with community networks and product integrations. I am values-driven in my personal and professional lives, and maintain a solid connection to my inner guidance system as I navigate the complexities of creating value in the new economy.",
    values:
      "My vision is for humanity to reach its greatest potential. This includes equitable and accessible financial systems created with care, emotional intelligence, and compassion. I envision an acceleration of feminine intelligence and underrepresented voices reaching new heights of leadership. I believe we will experience in our lifetimes profound growth in our abilities and capacities as humans, and I am hopeful for the end of centralized power structures that limit that potential."
  },
  live: {
    image: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363967/livemedia_turqfv.png",
    url: "https://res.cloudinary.com/dv52zu7pu/video/upload/v1751386825/vid_vxw5em.mp4",
    walletUrl: "https://pb.aurpay.net/pb/page/html/paymentbutton.html?token=pb_plugin_link_token_h6hzBGgZzFW1G5eO",
    details: [
      {
        title: "SI<3>",
        heading: "SI<3>'s Mission",
        url: "https://www.si3.space"
      },
      {
        title: "Wirex Podcast",
        heading: "How True is Web3's Commitment to Diversity and Inclusion",
        url: "https://www.youtube.com"
      },
      {
        title: "EcstaSHE LinkedIn Live",
        heading: "Fundraising in Web3: Summer Edition",
        url: "https://www.podcast.com"
      }
    ]
  },
  organizations: [
    "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363966/unlock_nrtdlk.png",
    "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363966/dune_n4xvii.png",
    "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363967/zerion_sjjw6q.png",
    "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363966/stellar_luopdr.png",
    "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363966/ledger_umjp3a.png"
  ],
  timeline: [
    {
      title: "Co-Creating SI<3>",
      to: "PRESENT",
      from: "2023"
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
    avatar: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1752363968/available_nzy4gl.png",
    availableFor: ["collaboration", "advising", "speaking"],
    ctaText: "Join SI<3>",
    ctaUrl: "https://www.si3.space"
  },
  socialChannels: [
    {
      icon: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386798/LinkedIn_mrnvct.svg",
      url: "https://www.linkedin.com"
    },
    {
      icon: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386821/Instagram_qpdoa3.svg",
      url: "https://www.instagram.com"
    },
    {
      icon: "https://res.cloudinary.com/dv52zu7pu/image/upload/v1751386803/Twitter_btmxyb.svg",
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
    clearContent: () => initialState,
    setIsNewWebpage: (state, action: PayloadAction<boolean>) => {
      state.isNewWebpage = action.payload;
    }
  }
});

export const {
  setAllContent,
  updateContent,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
  clearContent,
  setIsNewWebpage
} = contentSlice.actions;

export default contentSlice.reducer;
