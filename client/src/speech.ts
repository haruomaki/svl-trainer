import { useCallback, useRef } from "react";

/**
 * 単語を読み上げるカスタムフック
 * @returns 
 */
export function useSpeech() {
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!("speechSynthesis" in window)) return;

    // 再生中の音声を止める
    // FIXME: PCのWeb Speech API実装だと止まってくれない
    speechSynthesis.cancel();

    // 再生
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    currentUtterance.current = utter;
    speechSynthesis.speak(utter);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
  }, []);

  return { speak, stop };
}
