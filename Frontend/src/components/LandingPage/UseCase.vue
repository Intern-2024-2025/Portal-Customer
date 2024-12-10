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
          <div class="box-use-case justify" v-for="useCase in useCases" :key="useCase.id">
            <div data-aos="fade-up" data-aos-delay="0">
              <img :src="useCase.image" />
              <br />
            </div>
            <h5 class="bold">{{ useCase.title }}</h5>
            <p>
              <span v-if="!useCase.expanded">{{ truncatedText(useCase.description) }}</span>
              <span v-else>{{ useCase.description }}</span>
              <button @click="toggleExpand(useCase)" class="read-more">
                {{ useCase.expanded ? "Close" : "Read More ...." }}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      useCases: [
        {
          id: 1,
          title: "Data Breach of 34 Million Passport Records (2023)",
          description:
            "A hacktivist named Bjorka stole the passport data of 34 million Indonesian citizens, which included sensitive information like names, passport numbers, and dates of birth. This raised concerns about identity theft and fraud, as the stolen data was sold on the dark web.",
          image: "../../../public/images/Home/data-leak.png",
          expanded: false,
        },
        {
          id: 2,
          title: "Cyberattacks Ahead of the 2024 Elections",
          description:
            "With Indonesia's elections approaching, the threat of cyberattacks has increased. Experts warned of potential attacks on voter data, particularly targeting the Permanent Voter List (DPT), containing sensitive personal information. Geopolitical tensions, hacktivism, and misinformation campaigns are also expected to escalate during the election period, posing risks to the integrity of the democratic process.",
          image: "../../../public/images/Home/cyber-attack.png",
          expanded: false,
        },
        {
          id: 3,
          title: "Healthcare and Social Security Data Leaks",
          description:
            "In previous years, Indonesia experienced significant data breaches, including the leak of personal data from BPJS Kesehatan (the national healthcare agency) in 2021, which affected 279 million individuals.These breaches continue to raise alarms about the security of public institutions. ",
          image: "../../../public/images/Home/medical-record.png",
          expanded: false,
        },
        {
          id: 4,
          title: "Pusat Data National Ransomware",
          description:
            "In June 2024, Indonesia's National Data Center was hit by a major ransomware attack using a variant of the LockBit 3.0 ransomware, known as Brain Cipher. The attack severely impacted over 200 government services, including immigration, passport processing, and visa systems, causing significant disruption at airports and other public services. Hackers demanded a ransom of $8 million, but the Indonesian government refused to pay. The ransomware encrypted critical systems, disabling Windows Defender and deleting essential files, which hindered recovery efforts. However, authorities were able to migrate some essential services, such as immigration, to cloud platforms like Amazon Web Services, helping to restore operations partially. This attack highlighted weaknesses in the country's cyber defenses, particularly the lack of adequate backups, which could have mitigated the impact of the ransomware. Investigations are ongoing, involving Indonesia's National Cyber and Crypto Agency (BSSN), and cyber-forensic efforts are in place to assess the full scope of the breach",
          image: "../../../public/images/Home/database.png",
          expanded: false,
        },
      ],
    };
  },
  methods: {
    truncatedText(text) {
      const maxLength = 150; // Panjang maksimal teks sebelum dipotong
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    },
    toggleExpand(useCase) {
      useCase.expanded = !useCase.expanded;
    },
  },
};
</script>


<style>
.oke-wrapper-use-case {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.box-use-case {
  text-align: center;
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

.read-more {
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9em;
  margin-top: 10px;
}

.read-more:hover {
  text-decoration: underline;
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
