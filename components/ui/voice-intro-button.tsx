"use client";

export function VoiceIntroButton({ message }: { message: string }) {
  return (
    <button
      className="voice-button"
      type="button"
      aria-label="Play intro voice"
      onClick={() => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(new SpeechSynthesisUtterance(message));
        } else {
          globalThis.alert(message);
        }
      }}
    >
      ▥
    </button>
  );
}
