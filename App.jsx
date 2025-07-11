import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CategoryGrid from './components/CategoryGrid';
import MealResults from './components/MealResults';
import MealDetail from './components/MealDetail';
import './App.css';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMealId, setSelectedMealId] = useState(null);
    const [currentView, setCurrentView] = useState('home'); 

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data.categories || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSearch = async (term) => {
        setSearchTerm(term);
        setSelectedMealId(null); 
        setLoading(true);
        setError(null);
        setMeals([]);
        setCurrentView('meals');

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMeals(data.meals || []);
        } catch (err) {
            console.error("Error fetching meals:", err);
            setError("Failed to find meals. Please try a different search term.");
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = async (categoryName) => {
        setSearchTerm('');
        setSelectedMealId(null); 
        setLoading(true);
        setError(null);
        setMeals([]); 
        setCurrentView('meals');

        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMeals(data.meals || []);
        } catch (err) {
            console.error("Error fetching meals by category:", err);
            setError("Failed to load meals for this category. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleViewDetails = (mealId) => {
        setSelectedMealId(mealId);
        setCurrentView('detail');
    };

    const handleBackToMeals = () => {
        setSelectedMealId(null);
        setCurrentView('meals');
    };

    const handleGoHome = () => {
        setSelectedMealId(null);
        setSearchTerm('');
        setMeals([]);
        setCurrentView('home');
    };

    return (
        <div className="app-container">
            <Header onToggleSidebar={toggleSidebar} onSearch={handleSearch} onGoHome={handleGoHome} />
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} categories={categories} onCategoryClick={handleCategoryClick} />

            <main className="main-content">
                {selectedMealId ? (
                    <MealDetail mealId={selectedMealId} onBack={handleBackToMeals} />
                ) : (
                    <>
                        <section className="hero-section">
                            <h1 className="hero-title">What are your favorite cuisines?</h1>
                            <p className="hero-subtitle">PERSONALIZE YOUR EXPERIENCE</p>
                        </section>

                        {currentView === 'home' && (
                            <CategoryGrid
                                categories={categories}
                                loading={loading}
                                error={error}
                                onCategoryClick={handleCategoryClick}
                            />
                        )}

                        {currentView === 'meals' && (
                            <MealResults
                                title={searchTerm ? `Search Results for "${searchTerm}"` : "Meals"}
                                results={meals}
                                loading={loading}
                                error={error}
                                onViewDetails={handleViewDetails}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default App;