import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];

export default defineEventHandler(async (event): Promise<Service[]> => {
  const client = await serverSupabaseClient<Database>(event);

  const { data: services, error } = await client
    .from("services")
    .select("*")

  if (error) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: "Error al obtener servicios",
      message: error.message 
    });
  }

  if (!services) {
    return [];
  }

  return services;
});
