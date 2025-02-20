import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  websiteData: {
    navbar: {
      websiteName: "",
      links: [],
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
        communityAffiliations: [],
      },
      userimg: {
        path: "",
        id: null,
      },
      name: "",
      pronoun: "",
    },
    value: {
      title: "",
      description: "",
      TVName: "",
      video: {
        path: "",
        id: null,
      },
      links: [
        {
          type: "",
          title: "",
          link: "",
        },
      ],
      button: {
        text: "",
        link: "",
      },
    },
    vision: {
      title: "",
      description: "",
    },
    CV: {
      present: {
        title: "",
        highlights: [],
      },
      past: {
        title: "Past",
        highlights: [
          {
            year: "2002-10",
            text: "EQUITY RESEARCH ASSOCIATE / FINANCIAL ANALYST",
          },
        ],
      },
      future: {
        title: "",
        text: "",
      },
    },
    available: {
      title: "",
      marque: [],
      socialChannels: [
        {
          text: "linkedin",
          url: "www.linkedin.com",
        },
      ],
    },
  },
  isNewWebpage: true,
};

const contentReducer = createSlice({
  name: "content",
  initialState,
  reducers: {
    handleWebsiteData: (state, action) => {
      state.websiteData = action.payload;
    },
    handleNewWebpage: (state, action) => {
      state.isNewWebpage = action.payload;
    },
    editWebsiteData: (state, action) => {
      const { section, data } = action.payload;
      state.websiteData[section] = {
        ...state.websiteData[section],
        ...data,
      };
    },
    resetWebsiteData: (state) => {
      state.websiteData = initialState.websiteData;
    },
    addToArray: (state, action) => {
      const { section, item } = action.payload;
      state.websiteData[section].push(item);
    },
    removeFromArray: (state, action) => {
      const { section, index } = action.payload;
      state.websiteData[section].splice(index, 1);
    },
  },
});

export const {
  handleWebsiteData,
  handleNewWebpage,
  editWebsiteData,
  resetWebsiteData,
  addToArray,
  removeFromArray,
} = contentReducer.actions;

export default contentReducer.reducer;
