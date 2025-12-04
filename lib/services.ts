
import { Board } from "./supabase/models";
import { Column } from "./supabase/models";
import { SupabaseClient } from "@supabase/supabase-js";

export const boardService = {
    async getBoards(supabase: SupabaseClient, userId: string): Promise<Board[]> {
        const { data, error } = await supabase.
            from("boards")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });
        if (error) {
            throw error;
        }
        return data;
    },


    async createBoard(supabase: SupabaseClient, board: Omit<Board, "id" | "created_at" | "updated_at">): Promise<Board> {
        const { data, error } = await supabase
            .from("boards")
            .insert(board)
            .select()
            .single();

        if (error) {
            throw error;
        }
        return data;


    }


}

export const ColumnService = {
    // async getBoards(userId: string): Promise<Board[]> {
    //     const { data, error } = await supabase.
    //         from("boards")
    //         .select("*")
    //         .eq("user_id", userId)
    //         .order("created_at", { ascending: false });
    //     if (error) {
    //         throw error;
    //     }
    //     return data;
    // },


    async createColumn(supabase: SupabaseClient, Column: Omit<Column, "id" | "created_at">): Promise<Column> {
        const { data, error } = await supabase
            .from("columns")
            .insert(Column)
            .select()
            .single();

        if (error) {
            throw error;
        }
        return data;


    }


}

export const boardDataService = {

    async createBoardWithDefaultColumns(supabase: SupabaseClient, boardData: {
        title: string,
        description?: string,
        color?: string,
        userId: string
    }) {
        const board = await boardService.createBoard(supabase, {
            title: boardData.title,
            description: boardData.description || null,
            color: boardData.color || "bg-blue-500",
            user_id: boardData.userId
        });
        const defaultColumns = [
            { title: " To Do", board_id: board.id, sort_order: 0 },
            { title: " In Progress", board_id: board.id, sort_order: 1 },
            { title: " Review", board_id: board.id, sort_order: 2 },
            { title: " Done", board_id: board.id, sort_order: 3 }
        ];
        await Promise.all(defaultColumns.map((column) =>
            ColumnService.createColumn(supabase, {
                ...column, board_id: board.id
                , user_id: boardData.userId,
            })
        )
        );

        return board;
    },

};
