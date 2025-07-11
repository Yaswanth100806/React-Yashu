import React, { useState } from 'react';
import './Header.css';

function Header({ onToggleSidebar, onSearch, onGoHome }) {
    const [searchText, setSearchText] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim()) {
            onSearch(searchText.trim());
        }
    };

    const handleHomeClick = () => {
        onGoHome();
        setSearchText('');
    };

    return (
        <header className="app-header">
            <div className="logo-container" onClick={handleHomeClick}>
                <i className="fas fa-utensils"></i> {}
                <span>Meal Finder</span>
            </div>
            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search recipes here"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                    <i className="fas fa-search"></i>
                </button>
            </form>
            <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
                <i className="fas fa-bars"></i>
            </button>
        </header>
    );
}

export default Header;