const transformText = (text) => {
  const newText = text.split('_').join(' ');
  const string = newText.toLowerCase();
  console.log(string);
  const str = string.charAt(0).toUpperCase() + string.slice(1);
  return str;
}

export default transformText;