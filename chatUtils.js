export const askGroq = async (messages) => {
  const apiKey = "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";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: messages,
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: { message: "No error details available" } };
      }
      console.error(`API request failed: Status ${response.status}`, errorData);
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid API response:", data);
      throw new Error("Invalid response from API: No content found.");
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in askGroq:", error.message, error.stack);
    throw error;
  }
};

export const generateChatTitle = async (userMessage) => {
  const apiKey = "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";

  try {
    const prompt = [
      {
        role: "system",
        content:
          "Generate a concise chat title (5-10 words) based on the user's message. Avoid special characters or quotes.",
      },
      { role: "user", content: userMessage },
    ];

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: prompt,
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: { message: "No error details available" } };
      }
      console.error(`Title generation failed: Status ${response.status}`, errorData);
      return "New Chat";
    }

    const data = await response.json();
    if (!data.choices?.[0]?.message?.content) {
      console.error("Invalid title response:", data);
      return "New Chat";
    }

    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error in generateChatTitle:", error.message, error.stack);
    return "New Chat";
  }
};