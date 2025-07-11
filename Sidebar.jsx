import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, onClose, categories, onCategoryClick }) {
    const sidebarClass = isOpen ? 'sidebar open' : 'sidebar';

    const handleCategoryItemClick = (categoryName) => {
        onCategoryClick(categoryName);
        onClose(); 
    };

    return (
        <>
            <div className={sidebarClass}>
                <button className="close-btn" onClick={onClose} aria-label="Close sidebar">
                    <i className="fas fa-times"></i>
                </button>
                <div className="sidebar-header">
                    <h3>MEANU</h3>
                </div>
                <ul className="category-list">
                    {categories.map((category) => (
                        <li key={category.idCategory} onClick={() => handleCategoryItemClick(category.strCategory)}>
                            {category.strCategory}
                        </li>
                    ))}
                </ul>
            </div>
            {isOpen && <div className="overlay" onClick={onClose}></div>}
        </>
    );
}

export default Sidebar;