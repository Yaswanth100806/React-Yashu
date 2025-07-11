import React from 'react';
import CategoryCard from './CategoryCard';
import './CategorySection.css';

const categoriesData = [
    { name: "Beef", image: "https://www.themealdb.com/images/category/beef.png" },
    { name: "Chicken", image: "https://www.themealdb.com/images/category/chicken.png" },
    { name: "Dessert", image: "https://www.themealdb.com/images/category/dessert.png" },
    { name: "Lamb", image: "https://www.themealdb.com/images/category/lamb.png" },
    { name: "Miscellaneous", image: "https://www.themealdb.com/images/category/miscellaneous.png" },
    { name: "Pasta", image: "https://www.themealdb.com/images/category/pasta.png" },
    { name: "Pork", image: "https://www.themealdb.com/images/category/pork.png" },
    { name: "Seafood", image: "https://www.themealdb.com/images/category/seafood.png" },
    { name: "Side", image: "https://www.themealdb.com/images/category/side.png" },
    { name: "Starter", image: "https://www.themealdb.com/images/category/starter.png" },
    { name: "Vegan", image: "https://www.themealdb.com/images/category/vegan.png" },
    { name: "Vegetarian", image: "https://www.themealdb.com/images/category/vegetarian.png" },
    { name: "Breakfast", image: "https://www.themealdb.com/images/category/breakfast.png" },
    { name: "Goat", image: "https://www.themealdb.com/images/category/goat.png" },
];

function CategoriesSection({ onCategorySelect }) {
    return (
        <section className="categories-section">
            <h2>CATEGORIES</h2>
            <div className="category-grid">
                {categoriesData.map((cat) => (
                    <CategoryCard
                        key={cat.name}
                        category={cat.name}
                        imageUrl={cat.image}
                        onSelect={onCategorySelect}
                    />
                ))}
            </div>
        </section>
    );
}

export default CategoriesSection;