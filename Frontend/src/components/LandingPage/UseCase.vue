<template>
  <div class="untree_co-section" style="background-color: #141c2c;">
    <div class="container">
      <div class="row pricing-title">
        <div class="col-12 text-center">
          <h2 class="heading" style="color: white; font-weight: bold;">Use Cases</h2>
          <p style="color: white;">How Athena-KMS Helps Your Business</p>
        </div>
      </div>
      <div class="col-lg-12">
        <p class="industries">By Industries</p>
        <div class="oke-wrapper-use-case">
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/financial-statement.png" />
              <br />
            </div>
            <h5 class="bold">Financial Services</h5>
            <p>
              Data protection solutions for banking and financial institutions
            </p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/healthcare.png" />
              <br />
            </div>
            <h5 class="bold">Healthcare</h5>
            <p>Protection of patient data and HIPAA compliance</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/government-building.png" alt="Government Building"/>
              <br />
            </div>
            <h5 class="bold">Government</h5>
            <p>Meeting government security standards and data policies</p>
          </div>
          <div class="box-use-case">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                src="../../../public/images/Home/ecommerce.png"
              />
              <br />
              <!-- style="width: 300; height: 100px; border-radius: 5px" -->
            </div>
            <h5 class="bold">Retail & E-commerce</h5>
            <p>Secure customer data and transaction details</p>
          </div>
        </div>
        <h6 class="current-issue">
          <p style="font-weight: bold;">By Current Issues</p>
          <p style="color:azure;"><br />In 2023 and 2024, Indonesia faced several
          significant cybercrime incidents, highlighting its growing
          vulnerability to cyber threats as the country becomes increasingly
          digital.</p>
        </h6>
        <div class="oke-wrapper-use-case">
          <div class="box-use-case justify">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/data-leak.png" />
              <br />
            </div>
            <h5 class="bold">
              Data Breach of 34 Million Passport Records (2023)
            </h5>
            <p>
              A hacktivist named Bjorka stole the passport data of 34 million Indonesian citizens, which included sensitive information like names, passport numbers, and dates of birth. 
            <br><br>
            This raised concerns about identity theft and fraud, as the stolen data was sold on the dark web.</p>
          </div>
          <div class="box-use-case justify">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/cyber-attack.png" />
              <br />
            </div>
            <h5 class="bold">Cyberattacks Ahead of the 2024 Elections</h5>
            <p>With Indonesia's elections approaching, the threat of cyberattacks has increased. Experts warned of potential attacks on voter data, particularly targeting the Permanent Voter List (DPT), containing sensitive personal information. 
            <br><br>
            Geopolitical tensions, hacktivism, and misinformation campaigns are also expected to escalate during the election period, posing risks to the integrity of the democratic process.
          </p>
          </div>
          <div class="box-use-case justify">
            <div data-aos="fade-up" data-aos-delay="0">
              <img src="../../../public/images/Home/medical-record.png" />
              <br />
            </div>
            <h5 class="bold">Healthcare and Social Security Data Leaks</h5>
            <p>In previous years, Indonesia experienced significant data breaches, including the leak of personal data from BPJS Kesehatan (the national healthcare agency) in 2021, which affected 279 million individuals. 
            <br><br>
            These breaches continue to raise alarms about the security of public institutions.
            </p>
          </div>
          <div class="box-use-case justify">
            <div data-aos="fade-up" data-aos-delay="0">
              <img
                src="../../../public/images/Home/database.png"
                />
              <br />
              <!-- style="width: 300; height: 100px; border-radius: 5px" -->
            </div>
            <h5 class="bold">Pusat Data National Ransomware</h5>
            <p>In June 2024, Indonesia's National Data Center was hit by a major ransomware attack using a variant of the LockBit 3.0 ransomware, known as Brain Cipher. The attack severely impacted over 200 government services, including immigration, passport processing, and visa systems, causing significant disruption at airports and other public services. Hackers demanded a ransom of $8 million, but the Indonesian government refused to pay.
            <br> <br>
            The ransomware encrypted critical systems, disabling Windows Defender and deleting essential files, which hindered recovery efforts. However, authorities were able to migrate some essential services, such as immigration, to cloud platforms like Amazon Web Services, helping to restore operations partially.
            <br><br>
            This attack highlighted weaknesses in the country's cyber defenses, particularly the lack of adequate backups, which could have mitigated the impact of the ransomware. Investigations are ongoing, involving Indonesia's National Cyber and Crypto Agency (BSSN), and cyber-forensic efforts are in place to assess the full scope of the breach
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.oke-wrapper-use-case {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Membuat 3 kolom dengan lebar sama */
  gap: 10px; /* Menambah jarak antar elemen */
}

.box-use-case {
  text-align: center; /* Posisikan teks di tengah setiap elemen */
  padding: 15px;
  background: white;
  border-radius: 5px;
  color: #141c2c;
}
.box-use-case img {
  width: 75px;
  height: 75px;
  border-radius: 5px;
}
.justify p{
  text-align: justify;
  padding: 20px;
}
.bold {
  font-weight: bold;
  padding-top: 20px;
}
.current-issue {
  padding-top: 130px;
  text-align: center;
  color: white;
}
.industries {
  text-align: center;
  color: white;
  font-weight:bolder;
}

/* Media query untuk layar lebih kecil */
@media (max-width: 991px) {
  .oke-wrapper {
    grid-template-columns: repeat(2, 1fr); /* 2 kolom untuk layar sedang */
  }
}

@media (max-width: 768px) {
  .oke-wrapper {
    grid-template-columns: 1fr; /* 1 kolom untuk layar kecil */
  }
}
</style>
