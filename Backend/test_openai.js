import "dotenv/config";

const testOpenAI = async () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Hello, are you working?",
        },
      ],
    }),
  };

  try {
    console.log("Testing OpenAI API...");
    const response = await fetch("https://api.openai.com/v1/chat/completions", options);
    const data = await response.json();
    console.log("Response Status:", response.status);
    console.log("Response Data:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error during API call:", err);
  }
};

testOpenAI();
