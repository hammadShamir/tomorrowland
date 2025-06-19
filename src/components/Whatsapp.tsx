import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { data } from '@/data';

const Whatsapp = () => {
    // Find the WhatsApp URL from socialLinks
    const whatsappLink = data.socialLinks.find(link => link.iconType === 'whatsapp')?.url || '';
    
    // Conditionally render the component if whatsappLink is present
    if (!whatsappLink) {
        return null;
    }

    return (
        <Link 
            href={whatsappLink}
            className="fixed bottom-5 right-5 z-50 shadow-md rounded-full"
        >
            <Image
                src="/whatsapp-icon.png"
                alt="Whatsapp"
                width={50}
                height={50}
                className="shadow-lg rounded-full"
            />
        </Link>
    );
};

export default Whatsapp;
