interface Props {
  title: string
  value: string
}

export default function StatsCard({ title, value }: Props) {

  return (
    <div className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-xl p-6 shadow-xl">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-2xl font-bold mt-2">
        {value}
      </h2>

    </div>
  )
}