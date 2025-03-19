import { api } from "@/lib/api"
import { PostResponse } from "./get-all-posts"

export async function getPostById(id: string){
    const response = await api.get<PostResponse>(`post/all-post/${id}`)

    return response.data
}