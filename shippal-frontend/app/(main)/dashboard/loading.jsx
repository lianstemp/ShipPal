import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardLoading() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="space-y-2">
                <Skeleton className="h-8 w-64 bg-zinc-800" />
                <Skeleton className="h-4 w-48 bg-zinc-800" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Skeleton className="h-32 bg-zinc-800 rounded-xl" />
                <Skeleton className="h-32 bg-zinc-800 rounded-xl" />
                <Skeleton className="h-32 bg-zinc-800 rounded-xl" />
            </div>

            <div className="space-y-4">
                <Skeleton className="h-64 bg-zinc-800 rounded-xl" />
            </div>
        </div>
    )
}
