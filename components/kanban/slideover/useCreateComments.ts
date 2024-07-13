import {v4 as uuid} from "uuid";
import {useMutation} from "@tanstack/vue-query";
import {COLLECTION_COMMENTS, DB_ID} from "~/app.constants";
import {useDealSlideStore} from "~/store/deal-slide.store";

// refetch для обновления списка комментариев
export function useCreateComment({refetch}: { refetch: () => void }) {
  // store чтобы забрать id сделки
  const store = useDealSlideStore();
  // commentRef для получения комментария
  const commentRef = ref<string>();

  const {mutate} = useMutation({
    // mutationKey для кэшировния
    mutationKey: ['add comments', commentRef.value],
    // mutationFn для отправки запроса в БД (id БД, id коллекции комментариев, id комментария, данные комментария)
    mutationFn: () => DB.createDocument(DB_ID, COLLECTION_COMMENTS, uuid(), {
      text: commentRef.value,
      deal: store.card?.id,
    }),
    // при успехе, всё подчищаем и обновляем список комментариев
    onSuccess: () => {
      refetch()
      commentRef.value = ''
    }
  })

  // ф-ия создания комментария
  const writeComment = () => {
    if(!commentRef.value) return
    mutate()
  }

  return {
    writeComment,
    commentRef,
  }
}
