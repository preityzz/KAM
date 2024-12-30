
export const fetchPendingCalls = async () => {
  const response = await fetch('/api/pending-calls', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pending calls');
  }

  return response.json();
}