import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
    subheading: string;
    quickLinks: IMenuItem[];
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    subheading: "Stay organized, motivated, and in control of your job search with a sleek, user-friendly tracker built for devs by a dev.",
    quickLinks: [
        {
            text: "Features",
            url: "#features"
        },
        {
            text: "Testimonials",
            url: "#testimonials"
        }
    ],
    email: 'jobsy@gmail.com',
    telephone: '+1 (123) 456-7890',
    socials: {
        // github: 'https://github.com',
        // x: 'https://twitter.com/x',
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        // youtube: 'https://youtube.com',
        linkedin: 'https://www.linkedin.com',
        // threads: 'https://www.threads.net',
        instagram: 'https://www.instagram.com',
    }
}