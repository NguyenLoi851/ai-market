import { CoreMessage } from 'ai';
// import { cookies } from 'next/headers';
// import { notFound } from 'next/navigation';

// import { auth } from '@/app/(auth)/auth';
import { Chat as PreviewChat } from '@/components/chat/chat';
import { getChatById } from '@/lib/actions/chat';
import { Chat } from '@/lib/definitions/chat';
import { DEFAULT_MODEL_NAME, models } from '@/lib/definitions/model';
import { convertToUIMessages } from '@/lib/utils';
import { DbMessage } from '@/lib/definitions/message';
import { useRouter } from 'next/router';

export default function Page(props: { params: Promise<any> }) {
  const params = props.params;
  const router = useRouter();
  const { id } = router.query;

//   const chatFromDb = await getChatById({ id });

//   if (!chatFromDb) {
//     notFound();
//   }

  // type casting
  const chat: Chat = {
      id: id as any,
      messages: [],
      userId: '',
      createdAt: new Date().getUTCDate()
  };

//   const session = await auth();

//   if (!session || !session.user) {
//     return notFound();
//   }

//   if (session.user.id !== chat.userId) {
//     return notFound();
//   }

  const value = DEFAULT_MODEL_NAME;
  const selectedModelName =
    models.find((m) => m.name === value)?.name || DEFAULT_MODEL_NAME;

  return (
    <PreviewChat
      id={chat.id}
      initialMessages={chat.messages}
      selectedModelName={selectedModelName}
    />
  );
}
