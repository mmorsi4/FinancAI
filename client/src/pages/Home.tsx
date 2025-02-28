import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

const GEMINI_API_KEY = "AIzaSyBPiUWys8Y7V4-Gi4gHr99VyCwFJSy3Dog";
const systemPrompt = `
  Generate a JSON-formatted list of the latest news articles with the following details:
  - Title
  - Description
  - Image URL
  - Category
  - Date
  The news should be diverse, covering various topics such as Science, Technology, Politics, Health, Sports, and Arts.
  Respond only with a valid JSON array.
`;

interface NewsItem {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

const Home: React.FC = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: systemPrompt }] }]
            }),
          }
        );
        const data = await response.json();
        console.log("Raw API Response:", data);

        const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
        console.log("Extracted Text:", textResponse);

        const cleanJson = textResponse.replace(/```json|```/g, "").trim();
        console.log("Cleaned JSON:", cleanJson);

        setNewsItems(
          JSON.parse(cleanJson).map((item: any) => ({
            title: item.Title,
            description: item.Description,
            imageUrl: item["Image URL"],
            category: item.Category,
            date: item.Date,
          }))
        );
      } catch (error) {
        console.error("Error fetching news from Gemini:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="relative bg-indigo-800 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          alt="Finance background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Smart Financial Management
          </h1>
          <p className="text-xl text-indigo-100 max-w-xl">
            Take control of your finances with AI-powered insights. Track expenses, manage assets,
            and make informed decisions to achieve your financial goals.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <NewsCard
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            category={item.category}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;