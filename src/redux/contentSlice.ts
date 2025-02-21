import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentState, LandingTypes } from "@/utils/types";

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
    handleLandingData: (state, action: PayloadAction<LandingTypes>) => {
      state.landing = action.payload;
    },
    handleNewWebpage: (state, action: PayloadAction<boolean>) => {
      state.isNewWebpage = action.payload;
    },
    editSectionData: (state, action: PayloadAction<{ section: keyof ContentState; data: any }>) => {
      const { section, data } = action.payload;
      const targetSection = state[section];

      if (typeof targetSection === "object" && targetSection !== null) {
        state[section] = {
          ...targetSection,
          ...data
        };
      } else {
        console.error(`The section ${section} is not an object.`);
      }
    },
    resetSectionData: (state, action: PayloadAction<keyof ContentState>) => {
      const section = action.payload;
      const initialSection = initialState[section];

      if (typeof initialSection === "object" && initialSection !== null) {
        state[section] = initialSection;
      } else {
        console.error(`The section ${section} cannot be reset because it is not an object.`);
      }
    },
    addToArray: (state, action: PayloadAction<{ section: keyof ContentState; item: any }>) => {
      const { section, item } = action.payload;
      const targetSection = state[section];

      if (Array.isArray(targetSection)) {
        targetSection.push(item);
      } else {
        console.error(`The section ${section} is not an array.`);
      }
    },
    removeFromArray: (state, action: PayloadAction<{ section: keyof ContentState; index: number }>) => {
      const { section, index } = action.payload;
      const targetSection = state[section];

      if (Array.isArray(targetSection)) {
        targetSection.splice(index, 1);
      } else {
        console.error(`The section ${section} is not an array.`);
      }
    }
  }
});

export const { handleLandingData, handleNewWebpage, editSectionData, resetSectionData, addToArray, removeFromArray } =
  contentSlice.actions;

export default contentSlice.reducer;
