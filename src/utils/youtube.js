export default function youtube(url) {
  try {
    return url.split("v=")[1].split("&")[0];
  } catch {
    return "";
  }
}
