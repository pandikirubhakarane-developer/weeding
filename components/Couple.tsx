'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { wedding as w } from '@/config/wedding';
export default function Couple({ reduce, small }: { reduce: boolean; small?: boolean }) {
  const d = reduce ? 0 : 1.1;
  const cls = small ? 'h-72' : 'h-[58svh] min-h-[360px]';
  return (
    <div className={`relative z-0 mx-auto flex w-full max-w-md items-end justify-center ${cls}`}>
      <motion.div className="relative h-full w-1/2" initial={{ x: reduce ? 0 : -90, opacity: 0 }} whileInView={{ x: 8, opacity: 1 }} viewport={{ once: true }} transition={{ duration: d, delay: 0.2 }}>
        <Image src="/images/groom.webp" alt={`Illustration of ${w.groomName}`} fill priority={!small} sizes="220px" className="object-contain object-bottom" />
      </motion.div>
      <motion.div className="relative h-full w-1/2" initial={{ x: reduce ? 0 : 90, opacity: 0 }} whileInView={{ x: -8, opacity: 1 }} viewport={{ once: true }} transition={{ duration: d, delay: 0.2 }}>
        <Image src="/images/bride.webp" alt={`Illustration of ${w.brideName}`} fill priority={!small} sizes="220px" className="object-contain object-bottom" />
      </motion.div>
    </div>
  );
}
