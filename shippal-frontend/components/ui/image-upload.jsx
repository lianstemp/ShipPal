"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageUpload({
    value = [],
    onChange,
    disabled,
    maxFiles = 5,
    bucket = "images"
}) {
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef(null)
    const supabase = createClient()

    const handleUpload = async (e) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        const newUrls = []

        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) throw new Error("Unauthorized")

            for (const file of files) {
                const fileExt = file.name.split('.').pop()
                const fileName = `${user.id}/${Math.random().toString(36).substring(2)}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, file)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName)

                newUrls.push(publicUrl)
            }

            onChange([...value, ...newUrls])
        } catch (error) {
            console.error("Error uploading image:", error)
            alert("Error uploading image")
        } finally {
            setUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleRemove = (urlToRemove) => {
        onChange(value.filter(url => url !== urlToRemove))
    }

    return (
        <div className="space-y-4">
            <div className={cn(
                "grid gap-4",
                maxFiles === 1 ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
            )}>
                {value.map((url) => (
                    <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-800 group">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                onClick={() => handleRemove(url)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                        <img
                            src={url}
                            alt="Upload"
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}
                {value.length < maxFiles && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "relative aspect-square rounded-lg border-2 border-dashed border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col items-center justify-center cursor-pointer bg-zinc-900/50",
                            (disabled || uploading) && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        {uploading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
                        ) : (
                            <>
                                <Upload className="h-6 w-6 text-zinc-500 mb-2" />
                                <span className="text-xs text-zinc-500">Upload Image</span>
                            </>
                        )}
                    </div>
                )}
            </div>
            <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleUpload}
                disabled={disabled || uploading || value.length >= maxFiles}
            />
        </div>
    )
}
