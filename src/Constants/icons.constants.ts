import {
  faTruck,
  faGift,
  faPhone,
  faEnvelope,
  faUser,
  faUserPlus,
  faCartShopping,
  faMagnifyingGlass,
  faHeadset,
  faHeart,
  faChevronDown,
  faBars,
  faXmark,
  faCodeCompare,
  faArrowRightFromBracket,
  faLocationDot,
  faCheckCircle,
  faLeaf,
  faTruckFast,
  faShield,
  faStar,
  faEye,
  faEyeSlash,
  faSpinner,
  faClockRotateLeft,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faXTwitter,
  faInstagram,
  faYoutube,
  faGoogle,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

/**
 * Centralized Font Awesome icons.
 */
export const ICONS = {
  // Common icons
  common: {
    phone: faPhone,
    envelope: faEnvelope,
    user: faUser,
    userPlus: faUserPlus,
    cart: faCartShopping,
    search: faMagnifyingGlass,
    heart: faHeart,
    chevronDown: faChevronDown,
    bars: faBars,
    xmark: faXmark,
    spinner: faSpinner,
    eye: faEye,
    eyeSlash: faEyeSlash,
    star: faStar,
    check: faCheckCircle,
  },
  
  // Navbar specific icons
  navbar: {
    truck: faTruck,
    gift: faGift,
    headset: faHeadset,
    compare: faCodeCompare,
    logout: faArrowRightFromBracket,
  },
  
  // Footer specific icons
  footer: {
    location: faLocationDot,
    facebook: faFacebookF,
    twitter: faXTwitter,
    instagram: faInstagram,
    youtube: faYoutube,
    linkedin: faLinkedin,
    github: faGithub,
  },
  
  // Auth specific icons
  auth: {
    google: faGoogle,
    facebook: faFacebookF,
    leaf: faLeaf,
    truckFast: faTruckFast,
    shield: faShield,
    clock: faClockRotateLeft,
    tag: faTag,
  },
} as const;
