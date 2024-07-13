import {useDealSlideStore} from "~/store/deal-slide.store";
import {useQuery} from "@tanstack/vue-query";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";

export function useComments() {
  const store = useDealSlideStore();
  const cardId = store.card?.id || '';

  return useQuery({
    queryKey: ['deal', cardId],
    // получаем карточку по id
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
  })
}
