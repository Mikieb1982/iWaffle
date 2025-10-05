export type Locale = 'en' | 'de';

export const translations = {
  en: {
    // Welcome Screen
    tagline: "Cook up the perfect prompt in a cozy creative playground.",
    chooseRecipe: "1. Choose your Recipe",
    quickBakeTitle: "Quick Bake",
    quickBakeDescription: "Provide your goal, and get a expertly-crafted prompt instantly.",
    guidedRecipeTitle: "Guided Recipe",
    guidedRecipeDescription: "Let our chef ask you a few questions to build a detailed, custom prompt.",
    optimizeFor: "2. Optimize For",
    startCooking: "Start Cooking",

    // Chat Interface
    initialQuestion: "Hello! I'm your Prompt Chef. To start, what's the main goal for the prompt you want to create?",
    waitingForChef: "Waiting for the chef...",
    typeAnswer: "Type your answer...",
    describeGoal: "Describe your prompt goal here...",
    send: "Send",
    voiceNotSupported: "Voice not supported.",
    micError: "Mic error.",
    startListening: "Start listening",
    stopListening: "Stop listening",
    listeningPlaceholder: "Listening... click the mic again to stop.",
    
    // Loader
    loaderWaffling: "Waffling on it...",
    loaderStirring: "Stirring the batter...",
    loaderPreheating: "Preheating the iron...",
    loaderConsulting: "Consulting the recipe...",
    loaderAdding: "Adding creativity...",
    loaderSyrup: "Getting the syrup ready...",

    // Result Card
    recipeReady: "Your Recipe is Ready!",
    cookAnother: "Cook Another",
    initialGoal: "Initial Goal:",
    yourGoal: "Your Goal:",
    promptCookedFor: "Prompt cooked for:",
    yourConversation: "Your Conversation:",
    chefsNotes: "Chef's Notes (Best Practices):",
    yourPrompt: "Your Custom-Cooked Prompt",

    // Action Button
    download: "Download",
    copied: "Copied!",
    copyPrompt: "Copy Prompt",

    // Error Display
    tryAgain: "Try Again",

    // Service Errors
    errorRecipe: "The prompt chef had trouble with this recipe.",
    errorSuggestion1: "Try rephrasing your goal to be more specific.",
    errorSuggestion2: "Ensure your goal is clearly stated.",
    errorConversation: "The prompt chef got confused during the conversation.",
    errorSuggestion3: "Try rephrasing your last answer.",
    errorSuggestion4: "Consider restarting the session.",
    
    // Theme Toggle
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  de: {
    // Welcome Screen
    tagline: "Erstelle den perfekten Prompt in einer gemütlichen, kreativen Umgebung.",
    chooseRecipe: "1. Wähle dein Rezept",
    quickBakeTitle: "Schnelles Backen",
    quickBakeDescription: "Nenne dein Ziel und erhalte sofort einen professionell erstellten Prompt.",
    guidedRecipeTitle: "Geführtes Rezept",
    guidedRecipeDescription: "Lass dir von unserem Chefkoch ein paar Fragen stellen, um einen detaillierten, individuellen Prompt zu erstellen.",
    optimizeFor: "2. Optimieren für",
    startCooking: "Kochen starten",

    // Chat Interface
    initialQuestion: "Hallo! Ich bin dein Prompt-Chefkoch. Womit fangen wir an, was ist das Hauptziel für den Prompt, den du erstellen möchtest?",
    waitingForChef: "Warte auf den Chefkoch...",
    typeAnswer: "Gib deine Antwort ein...",
    describeGoal: "Beschreibe hier dein Prompt-Ziel...",
    send: "Senden",
    voiceNotSupported: "Spracherkennung nicht unterstützt.",
    micError: "Mikrofonfehler.",
    startListening: "Aufnahme starten",
    stopListening: "Aufnahme stoppen",
    listeningPlaceholder: "Höre zu... klicke erneut auf das Mikrofon, um zu stoppen.",

    // Loader
    loaderWaffling: "Waffelt daran herum...",
    loaderStirring: "Rühre den Teig...",
    loaderPreheating: "Heize das Eisen vor...",
    loaderConsulting: "Konsultiere das Rezept...",
    loaderAdding: "Füge Kreativität hinzu...",
    loaderSyrup: "Mache den Sirup bereit...",

    // Result Card
    recipeReady: "Dein Rezept ist fertig!",
    cookAnother: "Noch eins kochen",
    initialGoal: "Ursprüngliches Ziel:",
    yourGoal: "Dein Ziel:",
    promptCookedFor: "Prompt gekocht für:",
    yourConversation: "Deine Unterhaltung:",
    chefsNotes: "Notizen des Chefkochs (Best Practices):",
    yourPrompt: "Dein maßgeschneiderter Prompt",

    // Action Button
    download: "Herunterladen",
    copied: "Kopiert!",
    copyPrompt: "Prompt kopieren",

    // Error Display
    tryAgain: "Erneut versuchen",
    
    // Service Errors
    errorRecipe: "Der Prompt-Chefkoch hatte Probleme mit diesem Rezept.",
    errorSuggestion1: "Versuche, dein Ziel spezifischer zu formulieren.",
    errorSuggestion2: "Stelle sicher, dass dein Ziel klar formuliert ist.",
    errorConversation: "Der Prompt-Chefkoch war während des Gesprächs verwirrt.",
    errorSuggestion3: "Versuche, deine letzte Antwort neu zu formulieren.",
    errorSuggestion4: "Erwäge, die Sitzung neu zu starten.",

    // Theme Toggle
    switchToLight: "Zum hellen Modus wechseln",
    switchToDark: "Zum dunklen Modus wechseln",
  }
};