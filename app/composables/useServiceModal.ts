import { type Service, type ModalMode } from "~/types/service.types";
export const useServiceModal = () => {
  const isOpen = useState<boolean>("service-modal", () => false);
  const mode = useState<ModalMode>("service-modal-mode", () => "create");
  const service = useState<Service | undefined>("selected-service-edit-modal", () => undefined);

  const openCreateModal = () => {
    isOpen.value = true;
    mode.value = "create";
    service.value = undefined;
  };

  const openEditModal = (selectedService: Service) => {
    mode.value = "edit";
    service.value = selectedService;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    setTimeout(()=>{
      service.value = undefined;
      mode.value = "create";
    }, 300)
  };

  return {
    isOpen,
    mode,
    service,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
