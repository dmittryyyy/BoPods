import React from 'react';

import './Footer.scss';

export const Footer = () => {
  return (
    <footer>
          <div className='logoTitle'>
            <img src="/images/footer/logoFooter.png" alt="Логотип" />
            <p>Аксессуары для вашего iPhone</p>
          </div>
        <div className="social">
            <ul>
                <a href="https://www.instagram.com/bo_pods/"><img src="/images/footer/whatsIcon.png" alt="WhatsApp" /></a>
                <a href=""><img src="/images/footer/telegIcon.png" alt="Telegram" /></a>
                <a href=""><img src="/images/footer/instIcon.png" alt="Instagram" /></a>
            </ul>
        </div>
    </footer>
  )
};
