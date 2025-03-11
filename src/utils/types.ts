import { StaticImageData } from "next/image";

export interface LinkTypes {
  type: string;
  title: string;
  link: string;
}

export interface NavbarTypes {
  websiteName: string;
  links: LinkTypes[];
}

export interface LandingTypes {
  title: string;
  headline: string;
  hashTags: string[];
  region: string;
  organizationAffiliations: string[];
  communityAffiliations: string[];
  superPowers: string[];
  image: string;
  name: string;
  pronoun: string;
}

export interface ValueTypes {
  experience: string;
  values: string;
}

export interface LiveTypes {
  image: string | StaticImageData;
  video: string;
  details: {
    title: string;
    heading: string;
    body: string;
  }[];
}

export interface TimelineTypes {
  title: string;
  to: string;
  from: string;
}

export interface ContentState {
  navbar: NavbarTypes;
  landing: LandingTypes;
  value: ValueTypes;
  live: LiveTypes;
  organizations: string[] | StaticImageData[];
  timeline: TimelineTypes[];
  available: string[];
  isNewWebpage: boolean;
  slider: string[];
}
