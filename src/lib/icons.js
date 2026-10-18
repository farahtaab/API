import {
  createIcons,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Compass,
  Ear,
  ExternalLink,
  GraduationCap,
  Globe,
  Handshake,
  Heart,
  HeartHandshake,
  House,
  Languages,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Mic,
  Quote,
  School,
  Send,
  Sparkles,
  Stethoscope,
  Users,
  Video,
  Wifi,
  X,
} from 'lucide';
import { BRAND_PATHS } from './brands.js';

// Afegeix aquí qualsevol icona de Lucide que vulguis usar com a data-lucide="nom-en-kebab".
const icons = {
  ArrowRight,
  ArrowUp,
  BookOpen,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  Compass,
  Ear,
  ExternalLink,
  GraduationCap,
  Globe,
  Handshake,
  Heart,
  HeartHandshake,
  House,
  Languages,
  Laptop,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Mic,
  Quote,
  School,
  Send,
  Sparkles,
  Stethoscope,
  Users,
  Video,
  Wifi,
  X,
};

/** Substitueix <i data-lucide="..."> per SVG. Crida-ho després de renderitzar HTML nou. */
export function refreshIcons(root = document) {
  createIcons({ icons, root, attrs: { 'aria-hidden': 'true' } });
}

/** Icona de marca (WhatsApp, Instagram...) com a SVG en línia. */
export function brandIcon(name, cls = 'size-5') {
  const path = BRAND_PATHS[name];
  if (!path) return '';
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${path}"/></svg>`;
}

/** Helper per escriure <i data-lucide> amb classes. */
export const icon = (name, cls = 'size-5') => `<i data-lucide="${name}" class="${cls}"></i>`;
