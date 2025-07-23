import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export type SupportedBrand = { name: string; path: string };
export const supportedBrands: SupportedBrand[] = [
	{ name: 'Sony', path: 'sony' }
	// { name: 'Canon', path: 'canon' },
	// { name: 'Nikon', path: 'nikon' },
	// { name: 'Fujifilm', path: 'fuji' },
	// { name: 'Panasonic', path: 'psonic' }
];

export const baseRoutes = {
	app: '/',
	supportedDevices: '/supported',
	faq: '/faq',
	about: '/about',
	github: 'https://github.com/chathura-de-silva/Shuttersnap'
} as const;
