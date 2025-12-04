"use client"

import { useUser } from "@clerk/nextjs"
import { boardDataService } from "../services"
import { useState } from "react"
import { useSupabase } from "../supabase/SupabaseProvider"
import { Board } from "../supabase/models"

export const useBoards = () => {
    const { user } = useUser()
    const [boards, setBoards] = useState<Board[]>([])
    const { supabase } = useSupabase();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function createBoard(boardData: {

        title: string
        description?: string
        color?: string
    }) {
        if (!user) {
            throw new Error("User not authenticated")
        }
        try {
            const newBoard = await boardDataService.createBoardWithDefaultColumns(supabase!, {
                ...boardData,
                userId: user.id
            })
            setBoards((prev) => [...prev, newBoard])
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create board")
        }
    }
    return {
        createBoard,
        boards,
        loading,
        error
    }

}