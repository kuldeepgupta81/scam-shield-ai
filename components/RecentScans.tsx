export default function RecentScans({ scans }: any) {

  return (

    <div>

      <h2 className="mb-4">
        Recent Scans
      </h2>

      {scans.length === 0 && (
        <p className="text-gray-500">
          No recent scans yet
        </p>
      )}

      <div className="space-y-2">

        {scans.map((s: string, i: number) => (

          <div
            key={i}
            className="bg-black border border-slate-800 p-3 rounded"
          >
            {s}
          </div>

        ))}

      </div>

    </div>

  )
}