<template>
  <div class="coming-soon">
    <div class="overlay">
      <div class="content">
        <img
          src="../../assets/images/logo/logo putih sandhiguna.png"
          alt="Logo"
          class="logo"
        />
        <h1>Our website is almost ready.</h1>
        <p class="message">
          Dear users,<br />
          Our website is currently undergoing essential repairs and updates to
          enhance your experience.<br />
          We are working diligently to resolve the issues and expect to be back
          online shortly.<br />
          Thank you for your patience and understanding.
        </p>
        <p class="contact-info">
          For any enquires/assistance, please feel free to reach out to Ayu at
          <a href="https://wa.me/6281908824046" class="contact-maintenance"> (+62) 819-0882-4046 </a><br />
          or email <a href="mailto:ayu@sandhiguna.com" class="contact-maintenance">ayu@sandhiguna.com</a>.
        </p>
        <p class="signature">
          Best regards,<br />
          SANDHIGUNA<br />
          Secure Today. Safe Tomorrow.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Full page background */
.coming-soon {
  background-image: url("../../../public/images/Home/pawel-czerwinski-tMbQpdguDVQ-unsplash.jpg"); /* Path gambar background */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

/* Overlay untuk memberikan efek gelap pada background */
.overlay {
  background-color: rgba(0, 0, 0, 0); /* Transparansi overlay */
  padding: 50px;
  border-radius: 15px;
  text-align: center;
}

.contact-maintenance {
  color: white;
  font-size: 16px;
}

/* Styling logo */
.logo {
  max-width: 150px;
  margin-bottom: 20px;
}

/* Styling untuk heading */
h1 {
  font-size: 36px;
  margin-bottom: 20px;
  font-weight: bold;
  color: white;
}

/* Pesan utama */
.message {
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.6;
}

/* Informasi kontak */
.contact-info {
  font-size: 14px;
  margin-bottom: 30px;
  line-height: 1.5;
  font-weight: bold;
}

/* Tanda tangan dan ucapan penutup */
.signature {
  font-size: 16px;
  font-weight: bold;
}
</style>
