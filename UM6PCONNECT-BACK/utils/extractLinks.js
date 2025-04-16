const extractLinks = (text = "") => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };
  
  module.exports = extractLinks;
  