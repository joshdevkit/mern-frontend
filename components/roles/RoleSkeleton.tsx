import { Skeleton } from "@/components/ui/skeleton";

export default function RoleSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center py-4">
        <Skeleton className="w-64 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>

      <div className="rounded-md border">
        <Skeleton className="h-12 w-full mb-2" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 px-4"
            >
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-6" />
              <Skeleton className="w-1/4 h-6" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="w-24 h-10" />
        <Skeleton className="w-24 h-10" />
      </div>
    </>
  );
}
