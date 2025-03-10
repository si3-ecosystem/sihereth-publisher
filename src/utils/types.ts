import { StaticImageData } from "next/image";

export interface LinkTypes {
  type: string;
  title: string;
  link: string;
}

export interface VideoTypes {
  path: string;
  id: number | null;
}

export interface NavbarTypes {
  websiteName: string;
  links: LinkTypes[];
}

export interface LandingTypes {
  title: string;
  headline: string;
  brandPilars: string;
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
  title: string;
  heading: string;
  body: string;
}

export interface TimelineTypes {
  title: string;
  to: string;
  from: string;
}

export interface AvailableTypes {
  title: string;
  marque: string[];
  socialChannels: {
    text: string;
    url: string;
  }[];
}

export interface ContentState {
  navbar: NavbarTypes;
  landing: LandingTypes;
  value: ValueTypes;
  live: LiveTypes[];
  organizations: string[] | StaticImageData[];
  timeline: TimelineTypes[];
  available: AvailableTypes;
  isNewWebpage: boolean;
  slider: string[];
}
