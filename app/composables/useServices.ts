import type { Database } from "~/types/database.types";
import type {
  Service,
  ServiceInsert,
  ServiceUpdate,
} from "~/types/service.types";

export const useServices = () => {
  const { setLoading } = useLoading();

  const services = useState<Service[]>("services", () => []);
  const error = ref<string | null>(null);

  /**
   * Fetch all services from the API
   */
  const fetchServices = async (): Promise<void> => {
    setLoading(true);
    if (services.value.length > 0) {
      setLoading(false);
      return;
    };

    error.value = null;

    try {
      const response = await fetch("/api/services");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch services`);
      }

      const data: Service[] = await response.json();
      services.value = data;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Unknown error occurred";
      console.error("Error fetching services:", errorMessage);
      error.value = errorMessage;
      services.value = [];
    } finally {
      setLoading(false);
    }
  };

  /**
   * Create a new service
   * @param serviceData - Service data to create
   * @returns The created service or null if failed
   */
  const createService = async (
    serviceData: ServiceInsert
  ): Promise<Service | null> => {
    setLoading(true);
    error.value = null;

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: Failed to create service`
        );
      }

      const newService: Service = await response.json();

      // Add the new service to the list
      services.value = [...services.value, newService];

      return newService;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Unknown error occurred";
      console.error("Error creating service:", errorMessage);
      error.value = errorMessage;
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing service
   * @param id - Service ID to update
   * @param serviceData - Partial service data to update
   * @returns The updated service or null if failed
   */
  const updateService = async (
    id: number,
    serviceData: ServiceUpdate
  ): Promise<Service | null> => {
    setLoading(true);
    error.value = null;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
          `Error ${response.status}: Failed to update service`
        );
      }
      
      const updatedService: Service = await response.json();

      if (!updatedService) {
        throw new Error("Service not found in response");
      }
      // Update the service in the list
      services.value = services.value.map((service) =>
        service.id === id ? updatedService : service
      );

      return updatedService;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Unknown error occurred";
      console.error("Error updating service:", errorMessage);
      error.value = errorMessage;
      return null;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a service
   * @param id - Service ID to delete
   * @returns true if successful, false otherwise
   */
  const deleteService = async (id: number): Promise<boolean> => {
    setLoading(true);
    error.value = null;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Error ${response.status}: Failed to delete service`
        );
      }

      // Remove the service from the list
      services.value = services.value.filter((service) => service.id !== id);

      return true;
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e.message : "Unknown error occurred";
      console.error("Error deleting service:", errorMessage);
      error.value = errorMessage;
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    services,
    error,
    fetchServices,
    createService,
    updateService,
    deleteService,
  };
};
