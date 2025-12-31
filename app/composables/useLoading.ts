export const useLoading = () => {
  const loading = useState('loading', () => true)

  const setLoading = (value: boolean) =>{
    loading.value = value
  }
  return {
    loading,
    setLoading
  };
};