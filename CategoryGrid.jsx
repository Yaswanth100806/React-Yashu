import React from 'react';
import './CategoryGrid.css';

function CategoryGrid({ categories, loading, error, onCategoryClick }) {
    if (loading) {
        return (
            <section className="category-grid-section">
                <h2 className="section-title">Categories</h2>
                <p className="loading-message">Loading categories...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="category-grid-section">
                <h2 className="section-title">Categories</h2>
                <p className="error-message">{error}</p>
            </section>
        );
    }

    if (!categories || categories.length === 0) {
        return (
            <section className="category-grid-section">
                <h2 className="section-title">Categories</h2>
                <p className="no-results-message">No categories found.</p>
            </section>
        );
    }

    return (
        <section className="category-grid-section">
            <h2 className="section-title">Categories</h2>
            <div className="categories-grid">
                {categories.map((category) => (
                    <div className="category-card" key={category.idCategory} onClick={() => onCategoryClick(category.strCategory)}>
                        <img src={category.strCategoryThumb} alt={category.strCategory} />
                        <div className="category-info">
                            <h3>{category.strCategory}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryGrid;