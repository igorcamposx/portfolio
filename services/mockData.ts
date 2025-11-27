
import { Project } from '../types';

export const BIO_TEXT = `Sou um profissional criativo com experiência em conteúdo digital, especializado em roteirização, gravação e edição de vídeos para plataformas como Instagram, TikTok, Facebook e Twitter. Trabalhei com marketing digital, criação de sites em WordPress e estratégias que trouxeram resultados sólidos.

Atendi influenciadores como Sev7n, Renan Bolsonaro, Misty, Presida, Shevii2k e outros, criando conteúdos gráficos, artes para livestreams, captação de parcerias e edição de vídeos para YouTube. Sempre busco colaboração, visão estratégica e foco em resultado.

Busco empresas que valorizem crescimento e reconhecimento profissional.`;

export const SOCIAL_LINKS = [
  { platform: 'Twitter', url: 'https://x.com/whyzz', icon: 'Twitter' },
  { platform: 'Behance', url: 'https://www.behance.net/igorcampos5', icon: 'Behance' },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/igorcamposx/', icon: 'Linkedin' },
  { platform: 'Instagram', url: 'https://www.instagram.com/whyzzvisual', icon: 'Instagram' },
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Edição Dinâmica para Reels',
    category: 'video',
    thumbnail: 'https://picsum.photos/id/101/800/600',
    description: 'Edição rápida com cortes dinâmicos e legendas animadas para TikTok e Instagram.',
    client: 'Influencer X',
    date: '2023-11',
    gallery: [
      { type: 'image', url: 'https://picsum.photos/id/101/800/600' },
      { type: 'video', url: 'https://media.istockphoto.com/id/1455855079/video/young-business-partner-discussing-work-using-laptop-in-modern-office.mp4?s=mp4-640x640-is&k=20&c=L_Jg3J-2K79O0oK_u_M-C1XJqK5_q_8_0_0_0_0=' } // Sample video
    ]
  },
  {
    id: '2',
    title: 'Identidade Visual Streamer',
    category: 'design',
    thumbnail: 'https://picsum.photos/id/102/800/600',
    description: 'Pacote completo de overlay, alertas e painéis para Twitch. Este projeto inclui animações de entrada, alertas de subs e design de painéis.',
    client: 'Gamer Y',
    date: '2023-10',
    gallery: [
      { type: 'image', url: 'https://picsum.photos/id/102/800/600' }, // Main banner
      { type: 'image', url: 'https://picsum.photos/id/120/800/600' }, // Offline screen
      { type: 'image', url: 'https://picsum.photos/id/133/800/600' }, // Panels
      { type: 'video', url: 'https://media.istockphoto.com/id/1364377038/video/particles-dust-abstract-light-motion-titles-cinematic-background.mp4?s=mp4-640x640-is&k=20&c=0d2_q_0_0_0_0_0_0=' } // Animated Alert Example
    ]
  },
  {
    id: '3',
    title: 'Campanha Publicitária',
    category: 'video',
    thumbnail: 'https://picsum.photos/id/103/800/600',
    description: 'Vídeo institucional focado em conversão e branding.',
    client: 'Agência Z',
    date: '2023-09',
  },
  {
    id: '4',
    title: 'Website Institucional',
    category: 'web',
    thumbnail: 'https://picsum.photos/id/104/800/600',
    description: 'Desenvolvimento de landing page de alta conversão.',
    client: 'Startup A',
    date: '2023-08',
    gallery: [
        { type: 'image', url: 'https://picsum.photos/id/104/800/600' },
        { type: 'image', url: 'https://picsum.photos/id/119/800/600' },
    ]
  },
  {
    id: '5',
    title: 'Thumbnail YouTube',
    category: 'design',
    thumbnail: 'https://picsum.photos/id/106/800/600',
    description: 'Arte de alta taxa de clique (CTR) para canal de tecnologia.',
    client: 'TechChannel',
    date: '2023-12',
  },
  {
    id: '6',
    title: 'Vlog de Viagem',
    category: 'video',
    thumbnail: 'https://picsum.photos/id/108/800/600',
    description: 'Color grading e sound design para vlog lifestyle.',
    client: 'Traveler B',
    date: '2024-01',
  }
];

// Simulates an async database call
export const fetchProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(INITIAL_PROJECTS);
    }, 800); // Simulate network latency
  });
};

export const fetchProjectById = async (id: string): Promise<Project | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(INITIAL_PROJECTS.find(p => p.id === id));
    }, 500);
  });
};
