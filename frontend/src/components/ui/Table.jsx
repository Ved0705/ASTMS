export default function Table({
  columns,
  data,
  keyField = 'id',
  emptyState = 'No records found.',
  rowClassName = '',
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${column.headerClassName ?? ''}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {!data.length ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-slate-500">
                  {emptyState}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row[keyField]} className={`hover:bg-slate-50/80 ${rowClassName}`}>
                  {columns.map((column) => (
                    <td key={`${row[keyField]}-${column.key}`} className={`px-4 py-3 align-top text-slate-700 ${column.cellClassName ?? ''}`}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
