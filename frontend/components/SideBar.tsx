import React from 'react'
import { menuItems } from './menuItems'
import { useJobStore } from '@/store/useJobStore';

// Set the selectedTab  to the corresponding tab when clicking it and it adds a custom className
const SideBar = () => {

  const { selectedTab, setSelectedTab} =  useJobStore();

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