import React from 'react';
import './MealResults.css';

function MealResults({ title, results, loading, error, onViewDetails }) {
    if (loading) {
        return (
            <section className="meal-results-section">
                <h2 className="section-title">{title}</h2>
                <p className="loading-message">Loading meals...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="meal-results-section">
                <h2 className="section-title">{title}</h2>
                <p className="error-message">{error}</p>
            </section>
        );
    }

    if (!results || results.length === 0) {
        return (
            <section className="meal-results-section">
                <h2 className="section-title">{title}</h2>
                <p className="no-results-message">No meals found for this query/category. Please try somthing else!</p>
            </section>
        );
    }

    return (
        <section className="meal-results-section">
            <h2 className="section-title">{title}</h2>
            <div className="meals-grid">
                {results.map((meal) => (
                    <div className="meal-card" key={meal.idMeal} onClick={() => onViewDetails(meal.idMeal)}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <div className="meal-info">
                            <h3>{meal.strMeal}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default MealResults;