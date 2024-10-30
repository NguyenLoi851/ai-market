"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { ModelView, ModelType } from "@/lib/definitions/model";

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please select a name.",
  }),
  description: z.string(),
  type: z.enum(["chat", "image"]),
  date: z.string(),
});

export type State = {
  errors?: {
    name?: string[];
    type?: string[];    
  };
  message?: string | null;
};

const CreateModel = FormSchema.omit({ id: true, date: true });

export async function createModel(formData: FormData) {
  'use server';
  const validatedFields = CreateModel.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    type: formData.get("type"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Model.",
    };
  }

  const { name, description, type } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  // insert to db
  // await sql`
  //     INSERT INTO models (name, description, type, date)
  //     VALUES (${name}, ${description}, ${type}, ${date})
  //   `;

  // delete cache
  // revalidatePath("/creators");
  // route to invoices
  // redirect("/creators");
}


export async function fetchModels() {
    try {
      const data = await sql<ModelView>`
        SELECT
          name,
          description,
          type
        FROM models
        ORDER BY name ASC
      `;
  
      const models = data.rows;
      return models;
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to fetch all models.');
    }
}

export async function featchModelTypes(){
  try {
    const data = await sql<ModelType>`
      SELECT DISTINCT 
        type
      FROM models
      ORDER BY type ASC
    `;

    const result = data.rows;
    return result;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all models.');
  }
}
