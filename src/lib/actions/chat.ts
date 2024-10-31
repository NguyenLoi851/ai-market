"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { ChatDb } from "../definitions/chat";
import { DbMessage } from "../definitions/message";

export async function getChatById({ id }: { id: string }) {
    try {
        const data = await sql<ChatDb>`
          SELECT *
          FROM chats
          WHERE id = ${id}
        `;
    
        const result = data.rows;
        return result[0] ;
      } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to fetch all models.');
      }
  }