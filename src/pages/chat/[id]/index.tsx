import { CoreMessage } from 'ai';
// import { cookies } from 'next/headers';
// import { notFound } from 'next/navigation';

// import { auth } from '@/app/(auth)/auth';
import { Chat as PreviewChat } from '@/components/chat/chat';
import { getChatById } from '@/lib/actions/chat';
import { Chat } from '@/lib/definitions/chat';
import { DEFAULT_MODEL_NAME, Model, models } from '@/lib/definitions/model';
import { useContext, useEffect, useState } from "react";
import { DbMessage } from '@/lib/definitions/message';
import { useRouter } from 'next/router';
import { featchModel } from '@/lib/actions/model';

export default function Page(props: { params: Promise<any> }) {
    const params = props.params;
    const router = useRouter();
    const { asPath } = router;

    let initModel: Model = models[0];
    const [model, setModel] = useState<Model>(initModel);

    //   const chatFromDb = await getChatById({ id });

    //   if (!chatFromDb) {
    //     notFound();
    //   }
    useEffect(() => {
        const getModel = async () => {
            const url = new URLSearchParams(asPath.split('?')[1]);
            const id = url.get('id') ?? '';
            if(id.length > 0){
                let modelDB = await featchModel(id);
                setModel(modelDB);
            }
            
        }

        getModel();
    }, [asPath]);
    // type casting
    const chat: Chat = {
        id: "",
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
            selectedModelName={model}
        />
    );
}

