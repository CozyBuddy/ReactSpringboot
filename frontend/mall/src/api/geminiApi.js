import axios from "axios"
import { API_SERVER_HOST } from "./todoApi";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jwtAxios from "../util/jwtUtil";

const gemini_api_key = `AIzaSyBzN4a7WALyejIFjJ_XBSbPGYsitQTjrDU`

export const GetGeminiChat = async(prompt, email) => {
 
    const response = await jwtAxios.post(`${API_SERVER_HOST}`+'/api/geminichat',{
        text : prompt,
        email :email
    })

    const text = response.data.candidates[0].content.parts[0].text
    return text
}

