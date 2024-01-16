import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
  OpenAi,
  Setting,
} from "@/components/ui/social-icons/icons";

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  openai: OpenAi,
  setting: Setting,
};

type SocialIconProps = {
  kind: keyof typeof components;
  href?: string | undefined;
  size?: number;
  color?: string;
};

const SocialIcon = ({ kind, href, size = 8, color }: SocialIconProps) => {
  // if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
  //     return null

  const SocialSvg = components[kind];
  const sizeInRem = size * 0.25; // Convert Tailwind's h value to rem

  const svgElement = (
    <div>
      <span className="sr-only">{kind}</span>
      <SocialSvg
        // className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
        className={`text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400`}
        // style={{fill: color ? color : 'currentColor',width: size, height: size}}
        style={{ fill: color ? color : "currentColor", width: `${sizeInRem}rem`, height: `${sizeInRem}rem` }}
      />
    </div>
  );

  if (!href) {
    return svgElement;
  }
  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      {svgElement}
    </a>
  );
};

export default SocialIcon;
