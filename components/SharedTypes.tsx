interface MyTypeImage {
  image: string;
  cols: number;
  rows: number;
}

interface MyTypeTeam {
  id: number;
  image: string;
  name: string;
  role: string;
  about: string;
  about_mobile: string;
  begining?: string
}

interface MyTypeMainPhoto {
  pictureId: number;
  image: string;
  text_1: string;
  text_2: string;
  text_3: string;
  number: string;
  type?: string;
}

interface MyTypeInstaPhoto {
  id: string;
  media_type: string;
  media_url: string;
  caption: string;
  timestamp: string;
  permalink: string;
  thumbnail_url?: string;
}

interface MyTypeAboutProps {
  [key: string]: any
}

export type { 
  MyTypeImage, 
  MyTypeTeam, 
  MyTypeMainPhoto,
  MyTypeInstaPhoto,
  MyTypeAboutProps
}

/*
interface MyAboutTexts {
    "p_1_1_desctop": string,
    "p_1_1_mobile": string,
    "p_1_2_desctop": string,
    "p_1_2_mobile": string,
    "p_1_3_desctop": string,
    "p_1_4_desctop": string,
    "p_2_1_desctop": string,
    "p_2_1_mobile": string,
    "p_2_2_desctop": string,
    "p_2_2_mobile": string,
    "p_2_3_desctop": string,
    "p_2_4_desctop": string,
    "p_3_1_desctop": string,
    "p_3_1_mobile": string,
    "p_3_2_desctop": string,
    "p_3_2_mobile": string,
    "p_3_3_desctop": string,
    "p_3_4_desctop": string
}
*/

