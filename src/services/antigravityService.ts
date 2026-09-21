export interface AntigravityStatus {
  ready: boolean;
  hasKey: boolean;
  agent: string;
  supportedAgents: string[];
  message: string;
}

export interface AntigravityInteraction {
  id: string;
  agent?: string;
  status: 'in_progress' | 'completed' | 'failed' | 'cancelled' | string;
  created?: string;
  updated?: string;
  environment_id?: string;
  usage?: {
    total_tokens?: number;
    total_input_tokens?: number;
    total_output_tokens?: number;
    total_thought_tokens?: number;
  };
  steps?: Array<{
    content?: Array<{
      text?: string;
    }>;
    type?: string;
    status?: string;
  }>;
  outputs?: Array<{
    text?: string;
  }>;
  error?: {
    message: string;
    code?: string;
  };
}

export async function checkAntigravityStatus(): Promise<AntigravityStatus> {
  try {
    const res = await fetch('/api/antigravity/status');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      ready: false,
      hasKey: false,
      agent: 'antigravity-preview-05-2026',
      supportedAgents: ['antigravity-preview-05-2026'],
      message: err.message || 'No se pudo conectar con el servicio Antigravity.',
    };
  }
}

export async function createAntigravityInteraction(params: {
  input: string;
  background?: string;
}): Promise<{ success: boolean; interaction: AntigravityInteraction }> {
  const res = await fetch('/api/antigravity/interactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: params.input,
      background: params.background,
      stream: false,
      environment: { type: 'remote' },
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || 'Error al ejecutar Antigravity');
  }

  return data;
}

export function streamAntigravityInteraction(params: {
  input: string;
  background?: string;
  onChunk: (chunk: any) => void;
  onError: (err: Error) => void;
  onDone: () => void;
}): () => void {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch('/api/antigravity/interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: params.input,
          background: params.background,
          stream: true,
          environment: { type: 'remote' },
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        let errorMsg = `Error HTTP ${res.status}`;
        try {
          const errData = await res.json();
          errorMsg = errData.error || errorMsg;
        } catch {
          // ignore json parse error
        }
        params.onError(new Error(errorMsg));
        return;
      }

      if (!res.body) {
        throw new Error('No se recibió cuerpo de respuesta para streaming.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const payload = trimmed.replace(/^data:\s*/, '');
          if (payload === '[DONE]') {
            params.onDone();
            return;
          }

          try {
            const parsed = JSON.parse(payload);
            if (parsed.error) {
              params.onError(new Error(parsed.error));
              return;
            }
            params.onChunk(parsed);
          } catch {
            // ignora lineas mal formadas
          }
        }
      }

      params.onDone();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      params.onError(err instanceof Error ? err : new Error(String(err)));
    }
  })();

  return () => {
    controller.abort();
  };
}

export async function getAntigravityInteraction(id: string): Promise<AntigravityInteraction> {
  const res = await fetch(`/api/antigravity/interactions/${encodeURIComponent(id)}`);
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || 'No se pudo obtener el estado de la interacción.');
  }
  return data.interaction;
}

export async function cancelAntigravityInteraction(id: string): Promise<void> {
  const res = await fetch(`/api/antigravity/interactions/${encodeURIComponent(id)}/cancel`, {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || 'No se pudo cancelar la interacción.');
  }
}
