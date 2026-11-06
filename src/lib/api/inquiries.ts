import { apiFetch, isApiConfigured } from './client';

export interface InquiryPayload {
  name: string;
  company: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  commodity: string;
  volume: string;
  message: string;
  inquiryType: string;
}

export type InquiryResult =
  | { status: 'sent'; reference: string }
  | { status: 'not-configured' }
  | { status: 'error'; message: string };

export async function submitInquiry(payload: InquiryPayload): Promise<InquiryResult> {
  if (!isApiConfigured) {
    return { status: 'not-configured' };
  }

  try {
    const result = await apiFetch<{ reference?: string }>('/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { status: 'sent', reference: result.reference ?? 'SIBA-INQUIRY' };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Permintaan gagal dikirim.',
    };
  }
}
