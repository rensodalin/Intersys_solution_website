export interface SubsystemItem {
  name: string;
  desc: string;
}

export interface ProtocolRow {
  subsystem: string;
  protocol: string;
  impact: string;
}

export interface MethodologyItem {
  number: string;
  title: string;
  desc: string;
}

export interface BlogItem {
  _id?: string;
  title: string;
  slug: string;
  subtitle?: string;
  category: string;
  readTime?: string;
  date?: string;
  commentsCount?: number;
  featured?: boolean;
  image: string;
  summary?: string;
  author?: {
    name: string;
    role: string;
    avatar: string;
  };

  // Section 1
  section1Title?: string;
  section1Content1?: string;
  section1Content2?: string;
  quote?: string;
  sideImage1?: string;
  sideImage1Caption?: string;
  sideImage2?: string;
  sideImage2Caption?: string;

  // Section 2
  section2Title?: string;
  section2Intro?: string;
  subsystems?: SubsystemItem[];
  protocolTable?: ProtocolRow[];

  // Section 3
  section3Title?: string;
  section3Intro?: string;
  methodologies?: MethodologyItem[];
  section3Image?: string;
  section3ImageCaption?: string;

  // Section 4
  section4Title?: string;
  section4Content1?: string;
  section4Content2?: string;
  section4Image?: string;
  section4ImageCaption?: string;

  createdAt?: string;
  updatedAt?: string;
}
