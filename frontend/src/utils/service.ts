import { useMutation, useQuery } from "@tanstack/react-query";
import type { FilterParams, Place , HotelFormValues, CreatePlaceResponse} from "../types";
import api from "./api.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const usePlaces = (params?: FilterParams) =>
  // API isteği tanımı ve bağımlılıkları
  useQuery<Place[]>({
    queryKey: ["places", params], // ✅ params değiştiğinde sorgu yenilenir
    queryFn: async () => {
      const res = await api.get("/place", { params });
      return res.data; // ✅ doğru return
    },
    // hata durumunda deneme sayısı
    retry: 3,
    // hata durumunda bekleme süresi (ms)
    retryDelay: 2000,
    // cache'teki verinin "taze" kalma süresi (ms)
    staleTime: 0,
    // cache temizlenme süresi (ms)
    gcTime: 30000,
  });

  
// id'ye göre bir veri döndüren api isteği
export const usePlace = (id: string) =>
  useQuery<Place>({
    queryKey: ["place", id],
    queryFn: () => api.get(`/place/${id}`).then((res) => res.data.place),
  });

  // id'ye göre bir veri silen api isteği
  export const useDeletePlace = () => {
    const navigate = useNavigate();
  
    return useMutation({
      mutationKey: ["remove"],
      mutationFn: async (id: string | number) => {
        const res = await api.delete(`/place/${id}`);
        return res.data;
      },
      onSuccess: () => {
        toast.success("Konaklama noktası başarıyla kaldırıldı");
        setTimeout(() => navigate("/"), 800); // küçük gecikme ile yönlendirme
      },
      onError: (err: "message") => {
        console.error("DELETE hatası:", err);
        toast.error("Bir hata oluştu");
      },
    });
  };
// yeni bir konaklama noktası oluşturan api isteği
export const useCreatePlace = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["create"],
    mutationFn: (values: HotelFormValues) =>
      api.post<CreatePlaceResponse>("/place", values),
    onSuccess: (res) => {
      toast.success("Konaklama noktası başarıyla oluşturuldu");
      navigate(`/place/${res.data.place.id}`); // detay sayfasına
    },
    onError: () => {
      toast.error("Bir hata oluştu");
    },
  });
};