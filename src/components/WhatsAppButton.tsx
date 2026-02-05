import React from 'react';

interface Props {
  phone: string;
  message?: string; // optional default message
}

const WhatsAppButton: React.FC<Props> = ({ phone, message }) => {
  const encodedMessage = encodeURIComponent(message || 'Halo Cobamulai, saya ingin bertanya.');
  return (
    <a
      href={`https://wa.me/${phone}?text=${encodedMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
      title="Chat via WhatsApp"
    >
      💬
    </a>
  );
};

export default WhatsAppButton;