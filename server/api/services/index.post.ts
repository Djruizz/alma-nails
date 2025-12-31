import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

type Service = Database["public"]["Tables"]["services"]["Row"];
type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];

export default defineEventHandler(async (event): Promise<Service> => {
  const body = await readBody<ServiceInsert>(event);

  // Validate required fields
  if (!body.name || body.name.trim() === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Validación fallida",
      message: "El nombre del servicio es requerido",
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
    .insert(body)
    .select()

  if (error) {
    throw createError({ 
      statusCode: 500,
      statusMessage: "Error al crear servicio", 
      message: error.message 
    });
  }

  if (!services || services.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear servicio",
      message: "No se pudo crear el servicio",
    });
  }

  return services[0];
});
