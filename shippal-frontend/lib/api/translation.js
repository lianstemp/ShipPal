
export const translationApi = {
    translate: async (text, targetLang) => {
        try {
            // MyMemory API: https://api.mymemory.translated.net/get?q=Hello World&langpair=en|it
            // Use 'autodetect' as source language
            const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=autodetect|${targetLang}`);

            const data = await res.json();
            console.log("Translation API response:", data);

            if (data.responseStatus === 200) {
                console.log("Translation success:", data.responseData.translatedText);
                return data.responseData.translatedText;
            } else {
                console.warn("Translation API warning:", data.responseDetails);
                return text; // Return original on error/warning
            }
        } catch (error) {
            console.error("Translation error:", error);
            return text; // Fallback to original
        }
    }
}
