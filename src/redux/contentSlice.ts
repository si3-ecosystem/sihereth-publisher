import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Link {
  type: string;
  title: string;
  link: string;
}

interface Video {
  path: string;
  id: number | null;
}

interface UserImage {
  path: string;
  id: number | null;
}

interface Navbar {
  websiteName: string;
  links: Link[];
}

interface Landing {
  title: string;
  subTitle: string;
  hashTagTitle: string;
  hashTags: string[];
  categories: {
    region: string;
    superPower: string[];
    organizationAffiliations: string[];
    communityAffiliations: string[];
  };
  userimg: UserImage;
  name: string;
  pronoun: string;
}

interface Value {
  title: string;
  description: string;
  TVName: string;
  video: Video;
  links: Link[];
  button: {
    text: string;
    link: string;
  };
}

interface Vision {
  title: string;
  description: string;
}

interface CV {
  present: {
    title: string;
    highlights: string[];
  };
  past: {
    title: string;
    highlights: {
      year: string;
      text: string;
    }[];
  };
  future: {
    title: string;
    text: string;
  };
}

interface Available {
  title: string;
  marque: string[];
  socialChannels: {
    text: string;
    url: string;
  }[];
}

interface WebsiteData {
  navbar: Navbar;
  landing: Landing;
  value: Value;
  vision: Vision;
  CV: CV;
  available: Available;
}

interface ContentState {
  websiteData: WebsiteData;
  isNewWebpage: boolean;
}

const initialState: ContentState = {
  websiteData: {
    navbar: {
      websiteName: "",
      links: []
    },
    landing: {
      title: "",
      subTitle: "",
      hashTagTitle: "",
      hashTags: [],
      categories: {
        region: "",
        superPower: [],
        organizationAffiliations: [],
        communityAffiliations: []
      },
      userimg: {
        path: "",
        id: null
      },
      name: "",
      pronoun: ""
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
    }
  },
  isNewWebpage: true
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleWebsiteData: (state, action: PayloadAction<WebsiteData>) => {
      state.websiteData = action.payload;
    },
    handleNewWebpage: (state, action: PayloadAction<boolean>) => {
      state.isNewWebpage = action.payload;
    },
    editWebsiteData: (state, action: PayloadAction<{ section: keyof WebsiteData; data: any }>) => {
      const { section, data } = action.payload;
      state.websiteData[section] = {
        ...state.websiteData[section],
        ...data
      };
    },
    resetWebsiteData: (state) => {
      state.websiteData = initialState.websiteData;
    },
    addToArray: (state, action: PayloadAction<{ section: keyof WebsiteData; item: any }>) => {
      const { section, item } = action.payload;
      const targetSection = state.websiteData[section];

      if (Array.isArray(targetSection)) {
        targetSection.push(item);
      } else {
        console.error(`The section ${section} is not an array.`);
      }
    },
    removeFromArray: (state, action: PayloadAction<{ section: keyof WebsiteData; index: number }>) => {
      const { section, index } = action.payload;
      const targetSection = state.websiteData[section];

      if (Array.isArray(targetSection)) {
        targetSection.splice(index, 1);
      } else {
        console.error(`The section ${section} is not an array.`);
      }
    }
  }
});

export const { handleWebsiteData, handleNewWebpage, editWebsiteData, resetWebsiteData, addToArray, removeFromArray } =
  contentSlice.actions;

export default contentSlice.reducer;
