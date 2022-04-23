import React from 'react';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer>
          <div className='logoTitle'>
            <h2>BoPods</h2>
            <p>Аксессуары для вашего iPhone</p>
          </div>
        <div className="social">
            <ul>
                <li>WhatsApp</li>
                <li>Telegram</li>
                <li>Vkontakte</li>
                <li>Instagram</li>
            </ul>
        </div>
    </footer>
  )
};
