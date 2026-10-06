import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.tsx','./components/**/*.tsx'],
 theme:{extend:{colors:{maroon:'#6D071A',royal:'#8B1020',gold:'#D4AF37',antique:'#B8902E',ivory:'#FFF8E7',ink:'#2A1713'},
 fontFamily:{display:['var(--f-serif)','serif'],tamil:['var(--f-tamil)','var(--f-deva)','serif']}}},plugins:[]} satisfies Config;
