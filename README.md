🚀 Overview

AI Product Advisor helps users discover products tailored to their preferences. Instead of browsing endless catalogs or using rigid keyword searches, users simply type what they want in plain English (e.g., “I need a lightweight laptop with long battery life under ₹60,000”).

The app then:
Filters products locally from a mock dataset of 50+ items.
Sends filtered results to Gemini AI for contextual ranking & explanation.
Returns recommendations with reasoning in a conversational interface.

📂 Key Files
AIProductAdvisor.js → Main component handling chat, AI integration, and product recommendation UI
mockData.js → Contains 50+ product objects with fields: brand, name, price, category, description
App.js → Navigation container + Landing page setup with smooth animations




🔧 Technical Implementation

🧠 AI Integration Strategy
Local Filtering → Quickly finds relevant products from the dataset.
Gemini AI → Contextual ranking + detailed explanation.
Response Formatting → AI provides recommendations with reasoning.

💾 Persistence Layer
Uses AsyncStorage for saving chat sessions.
Automatically loads sessions on mount.
Supports real-time saving and session management (with timestamps & titles).

Local Filtering Engine:
Uses a mock PRODUCT_CATALOG (JavaScript object array).
Applies quick filters (category, budget, keywords) before AI processing.
AI Enhancement Layer (Gemini API)
Refines filtered results with contextual ranking & reasoning.
Generates natural language explanations.

Local Storage Architecture (AsyncStorage):imp
Persists chat history, saved sessions, and favorite products.
Allows users to resume conversations after app restarts.
Ensures smooth experience even when offline (local results cached).