import axios from 'axios';

export const getWord = async () => {
  const response = await axios.get('https://palabras-aleatorias-public-api.herokuapp.com/random');
  
  return response.data;
}