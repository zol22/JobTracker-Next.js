// types.ts
export interface Job {
    id: number;
    title: string;
    company: string;
    description: string;
    status: string;
    comments: string[];
    history: { status: string; date: string }[];
  }
  
  export type SidebarProps = {
    setSelectedTab: (tab:string) => void,
    selectedTab : string
  }