# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1iejmYAtNI3Z4Y38SCf6e17CesFR7Bl5E

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


Waffle: Prompt Chef
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

iWaffle is a creative playground where you can cook up the perfect prompt for your favorite AI. Whether you're a seasoned prompt engineer or just starting, iWaffle provides the tools to craft detailed and effective prompts for both Gemini and ChatGPT.

Features
Simple Mode: Get started quickly by entering a simple goal. iWaffle will instantly generate a detailed, expertly crafted prompt for you.

Interview Mode: For more complex ideas, let iWaffle's "Prompt Chef" guide you. Through a series of clarifying questions, iWaffle will help you build a comprehensive prompt tailored to your needs.

AI Optimization: Choose to optimize your prompt specifically for Gemini or ChatGPT-5, ensuring the best possible results from your chosen model.

Best Practices: Learn as you go! iWaffle provides a summary of the prompt engineering best practices applied to your prompt, helping you understand what makes a prompt effective.

Sleek Interface: Enjoy a user-friendly, responsive interface with both light and dark modes.

Voice Input: Use your voice to interact with iWaffle for a hands-free experience.

Getting Started
Prerequisites
Node.js

A Gemini API key

Installation
Clone the repository:

Bash

git clone https://github.com/mikieb1982/iwaffle.git
Navigate to the project directory:

Bash

cd iwaffle
Install dependencies:

Bash

npm install
Set up your environment variables:
Create a file named .env.local in the root of your project and add your Gemini API key:

GEMINI_API_KEY=your_api_key_here
Run the development server:

Bash

npm run dev
You should now be able to access the app in your browser at http://localhost:3000.

How It Works
iWaffle uses the Google Generative AI to power its prompt generation. The application is built with React and Vite, ensuring a fast and modern development experience.

When you provide a goal, iWaffle sends a request to the Gemini API with a carefully crafted system instruction, asking it to act as a "prompt chef." The AI then returns a detailed prompt and a summary of the best practices used.

In Interview Mode, the AI will ask clarifying questions to gather more information before generating the final prompt. This allows for a more interactive and detailed prompt-building experience.
