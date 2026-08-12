# 📧 Gen-AI Email Reply Generator

A full-stack application that automatically generates professional, tone-adjustable email replies using Google's Gemini AI. Built with Spring Boot on the backend and React on the frontend, with a companion Chrome extension for inline use inside Gmail.

## 🚀 Features

- Paste any email content and generate a context-aware, professional reply in seconds
- Choose a tone (e.g. Professional, Friendly, Casual) before generating
- Clean, responsive UI built with React and Material UI
- Chrome extension for generating replies directly inside Gmail
- Secure configuration — API keys are never hardcoded, loaded via environment variables

## 🛠️ Tech Stack

**Backend**
- Java 17, Spring Boot 3.4.1
- Spring WebFlux (`WebClient`) — reactive HTTP client for calling the Gemini API
- Lombok
- Maven

**Frontend**
- React 18 (Vite)
- Material UI (MUI) v6
- Axios

**AI Integration**
- Google Gemini API (`generateContent` endpoint)

## 🏗️ Architecture

```
React Frontend  →  Spring Boot REST Controller  →  Service Layer  →  Google Gemini API
   (Axios)              (EmailController)        (EmailAssistantService)
```

1. User submits original email content and an optional tone via the React UI
2. Request hits the Spring Boot REST endpoint
3. The service layer builds a prompt and calls the Gemini API via `WebClient`
4. The AI-generated response is parsed (Jackson `ObjectMapper`) and returned to the frontend

## ⚙️ Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

### Backend Setup

```bash
cd emailAssistant

# Set your Gemini API key as an environment variable
export GEMINI_API_KEY=your_api_key_here      # macOS/Linux
$env:GEMINI_API_KEY="your_api_key_here"      # Windows PowerShell

./mvnw spring-boot:run       # macOS/Linux
.\mvnw.cmd spring-boot:run   # Windows
```

The backend runs on `http://localhost:8801`.

### Frontend Setup

```bash
cd email-writer-react
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## 📁 Project Structure

```
├── emailAssistant/          # Spring Boot backend
│   └── src/main/java/com/genAI/service/emailAssistant/
│       ├── EmailController.java
│       ├── EmailAssistantService.java
│       └── EmailRequest.java
├── email-writer-react/      # React frontend
│   └── src/App.jsx
└── email-Assistant-Ext/     # Chrome extension
    ├── manifest.json
    └── content.js
```

## 🔒 Security Notes

The Gemini API key is loaded via an environment variable (`GEMINI_API_KEY`) rather than being hardcoded in `application.properties`, keeping credentials out of version control.

## 📌 Future Improvements

- Move to a fully reactive controller chain (avoid `.block()` on the WebClient call)
- Add unit tests for the service layer
- Support additional tone/style presets
- Deploy backend and frontend to a live environment

## 👤 Author

Adarsh Kumar
