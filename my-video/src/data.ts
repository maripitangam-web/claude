export const FPS = 30;

// Duração do vídeo principal (public/video-cortado.mp4), em segundos.
export const MAIN_DURATION = 34.667;

export type Clip = {
  src: string;
  // Trecho do arquivo a usar, em segundos.
  from: number;
  to: number;
  credit: string;
};

// Vídeos ilustrativos, tocados em sequência na metade de cima.
export const CLIPS: Clip[] = [
  {
    src: "brut.mp4",
    from: 0,
    to: 13.6,
    credit: "Images : Rémy Buisine / Brut",
  },
  { src: "nouvelobs.mp4", from: 0, to: 10.77, credit: "Vidéo : Nouvel Obs" },
  {
    src: "brut.mp4",
    from: 0,
    to: 10.3,
    credit: "Images : Rémy Buisine / Brut",
  },
];

export type Caption = {
  // Momento (em segundos, no vídeo cortado) em que a palavra é falada.
  start: number;
  end: number;
  pt: string;
  fr: string;
};

// Legendas palavra por palavra. Preencher a partir da transcrição.
export const CAPTIONS: Caption[] = [];
