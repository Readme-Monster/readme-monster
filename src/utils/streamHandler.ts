// utils/streamHandler.ts
export async function handleStreamResponse(
  stream: ReadableStream<Uint8Array> | null,
  callback: { (chunk: any): void; (arg0: any): void },
) {
  if (!stream) {
    throw new Error("Stream is null");
  }

  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    done = readerDone;
    const chunk = decoder.decode(value, { stream: true });

    // 각 줄을 분리하여 처리
    const lines = chunk.split("\n").filter(line => line.trim() !== "");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.replace("data: ", "");
        if (data === "[DONE]") {
          done = true;
          break;
        }
        try {
          const json = JSON.parse(data);
          const content = json.choices[0].delta.content;
          if (content) {
            callback(content);
          }
        } catch (e) {
          console.error("Error parsing stream data:", e);
        }
      }
    }
  }
}
