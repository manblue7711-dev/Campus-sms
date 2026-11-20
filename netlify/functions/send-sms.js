exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { recipients, message } = JSON.parse(event.body);

    const response = await fetch("https://arkesel.com", {
      method: "POST",
      headers: {
        "api-key": process.env.ARKESEL_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender: "Arkesel", // Default approved sender ID for immediate demo
        message: message,
        recipients: recipients
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: result.message || "SMS API rejected request" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
