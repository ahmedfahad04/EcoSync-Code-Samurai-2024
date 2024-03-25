interface TableSkeletonProps {
  customClass?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  customClass = "",
}: TableSkeletonProps) => {
  return (
    <tr className={`animate-pulse ${customClass}`}>
      <td className="px-3 py-3">
        <div className="h-4 w-4 rounded bg-gray-300" />
      </td>

      <td className="py-3 pr-16">
        <div className="flex items-center">
          <div className="skeleton-wave h-12 w-14 rounded" />
          <div className="flex w-full flex-col">
            <div className="skeleton-wave mb-2 ml-4 h-4 w-1/2 rounded" />
            <div className="skeleton-wave ml-4 h-3 w-1/2 rounded" />
          </div>
        </div>
      </td>

      {Array.from({ length: 4 }).map((_, index) => (
        <td key={index} className="py-3 pr-16">
          <div className="skeleton-wave h-6 rounded" />
        </td>
      ))}
    </tr>
  );
};

export default TableSkeleton;
