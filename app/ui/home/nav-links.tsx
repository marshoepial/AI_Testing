'use client'

import React from 'react';
import { FaCheckCircle, FaTachometerAlt, FaShieldAlt, FaBalanceScale } from 'react-icons/fa';
import { AiOutlineGateway } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Functional', href: '/home', icon: FaCheckCircle },
  {
    name: 'Performance',
    href: '/home/performance',
    icon: FaTachometerAlt,
  },
  { name: 'Interoperability', href: '/home/interoperability', icon: AiOutlineGateway },
  { name: 'Security', href: '/home/security', icon: FaShieldAlt },
  { name: 'Load & Stress', href: '/home/load-stress', icon: FaBalanceScale },
];

export default function NavLinks() {
  const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-md font-medium hover:bg-red-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-red-100 text-red-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" size={40} />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
