// src/constants/benefits.ts

import {
    FiTarget,
    FiList,
    FiClock,
    FiBarChart2,
    FiBriefcase,
    FiCheckCircle,
    FiHeart,
    FiMessageSquare,
    FiUserCheck,
  } from "react-icons/fi";
  
  import { IBenefit } from "@/types";
  
  export const benefits: IBenefit[] = [
    {
      title: "Stay Organized While You Job Hunt",
      description:
        "Keep track of every opportunity, from application to offer. Our intuitive job tracking system helps you stay focused and in control of your career search.",
      bullets: [
        {
          title: "All Your Applications in One Place",
          description: "Track job title, company, status, comments, and more.",
          icon: <FiList size={26} />,
        },
        {
          title: "Real-Time Status Updates",
          description: "Update job status instantly with optimistic UI.",
          icon: <FiCheckCircle size={26} />,
        },
        {
          title: "Custom Comments & Reminders",
          description: "Leave notes and set personal reminders to follow up.",
          icon: <FiMessageSquare size={26} />,
        },
      ],
      imageSrc: "/images/mockup-1.webp",
    },
    {
      title: "Boost Productivity & Motivation",
      description:
        "Job hunting is tough—we get it. That’s why we built in tools to keep your mind sharp and your goals in sight.",
      bullets: [
        {
          title: "Daily Affirmations",
          description: "Stay positive with personalized motivation every day.",
          icon: <FiHeart size={26} />,
        },
        {
          title: "Job Search Stats",
          description: "Visualize your progress and stay accountable.",
          icon: <FiBarChart2 size={26} />,
        },
        {
          title: "Streamlined Workflow",
          description: "Manage your tasks with fewer clicks and more clarity.",
          icon: <FiClock size={26} />,
        },
      ],
      imageSrc: "/images/mockup-2.webp",
    },
    {
      title: "Secure & Personalized Experience",
      description:
        "Built with modern technologies to keep your job search private and tailored to you.",
      bullets: [
        {
          title: "User Authentication",
          description: "Login securely with Clerk authentication.",
          icon: <FiUserCheck size={26} />,
        },
        {
          title: "Personalized Dashboard",
          description: "See only your jobs and history—no noise.",
          icon: <FiBriefcase size={26} />,
        },
        {
          title: "Data Persistence",
          description: "Jobs and comments saved in real-time with Prisma + PostgreSQL.",
          icon: <FiTarget size={26} />,
        },
      ],
      imageSrc: "/images/mockup-1.webp",
    },
  ];
  