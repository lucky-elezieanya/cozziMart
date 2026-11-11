
type TableColumn = {
  key: string;
  label: string;
  className?: string;
};

type TableRow = {
  id?: string | number;
  [key: string]: string | number | null | undefined;
};

interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  emptyMessage?: string;
}

export default function DataTable({
  columns,
  rows,
  emptyMessage = "No records found.",
}: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto">

      <table className="w-full min-w-[650px] border-collapse text-left">

        {/* Table header */}
        <thead>
          <tr className="border-y border-gray-100 bg-gray-50/70">

            {columns.map((column) => (
              <th
                key={column.key}
                className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold tracking-wider text-gray-400 ${column.className ?? ""}`}
              >
                {column.label}
              </th>
            ))}

          </tr>
        </thead>

        {/* Table body */}
        <tbody>

          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr
                key={row.id ?? index}
                className="border-b border-gray-100 transition last:border-0 hover:bg-gray-50/70"
              >

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap px-4 py-4 text-xs text-gray-600 ${column.className ?? ""}`}
                  >
                    {row[column.key] ?? "—"}
                  </td>
                ))}

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-sm text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}
