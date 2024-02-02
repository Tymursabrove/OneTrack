import { Icons } from './IconResources';
export const menus = [
	{
		heading: null,
		links: [
			{
				title: 'Home',
				svg: Icons.houseFilledIcon,
				//href: '/', 
				href: '',
				isInBeta: false,
				showBadge: true
			}
		]
	},
	{
		heading: 'Attribution',
		links: [
			{
				title: 'Overview',
				svg: Icons.overviewAnalysisIcon,
				//href: '/attribution',
				href: '',
				isInBeta: false,
				showBadge: true
			},
			{
				title: 'Events',
				svg: Icons.shoppingCartIcon,
				href: '/attribution/events',
				isInBeta: true,
				showBadge: true
			},
			{
				title: 'Meta',
				svg: Icons.metaBlackLogoIcon,
				href: '/attribution/meta',
				isInBeta: true,
				showBadge: true
			},
			{
				title: 'TikTok',
				svg: Icons.tiktokBlackIcon,
				href: '/attribution/tiktok',
				isInBeta: true,
				showBadge: true
			},
			{
				title: 'Google',
				svg: Icons.googleAdsBlack,
				href: '/attribution/google',
				isInBeta: true,
				showBadge: true
			},
		]
	},
	{
		heading: 'Tracking',
		links: [
			{
				title: 'Connections',
				svg: Icons.networkIcon,
				href: '/tracking/connections'
			}
		]
	},
	{
		heading: 'Analysis',
		links: [
			{
				title: 'Customer Profiles',
				svg: Icons.threeCustomersSymbolIcon,
				href: '/analysis/customer-profiles'
			}
		]
	},
	{
		heading: 'Settings',
		links: [
			{
				title: 'UTM Builder',
				svg: Icons.threeCubesIcon,
				href: '/utm-builder'
			}
		]
	},
	{
		heading: 'Help Center',
		links: [
			{
				title: 'Help & Support',
				svg: Icons.headphones,
				href: '/help'
			}
		]
	}
];
