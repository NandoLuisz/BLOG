import { api } from "@/lib/api"
import { PostResponse } from "./get-all-posts"


export async function lastPost(){
    const response = await api.get<PostResponse>('post/last-post')

    console.log(response.data)

    return response.data
}