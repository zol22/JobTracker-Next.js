import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaThreads, FaTwitter, FaXTwitter, FaYoutube } from "react-icons/fa6";

export const getPlatformIconByName = (platformName: string): React.JSX.Element | null => {
    switch (platformName) {
        case 'facebook': {
            return <FaFacebook size={24}  />;
        }
        case 'github': {
            return <FaGithub size={24} />;
        }
        case 'instagram': {
            return <FaInstagram size={24}  />;
        }
        case 'linkedin': {
            return <FaLinkedin size={24} />;
        }
        case 'threads': {
            return <FaThreads size={24} />;
        }
        case 'twitter': {
            return <FaTwitter size={24}  />;
        } 
        case 'youtube': {
            return <FaYoutube size={24}  />;
        }
        case 'x': {
            return <FaXTwitter size={24}  />;
        }
        default:
            console.log('Platform name not supported, no icon is returned:', platformName);
            return null;
    }
}