import { api } from '@/lib/axios';

type UploadAttachmentResponse = {
  attachments: Array<{
    id: string;
    url: string;
  }>;
};

export async function uploadAttachment(file: File) {
  const formData = new FormData();

  formData.append('files', file);

  const response = await api.post<UploadAttachmentResponse>(
    '/attachments',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
}
