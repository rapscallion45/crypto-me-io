import ListIcon from '@mui/icons-material/List';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import PublicIcon from '@mui/icons-material/Public';

const navMenuItems = [
  {
    label: 'All Cryptos',
    icon: ListIcon,
    href: '/currencies/all',
    section: 1,
  },
  {
    label: 'Discover',
    icon: ManageSearchIcon,
    href: '/currencies/discover',
    section: 2,
  },
  {
    label: 'Gainers & Losers',
    icon: SsidChartIcon,
    href: '/currencies/gainers-losers',
    section: 2,
  },
  {
    label: 'High Volume',
    icon: AutoGraphIcon,
    href: '/currencies/high-volume',
    section: 2,
  },
  {
    label: 'Trending',
    icon: TrendingUpIcon,
    href: '/currencies/trending',
    section: 3,
  },
  {
    label: 'Global',
    icon: PublicIcon,
    href: '/currencies/global-charts',
    section: 3,
  },
];
export default navMenuItems;
