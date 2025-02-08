import React, { useState, useEffect } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import type { InsertItem, SearchParams } from './types';

function App() {
  const [items, setItems] = useState<InsertItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: 'küche zu verschenken',
    location: '12687',
    radius: 10,
    minPrice: 0,
    pageCount: 5
  });

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        query: searchParams.query,
        location: searchParams.location,
        radius: searchParams.radius.toString(),
        min_price: searchParams.minPrice.toString(),
        page_count: searchParams.pageCount.toString()
      });

      const response = await fetch(`/inserate?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Unable to connect to the API server. Please make sure the API is running and try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchParams.query}
            onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
            placeholder="Search query"
            className="flex-1 px-2 py-1 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-4">
          <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
        </div>
      ) : (
        <pre className="bg-white p-4 rounded shadow overflow-auto">
          {JSON.stringify(items, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;