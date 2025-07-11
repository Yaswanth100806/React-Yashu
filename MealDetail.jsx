import React, { useState, useEffect } from 'react';
import './MealDetail.css';

function MealDetail({ mealId, onBack }) {
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMealDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (data.meals && data.meals.length > 0) {
                    setMeal(data.meals[0]);
                } else {
                    setMeal(null);
                    setError("Meal details not found.");
                }
            } catch (err) {
                console.error("Error fetching meal details:", err);
                setError("Failed to load meal details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (mealId) {
            fetchMealDetails();
        }
    }, [mealId]);

    if (loading) {
        return (
            <div className="meal-detail-container">
                <p className="loading-message">Loading meal details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="meal-detail-container">
                <p className="error-message">{error}</p>
                <button onClick={onBack} className="back-button">Back to Meals</button>
            </div>
        );
    }

    if (!meal) {
        return (
            <div className="meal-detail-container">
                <p className="no-results-message">No meal found with this ID.</p>
                <button onClick={onBack} className="back-button">Back to Meals</button>
            </div>
        );
    }

    
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
        }
    }


    const instructions = meal.strInstructions ? meal.strInstructions.split('\r\n').filter(Boolean) : [];

    return (
        <div className="meal-detail-container">
            <nav className="meal-detail-breadcrumb">
                <span onClick={onBack} className="back-link">
                    <i className="fas fa-chevron-left"></i> Back to Meals
                </span>
                <span>{meal.strMeal}</span>
            </nav>

            <h2 className="meal-detail-title">Meal Details</h2>

            <div className="meal-content">
                <div className="meal-image-section">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-detail-img" />
                </div>
                <div className="meal-info-section">
                    <h3>{meal.strMeal}</h3>
                    <p className="category">CATEGORY: <span>{meal.strCategory}</span></p>
                    {meal.strArea && <p className="area">AREA: <span>{meal.strArea}</span></p>}
                    {meal.strSource && (
                        <p className="source">Source: <a href={meal.strSource} target="_blank" rel="noopener noreferrer">{meal.strSource}</a></p>
                    )}
                    {meal.strTags && (
                        <p className="tags">Tags:
                            {meal.strTags.split(',').map((tag, index) => (
                                <span key={index} className="tag-item">{tag.trim()}</span>
                            ))}
                        </p>
                    )}
                </div>
            </div>

            <div className="ingredients-section">
                <h4>Ingredients</h4>
                <div className="ingredients-grid">
                    {ingredients.map((item, index) => (
                        <div className="ingredient-item" key={index}>
                            <span className="measure">{item.measure}</span>
                            <span className="ingredient">{item.ingredient}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="instructions-section">
                <h4>Instructions</h4>
                <ol className="instructions-list">
                    {instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>

            {meal.strYoutube && (
                <div className="video-section">
                    <h4>Watch on YouTube</h4>
                    <div className="video-responsive">
                        <iframe
                            src={`https://www.youtube.com/embed/${meal.strYoutube.split('v=')[1]}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Meal Preparation Video"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MealDetail;