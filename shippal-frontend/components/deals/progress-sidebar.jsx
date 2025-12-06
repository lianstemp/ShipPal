"use client"

import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function DealProgressSidebar({ steps, activeTab, setActiveTab, currentStepIndex }) {
    return (
        <div className="bg-zinc-900/50 rounded-xl p-2 border border-zinc-800/50 backdrop-blur-sm sticky top-6">
            {steps.map((step, index) => {
                const isActive = activeTab === step.id
                const isCompleted = index < currentStepIndex
                const isCurrent = index === currentStepIndex
                const Icon = step.icon

                return (
                    <button
                        key={step.id}
                        onClick={() => setActiveTab(step.id)}
                        className={cn(
                            "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left relative overflow-hidden group",
                            isActive ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                        )}
                    >
                        {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />}

                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-colors",
                            isActive ? "bg-blue-500 text-white" :
                                isCompleted ? "bg-green-900/30 text-green-500" : "bg-zinc-800"
                        )}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                        </div>

                        <div className="flex-1">
                            <p className={cn("text-sm font-medium", isActive && "text-blue-400")}>{step.label}</p>
                            {isCurrent && <p className="text-[10px] text-zinc-500">In Progress</p>}
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
