const { pollStrokes } = require('./start');

exports.handler = async (event, context) => {
  // Call the pollStrokes function and handle any errors
  try {
    await pollStrokes();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Polling complete' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error polling strokes' }),
    };
  }
};
