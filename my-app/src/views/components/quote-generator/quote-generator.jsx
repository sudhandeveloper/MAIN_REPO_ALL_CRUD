import React, { useState } from "react";
import axios from "axios";

const QuoteGenerator = () => {
  let data ='old is gold'
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);

  const apiKey = "xlU+oohCk0OLME2hlztYXg==1A0ZS03U5izXyFov"; // Replace with your actual API key
  const apiURL = "https://api.api-ninjas.com/v1/quotes?category=happiness";

  const options = {
    headers: {
      "X-Api-Key": apiKey,
    },
  };

  const getQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiURL, options);
      const data = response.data[0].quote; // Assuming quote is in the 'quote' property
      setQuote(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setLoading(false);
    }
  };

  return (
    <div className="quote">
      <div id="joke">
        {loading
          ? "Updating..."
          : quote || "Click 'Tell me a quote' to get a quote"}
      </div>
      <button id="btn" className="btn" onClick={getQuote} disabled={loading}>
        {loading ? "Loading..." : "Tell me a quote"}
      </button>
    </div>
  );
};

export default QuoteGenerator;