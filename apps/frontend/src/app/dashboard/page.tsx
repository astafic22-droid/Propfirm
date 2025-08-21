"use client";
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url, {
  headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')||''}` }
}).then(r=>r.json());

export default function DashboardPage() {
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, fetcher);
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Trader Dashboard</h1>
      <pre className="mt-6 rounded bg-gray-50 p-4 text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}

