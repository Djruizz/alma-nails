import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

interface DeleteResponse {
  success: boolean;
  message: string;
}

export default defineEventHandler(async (event): Promise<DeleteResponse> => {
  const id = getRouterParam(event, "id");
  
  if (!id) {
    throw createError({ 
      statusCode: 400,
      statusMessage: "ID inválido", 
      message: "Falta el ID del servicio" 
    });
  }
  
  const numericId = parseInt(id, 10);
  
  if (isNaN(numericId)) {
    throw createError({
      statusCode: 400,
      statusMessage: "ID inválido",
      message: "El ID del servicio debe ser un número",
    });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { error } = await client
    .from("services")
    .delete()
    .eq("id", numericId);

  if (error) {
    throw createError({ 
      statusCode: 500,
      statusMessage: "Error al eliminar servicio", 
      message: error.message 
    });
  }

  return { 
    success: true,
    message: "Servicio eliminado correctamente" 
  };
});
