interface Props {
  result: string
  confidence: number
  reason: string
}

export default function ResultCard({ result, confidence, reason }: Props) {

  return (

    <div>

      <h2 className="mb-3">
        Scan Result
      </h2>

      <p>
        Result: <b>{result}</b>
      </p>

      <p className="text-gray-400">
        Confidence: {confidence}%
      </p>

      <p className="text-gray-500 text-sm mt-2">
        {reason}
      </p>

    </div>

  )

}