// js/script.js
(function() {
  const STORAGE_KEY = 'panel_listings';
 const defaultListings = [
  { 
    id: 'p1',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 17/19 P MODEL',
    ukuran: 19,
    resolusi: 'HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-17-19.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p2',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 21/22/27 S MODEL',
    ukuran: 27,
    resolusi: 'HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-21-22-27.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p3',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 24 P2 MODEL',
    ukuran: 24,
    resolusi: 'HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-24.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p4',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 32 ANDROID',
    ukuran: 32,
    resolusi: 'HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-32.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p5',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 40 ANDROID',
    ukuran: 40,
    resolusi: 'FULL HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-40.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p6',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 43 ANDROID',
    ukuran: 43,
    resolusi: 'FULL HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-43.jpg',
    wa: '6285217464040',
    socket: 'single'
  },

  { 
    id: 'p7',
    merk: 'FAWS / GRADO',
    tipe: 'LED TV 17/20 U MODEL',
    ukuran: 20,
    resolusi: 'HD',
    kondisi: 'baru',
    stok: 500,
    harga: "Negotiable",
    foto: 'images/led-17-20.jpg',
    wa: '6285217464040',
    socket: 'single'
  }
];

  function loadListings() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return defaultListings; }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultListings));
      return defaultListings;
    }
  }
  console.log("Form penawaran dikirim:", new Date());

  let listings = loadListings();
  const homeSection = document.getElementById('homeSection');
  const profileSection = document.getElementById('profileSection');
  const listingContainer = document.getElementById('listingContainer');
  const emptyMsg = document.getElementById('emptyMessage');
  const filterUkuran = document.getElementById('filterUkuran');
  const filterKondisi = document.getElementById('filterKondisi');

  function renderListings() {
    const ukuranFilter = filterUkuran.value;
    const kondisiFilter = filterKondisi.value;
    const filtered = listings.filter(item => {
      if (kondisiFilter !== 'all' && item.kondisi !== kondisiFilter) return false;
      if (ukuranFilter !== 'all') {
        const size = item.ukuran;
        if (ukuranFilter === 'kecil' && size >= 32) return false;
        if (ukuranFilter === 'sedang' && (size < 32 || size >= 50)) return false;
        if (ukuranFilter === 'besar' && size < 50) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      listingContainer.innerHTML = '';
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      let html = '';
      filtered.forEach(item => {
        html += `
          <div class="card" data-id="${item.id}">
            <div class="card-img">${item.foto ? `<img src="${item.foto}" alt="panel">` : '<span>📷 Gambar opsional</span>'}</div>
            <div class="card-content">
              <div class="card-title"><span class="merk">${item.merk}</span> <span>${item.tipe}</span></div>
              <div class="card-specs">
                <span>🔲 ${item.ukuran}"</span><span>📺 ${item.resolusi}</span><span>⚙️ ${item.kondisi}</span>
              </div>
              <div class="card-footer">
                <span class="harga">${typeof item.harga === 'number' ? 'Rp ' + item.harga.toLocaleString('id-ID') : item.harga}</span>
                <span class="stok">stok ${item.stok}</span>
              </div>
            </div>
          </div>
        `;
      });
      listingContainer.innerHTML = html;
    }
  }
  const ctaButton = document.querySelector('.cta-button') || document.querySelector('.hero-btn-primary');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      // Keep anchor default behavior for in-page links, but smooth-scroll consistently.
      e.preventDefault();
      document.querySelector('#formSection')?.scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
  // Modal
  const modal = document.getElementById('detailModal');
  const modalMerk = document.getElementById('modalMerk');
  const modalDetail = document.getElementById('modalDetailContainer');
  const modalWa = document.getElementById('modalWaBtn');
  const closeModal = document.getElementById('closeModal');
  function openDetail(id) {
    const item = listings.find(l => l.id === id);
    if (!item) return;
    modalMerk.innerText = item.merk + ' ' + item.tipe;
    modalDetail.innerHTML = `
      <div class="detail-field"><span class="detail-label">Tipe Panel</span><span class="detail-value">${item.tipe}</span></div>
      <div class="detail-field"><span class="detail-label">Ukuran</span><span class="detail-value">${item.ukuran}"</span></div>
      <div class="detail-field"><span class="detail-label">Resolusi</span><span class="detail-value">${item.resolusi}</span></div>
      <div class="detail-field"><span class="detail-label">Kondisi</span><span class="detail-value">${item.kondisi}</span></div>
      <div class="detail-field"><span class="detail-label">Stok</span><span class="detail-value">${item.stok} pcs</span></div>
<div class="detail-field"><span class="detail-label">Harga/unit</span><span class="detail-value">${typeof item.harga === 'number' ? 'Rp ' + item.harga.toLocaleString('id-ID') : item.harga}</span></div>      <div class="detail-field"><span class="detail-label">Socket</span><span class="detail-value">Single socket (sesuai syarat)</span></div>
    `;
    modalWa.onclick = () => {
      const wa = item.wa;
      const msg = `Halo, saya tertarik dengan panel ${item.merk} ${item.tipe} ukuran ${item.ukuran}" (${item.kondisi}) stok ${item.stok} pcs. Apakah masih tersedia?`;
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
    };
    modal.classList.add('active');
  }
  closeModal.addEventListener('click', () => modal.classList.remove('active'));
  window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });

  // Navigation
  const navLinks = document.querySelectorAll('.nav-link');
  function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));
    if (sectionId === 'home') {
      homeSection.classList.add('active');
      document.querySelector('[data-section="home"]').classList.add('active');
      renderListings();
    } else {
      profileSection.classList.add('active');
      document.querySelector('[data-section="profile"]').classList.add('active');
       setTimeout(() => {
        if (window.AOS) {
          AOS.refresh();
        }
      }, 150);
    }
  }
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showSection(link.getAttribute('data-section'));
    });
  });

  // ========== FORM SUBMISSION (DIPERBAIKI) ==========
  const penawaranForm = document.getElementById('penawaranForm');
  const formFeedback = document.getElementById('formFeedback');
  const submitBtn = penawaranForm ? penawaranForm.querySelector('.submit-btn') : null;

  if (penawaranForm) {
    penawaranForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validasi ukuran file (maks 1 MB untuk free plan Netlify)
      const fileInput = penawaranForm.querySelector('input[name="fotoPanel"]');
      if (fileInput.files.length > 0 && fileInput.files[0].size > 1_000_000) {
        formFeedback.innerHTML = 'Ukuran file maksimal 1 MB. Silakan kompres file Anda.';
        formFeedback.classList.add('error');
        setTimeout(() => {
          formFeedback.innerHTML = '';
          formFeedback.classList.remove('error');
        }, 4000);
        return;
      }

      // Tampilkan loading pada tombol
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Mengirim...';
      submitBtn.disabled = true;

      // Gunakan FormData langsung (mendukung file upload)
      const formData = new FormData(penawaranForm);
      formData.set('form-name', penawaranForm.getAttribute('name') || 'panelPenawaran');

      // Bersihkan format harga (hapus titik) sebelum dikirim
        const hargaInput = penawaranForm.querySelector('input[name="hargaUnit"]');
          if (hargaInput) {
            let hargaValue = hargaInput.value;
           // Hapus semua titik (pemisah ribuan) dan karakter non-digit lainnya
            let cleanHarga = hargaValue.replace(/\./g, '');
           // Timpa nilai di FormData dengan yang sudah dibersihkan
        formData.set('hargaUnit', cleanHarga);
}

      try {
        const endpoint = penawaranForm.getAttribute('action') || window.location.pathname;
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData, // Jangan set Content-Type, biarkan browser mengatur boundary
        });

        if (response.ok) {
          formFeedback.innerHTML = 'Terima kasih, tim kami akan menghubungi Anda melalui WhatsApp jika sesuai kriteria.';
          formFeedback.classList.add('success');
          penawaranForm.reset();

          setTimeout(() => {
            formFeedback.innerHTML = '';
            formFeedback.classList.remove('success');
          }, 5000);
        } else {
          const errorText = await response.text();
          console.error('Netlify error:', response.status, errorText);
          throw new Error(`Gagal mengirim form (HTTP ${response.status})`);
        }
      } catch (error) {
        console.error('Error:', error);
        if (window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          formFeedback.innerHTML = 'Form Netlify tidak bisa diuji penuh di local. Coba setelah deploy ke domain Netlify.';
        } else {
          formFeedback.innerHTML = 'Maaf, terjadi kesalahan. Silakan coba lagi.';
        }
        formFeedback.classList.add('error');
        setTimeout(() => {
          formFeedback.innerHTML = '';
          formFeedback.classList.remove('error');
        }, 4000);
      } finally {
        // Kembalikan tombol ke keadaan semula
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  const fotoInput = document.querySelector("input[name='fotoPanel']");
    if (fotoInput) {
      fotoInput.addEventListener("change", function(){
        const file = this.files[0];
         if(file){
          console.log("Foto dipilih:", file.name);
    }
  });
}

  filterUkuran.addEventListener('change', renderListings);
  filterKondisi.addEventListener('change', renderListings);
  listingContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openDetail(card.dataset.id);
  });
  // ambil input harga
const priceInput = document.getElementById("price");

// fungsi format rupiah
function formatRupiah(angka) {
    let numberString = angka.replace(/[^,\d]/g, "").toString();
    let split = numberString.split(",");
    let sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    let ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        let separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
}

priceInput.addEventListener("input", function(e) {
    let value = e.target.value;

    if (value) {
        e.target.value = formatRupiah(value);
    }
});
  showSection('home');
})();

