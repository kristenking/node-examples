const axios = require('axios');

async function fetchData(url) {
  const response = await axios.get(url);
  return response.data;
}

async function main() {
  try {
    const [spaces, users] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/posts'),
      fetchData('https://jsonplaceholder.typicode.com/users'),
    ]);

    const combinedData = spaces.map((space) => ({
      ...space,
      user: users.find((user) => user.id === space.userId),
    }));

    const limit = 10;
    const limitedData = combinedData.slice(0, limit);
    console.log(limitedData);
  } catch (error) {
    console.error(error);
  }
}

main();
