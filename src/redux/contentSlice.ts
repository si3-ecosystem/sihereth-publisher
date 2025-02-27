import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentState } from "@/utils/types";

const initialState: ContentState = {
  navbar: {
    websiteName: "",
    links: []
  },
  landing: {
    title: "Kara",
    headline: "& I create equitable platforms for the new economy.",
    brandPilars: "What I stand for",
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
    title: "",
    description: "",
    TVName: "",
    video: {
      path: "",
      id: null
    },
    links: [],
    button: {
      text: "",
      link: ""
    }
  },
  vision: {
    title: "",
    description: ""
  },
  CV: {
    present: {
      title: "",
      highlights: []
    },
    past: {
      title: "Past",
      highlights: [
        {
          year: "2002-10",
          text: "EQUITY RESEARCH ASSOCIATE / FINANCIAL ANALYST"
        }
      ]
    },
    future: {
      title: "",
      text: ""
    }
  },
  available: {
    title: "",
    marque: [],
    socialChannels: [
      {
        text: "linkedin",
        url: "www.linkedin.com"
      }
    ]
  },
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
