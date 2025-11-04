export default function youtube(url) {
  if (!url || typeof url !== "string") return "";

  try {
    let videoId = "";

    // Maneja URLs tipo https://www.youtube.com/watch?v=ID
    const standardMatch = url.match(/[?&]v=([^&]+)/);
    if (standardMatch) {
      videoId = standardMatch[1];
    } 
    // Maneja URLs tipo https://youtu.be/ID
    else {
      const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
      if (shortMatch) videoId = shortMatch[1];
    }

    return videoId || "";
  } catch (error) {
    console.error("Error al extraer ID de YouTube:", error.message);
    return "";
  }
}
