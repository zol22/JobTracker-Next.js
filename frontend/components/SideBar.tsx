import React from 'react'
import { SidebarProps } from '@/types'
import { menuItems } from './menuItems'

// Set the selectedTab  to the corresponding tab when clicking it and it adds a custom className
const SideBar = ( {setSelectedTab, selectedTab}: SidebarProps) => {

  return (
    <div>
      <div className="hidden lg:block p-4 justify-center items-start">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center gap-2 cursor-pointer p-2 rounded-md ${
                selectedTab === item.id ? "bg-indigo-500 text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => {
                setSelectedTab(item.id)
                }
              }
            >
              {React.createElement(item.icon, { size: 18 })} 
              {item.label}
            </li>
          ))}
          
        </ul>
    </div>
  </div>  
  )
}

export default SideBar