// types.ts
export interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    status: string;
    comments: Comment[];
    createdAt: string;
    userId: string;
  }

  export interface Comment {
    id?: string;
    content: string;
    createdAt?: string;

  }

export interface Affirmation {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
}

export interface Reminder {
    id: string;
    content: string;
    userId: string;
    createdAt: string;
}

  export interface ITestimonial {
    name: string;
    role: string;
    message: string;
    avatar: string;
}

  
  export type SidebarProps = {
    setSelectedTab: (tab:string) => void,
    selectedTab : string
  }

  export type NavBarProps = {
    setSelectedTab: (tab:string) => void,
  };
  
  export interface IMenuItem {
    text: string;
    url: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export interface IBenefit {
  title: string;
  description: string;
  imageSrc: string;
  bullets: IBenefitBullet[]
}

export interface IBenefitBullet {
  title: string;
  description: string;
  icon: React.JSX.Element;
}

