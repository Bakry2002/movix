import './style.scss'
import { useState } from 'react'
// eslint-disable-next-line react/prop-types
export const SwitchTabs = ({ data, onTabChange }) => {
    const [ selectedTab, setSelectedTab ] = useState(0) // 0 for Day and 1 for Week
    const [ left, setLeft ] = useState(0) // state contains some style properties for the moving background  
    
    const activeTab = (tabName, index) => {
        setLeft(index * 100); // index*100 means move the moving background to the left by 100px 
        setTimeout(() => {
            setSelectedTab(index) // set the selected tab to the index of the tab that was clicked
        }, 300)
        onTabChange(tabName, index) // call the onTabChange function that was passed as a prop from the parent component 
    }

    return (
        <div className='switch-Tabs'>
            <div className="tab-items">
                {
                    // eslint-disable-next-line react/prop-types
                    data.map((tabName, index) => (
                        <span
                            key={index} 
                            className={`tab-item ${selectedTab === index ? 'active' : ''}`}
                            onClick={() => activeTab(tabName, index)}
                        >
                            {tabName}
                        </span>
                    ))}
                    <span className='moving-bg' style={{ left }}/>
            </div>
        </div>
    )
}
