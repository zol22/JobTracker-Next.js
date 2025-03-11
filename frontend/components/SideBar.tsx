import React from 'react'
import { SidebarProps } from '@/types'


const SideBar = ( {setSelectedTab, selectedTab}: SidebarProps) => {
    const menuItems = [
        { id: "AllJobs", label: "All Jobs"},
        { id: "AddJob", label: "Add Job" },
        { id: "Stats", label: "Stats" },
        { id: "Affirmation", label: "Affirmation" },
        { id: "Reminders", label: "Reminders" },
    ]
  return (
    <div className="p-6 flex justify-center items-start">
    {/* <h2 className="text-xl font-bold mb-4">Dashboard</h2> */}
    <ul>
      {menuItems.map((item) => (
        <li
          key={item.id}
          className={`cursor-pointer p-2 rounded-md ${
            selectedTab === item.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
          onClick={() => setSelectedTab(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>  
  )
}

export default SideBar