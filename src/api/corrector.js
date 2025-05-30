// korrect/src/api/corrector.js
export async function correctText(input) {
  const response = await fetch('https://korrect-backend.onrender.com/api/correct', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sentence: input }),
  });
  const data = await response.json();
  return data.corrected;
}
