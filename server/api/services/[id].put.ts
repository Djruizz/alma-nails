import type { Database } from "~/types/database.types";
import { serverSupabaseClient } from "#supabase/server";

type Service = Database["public"]["Tables"]["services"]["Row"];
type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];

export default defineEventHandler(async (event): Promise<Service> => {
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

  const body = await readBody<ServiceUpdate>(event);

  // Validate fields if they are provided
  if (body.name !== undefined && body.name.trim() === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Validación fallida",
      message: "El nombre del servicio no puede estar vacío",
    });
  }

  if (body.price !== undefined && body.price < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validación fallida",
      message: "El precio no puede ser negativo",
    });
  }

  if (body.duration_min !== undefined && body.duration_min < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Validación fallida",
      message: "La duración no puede ser negativa",
    });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { data: services, error } = await client
    .from("services")
    .update(body)
    .eq("id", numericId)
    .select()
    .returns<Service[]>();

  if (error) {
    throw createError({ 
      statusCode: 500,
      statusMessage: "Error al actualizar servicio", 
      message: error.message 
    });
  }

  if (!services || services.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: "Servicio no encontrado",
      message: "No se encontró el servicio para actualizar",
    });
  }

  return services[0];
});
