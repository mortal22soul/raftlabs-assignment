import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-50" />
          <Skeleton className="h-4 w-37.5" />
        </div>
        <Skeleton className="h-10 w-30" />
      </div>

      <div className="rounded-md border p-4 space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-62.5" />
              <Skeleton className="h-4 w-50" />
            </div>
            <Skeleton className="h-4 w-25" />
          </div>
        ))}
      </div>
    </div>
  );
}
