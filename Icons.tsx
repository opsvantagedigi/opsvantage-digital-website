import React from 'react';
import {
  LucideProps,
  Plus,
  Settings,
  Eye,
  Sparkles,
  Trash2,
  ChevronRight,
  User,
  Layout,
  Globe,
  Menu,
  ArrowRight,
  CheckCircle,
  Briefcase,
} from 'lucide-react';

const iconMap = {
  plus: Plus,
  settings: Settings,
  eye: Eye,
  magic: Sparkles,
  trash: Trash2,
  chevronRight: ChevronRight,
  user: User,
  layout: Layout,
  globe: Globe,
  menu: Menu,
  arrowRight: ArrowRight,
  checkCircle: CheckCircle,
  briefcase: Briefcase,
};

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = iconMap[name];

  // Return null or a fallback if the icon name is invalid
  if (!LucideIcon) return null;

  return <LucideIcon {...props} />;
};