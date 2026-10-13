

window.getCatIcon = function(c) {
  const s = 'width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"';
  if(c.includes('Terlaris')) return '<svg ' + s + '><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 2.4 5.6a4.5 4.5 0 1 1-9.9 1.4z"/></svg>';
  if(c==='Ayam') return '<svg ' + s + '><path d="M18.5 4.5a3.5 3.5 0 0 0-4.9 0L4.5 13.6a3.5 3.5 0 0 0 0 4.9 3.5 3.5 0 0 0 4.9 0l9.1-9.1a3.5 3.5 0 0 0 0-4.9z"/><path d="M13.6 9.4 18.5 14.3"/></svg>';
  if(c==='Ikan') return '<svg ' + s + '><path d="M12 10a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M22 14c0 3-4 5-10 5s-10-2-10-5 4-5 10-5 10 2 10 5z"/><path d="M2 14l-2 4h4l-2-4z"/></svg>';
  if(c==='Bebek') return '<svg ' + s + '><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>';
  if(c==='Sapi') return '<svg ' + s + '><circle cx="12.5" cy="8.5" r="2.5"/><path d="M12.5 2a6.5 6.5 0 0 0-6.22 4.6c-1.1 3.13-.78 3.9-3.18 6.08A3 3 0 0 0 5 18c4 0 8.4-1.8 11.4-4.3A6.5 6.5 0 0 0 12.5 2Z"/><path d="m18.5 6 2.19 4.5a6.48 6.48 0 0 1 .31 2 6.49 6.49 0 0 1-2.6 5.2C15.4 20.2 11 22 7 22a3 3 0 0 1-2.68-1.5b-1.16-.17"/></svg>';
  if(c==='Minuman') return '<svg ' + s + '><path d="M4 22h16"/><path d="M8 22V6"/><path d="M16 22V6"/><path d="M5 6h14"/><path d="M12 6V2"/></svg>';
  if(c==='Tambahan') return '<svg ' + s + '><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  if(c==='Semua') return '<svg ' + s + '><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';
  return '';
};

window.addLog = async function(action, description) {
    let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
    logArr.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        user: user.name || 'System',
        role: user.role || '-',
        action: action,
        description: description
    });
    await S('pos_logs', logArr);
};
window.renderLoginScreen = function() {
    let options = '<option value="owner">👑 Owner</option>';
    if (window.empArr) {
        window.empArr.filter(e => e.status==='Aktif').forEach(emp => {
            options += `<option value="emp_${emp.id}">👤 ${emp.name} (Karyawan)</option>`;
        });
    }
    document.querySelector('#app').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;width:100vw;background:url('./bg-login.png') center/cover no-repeat;background-color:#f5f0e8">
      <div style="background:rgba(255,255,255,0.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);padding:40px;border-radius:24px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25);width:90%;max-width:400px;text-align:center;border:1px solid rgba(255,255,255,0.5)">
        <img src="./logo.jpg" alt="Logo" style="width:80px;height:80px;border-radius:20px;object-fit:cover;margin:0 auto 16px;display:block;box-shadow:0 4px 12px rgba(0,0,0,0.15)">
        <h2 style="margin-bottom:8px">Login Sego Sambel Mbak Cindy</h2>
        <p style="color:var(--text-muted);margin-bottom:24px">Silakan masuk ke akun Anda</p>
        <div class="input-group" style="text-align:left"><label>Pilih Pengguna</label>
        <select id="login-user" class="input-control" style="font-size:16px">${options}</select></div>
        <div class="input-group" style="text-align:left;margin-top:16px"><label>PIN</label>
        <input type="password" id="login-pin" class="input-control" style="font-size:24px;letter-spacing:4px" placeholder="****"></div>
        <button class="btn btn-primary" style="width:100%;height:50px;margin-top:24px" onclick="handleLogin()">MASUK</button>
      </div>
    </div>`;
    document.getElementById('login-pin').addEventListener('keydown', e => { if(e.key === 'Enter') window.handleLogin(); });
};
window.handleLogin = async function() {
    let sel = document.getElementById('login-user').value;
    let pin = document.getElementById('login-pin').value;
    if(!pin) return showToast('Masukkan PIN!','error');
    if(sel === 'owner') {
        // Assume M.admin_pin exists from global or IndexedDB
        let adminPin = window.M ? window.M.admin_pin : '1234';
        if(pin === adminPin) {
            sessionStorage.setItem('pos_user', JSON.stringify({name:'Owner', role:'Owner'}));
            await addLog('Login', 'Owner berhasil login');
            window.location.reload();
        } else showToast('PIN Salah!','error');
    } else {
        let empId = sel.replace('emp_','');
        let emp = window.empArr.find(e=>e.id===empId);
        if(!emp) return showToast('Karyawan tidak ditemukan!','error');
        if(emp.pin === '1234' && pin === '1234') {
            showChangePinModal(emp);
            return;
        }
        if(pin === emp.pin) {
            sessionStorage.setItem('pos_user', JSON.stringify({name:emp.name, role:'Karyawan', id:emp.id}));
            await addLog('Login', emp.name + ' berhasil login');
            window.location.reload();
        } else showToast('PIN Salah!','error');
    }
};
window.showChangePinModal = function(emp) {
    let m = document.createElement('div');
    m.innerHTML = `
    <div class="modal-overlay active" style="z-index:9999" id="change-pin-overlay">
        <div class="modal-content" style="width:90vw;max-width:400px;text-align:center;padding:32px">
            <h2>Ganti PIN Sementara</h2>
            <p style="color:var(--text-muted);margin:12px 0 24px">Anda menggunakan PIN sementara. Silakan buat PIN baru (minimal 4 digit).</p>
            <input type="password" id="new-pin" class="input-control" placeholder="PIN Baru" style="font-size:24px;letter-spacing:4px;margin-bottom:16px;text-align:center" maxlength="6">
            <button class="btn btn-primary" style="width:100%;height:50px" onclick="confirmChangePin('${emp.id}')">Simpan & Login</button>
        </div>
    </div>`;
    document.body.appendChild(m);
};
window.confirmChangePin = async function(id) {
    let np = document.getElementById('new-pin').value;
    if(np.length < 4) return showToast('Minimal 4 digit!','error');
    let emp = window.empArr.find(e=>e.id===id);
    emp.pin = np;
    await S('pos_employees', window.empArr);
    document.getElementById('change-pin-overlay').remove();
    sessionStorage.setItem('pos_user', JSON.stringify({name:emp.name, role:'Karyawan', id:emp.id}));
    await addLog('Ganti PIN', emp.name + ' mengubah PIN pertama kali');
    await addLog('Login', emp.name + ' berhasil login');
    window.location.reload();
};
window.handleLogout = async function() {
    let user = JSON.parse(sessionStorage.getItem('pos_user')||'{}');
    if(user.name) await addLog('Logout', user.name + ' keluar aplikasi');
    sessionStorage.removeItem('pos_user');
    window.location.reload();
};
window.requireOwnerPin = function(actionName, callbackName, ...args) {
    window._pendingOwnerArgs = args;
    let m = document.getElementById('modal'), c = document.getElementById('modal-content');
    c.innerHTML = `
        <div class="modal-header"><h2>Verifikasi Owner</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p style="color:var(--text-muted);margin-bottom:12px">Aksi "<b>${actionName}</b>" memerlukan verifikasi PIN Owner.</p>
            <div class="input-group"><label>PIN Owner</label><input type="password" id="owner-verify-pin" class="input-control" placeholder="****" maxlength="8"></div>
        </div>
        <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Batal</button><button class="btn btn-primary" onclick="verifyOwnerAction('${callbackName}')">Konfirmasi</button></div>
    `;
    m.classList.add('active');
    setTimeout(() => document.getElementById('owner-verify-pin').focus(), 100);
};
window.verifyOwnerAction = function(cbName) {
    let pin = document.getElementById('owner-verify-pin').value;
    let adminPin = window.M ? window.M.admin_pin : '1234';
    if(pin === adminPin) {
        closeModal();
        if(window[cbName]) window[cbName](...(window._pendingOwnerArgs||[]));
        window._pendingOwnerArgs = null;
    } else {
        showToast('PIN Owner Salah!', 'error');
    }
};

        window.renderEmployeePage = function() {
            let e = document.getElementById("content-area");
            let thisMonth = B; // local YYYY-MM
            let activeEmps = empArr.filter(emp => emp.status === 'Aktif');
            let totalGaji = activeEmps.reduce((sum, emp) => sum + emp.salary, 0);
            
            // Hitung jumlah karyawan aktif yang SUDAH dibayar bulan ini (berbasis periode)
            let paidEmpsCount = activeEmps.filter(emp => 
                expArr.some(ex => ex.category === "Gaji Karyawan" && ex.expense_date.startsWith(thisMonth) && ex.note.includes(emp.name))
            ).length;

            let empHTML = empArr.map(emp => {
                // Status dihitung dari data Pengeluaran per BULAN (bukan permanen)
                let isPaid = expArr.some(ex => ex.category === "Gaji Karyawan" && ex.expense_date.startsWith(thisMonth) && ex.note.includes(emp.name));
                let statusBayar = isPaid ? "✅ Sudah Dibayar" : "❌ Belum Dibayar";

                // Tombol aksi dinamis
                let aksiBtn = '';
                if (isPaid) {
                    aksiBtn = `<button class="btn btn-success btn-sm" style="opacity:0.9;cursor:default" disabled>✅ Sudah Dibayar</button>
                               <button class="btn btn-outline btn-sm" onclick="window.renderSalaryHistoryPage()">Lihat Riwayat</button>`;
                } else if (emp.status === 'Aktif') {
                    aksiBtn = `<button class="btn btn-primary btn-sm" onclick="requireOwnerPin('Bayar Gaji', 'openPaySalaryModal', '${emp.id}')">💸 Bayar Gaji</button>`;
                } else {
                    aksiBtn = `<button class="btn btn-outline btn-sm" disabled>Nonaktif</button>`;
                }

                return `
                <tr>
                    <td style="font-weight: bold">${emp.name}</td>
                    <td><span class="badge" style="background:#f1f5f9;color:#475569">${emp.role}</span></td>
                    <td style="font-weight:bold;color:var(--primary)">Rp ${window.formatRupiah(emp.salary)}</td>
                    <td>
                        <div style="font-size:12px; margin-bottom:4px; font-weight:bold">${new Date().toLocaleDateString('id-ID', {month:'long', year:'numeric'})}</div>
                        <div style="font-size:13px">${statusBayar}</div>
                    </td>
                    <td style="display:flex;gap:6px;flex-wrap:wrap">
                        ${aksiBtn}
                        <button class="btn btn-danger btn-sm" onclick="requireOwnerPin('Hapus Karyawan', 'deleteEmployee', '${emp.id}')" style="font-size:10px">🗑️</button>
                    </td>
                </tr>
                `;
            }).join('');

            e.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
                    <h2>Karyawan</h2>
                    <button class="btn btn-primary" onclick="openAddEmployeeModal()">✚ Tambah Karyawan</button>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 24px">
                    <div class="card stat-card"><div class="stat-label">JUMLAH KARYAWAN</div><div class="stat-value">${activeEmps.length} Orang</div></div>
                    <div class="card stat-card"><div class="stat-label">TOTAL GAJI BULANAN</div><div class="stat-value" style="color: var(--primary)">Rp ${window.formatRupiah(totalGaji)}</div></div>
                    <div class="card stat-card"><div class="stat-label">STATUS PEMBAYARAN BULAN INI</div><div class="stat-value" style="color: var(--success); font-size: 22px">${paidEmpsCount} dari ${activeEmps.length} Sudah Dibayar</div></div>
                </div>

                <!-- Tabs -->
                <div style="display:flex; gap:16px; margin-bottom:16px; border-bottom:1px solid #ddd; padding-bottom:8px;">
                    <a href="#" style="font-weight:bold; color:var(--primary); text-decoration:none; border-bottom:2px solid var(--primary); padding-bottom:8px">Data Karyawan</a>
                    <a href="#" onclick="window.renderSalaryHistoryPage()" style="font-weight:500; color:var(--text-muted); text-decoration:none">Riwayat Gaji</a>
                </div>

                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>Nama</th><th>Jabatan</th><th>Gaji Bulanan</th><th>Status Gaji Bulan Ini</th><th>Aksi</th></tr></thead>
                        <tbody>${empArr.length === 0 ? '<tr><td colspan="5" style="text-align:center;padding:20px">Belum ada karyawan</td></tr>' : empHTML}</tbody>
                    </table>
                </div>
            `;
        };

        window.renderSalaryHistoryPage = function() {
            let e = document.getElementById("content-area");
            let gajiRiwayat = expArr.filter(ex => ex.category === "Gaji Karyawan").slice().reverse();

            e.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px">
                    <h2>Riwayat Gaji</h2>
                </div>
                <!-- Tabs -->
                <div style="display:flex; gap:16px; margin-bottom:16px; border-bottom:1px solid #ddd; padding-bottom:8px;">
                    <a href="#" onclick="window.renderEmployeePage()" style="font-weight:500; color:var(--text-muted); text-decoration:none">Data Karyawan</a>
                    <a href="#" style="font-weight:bold; color:var(--primary); text-decoration:none; border-bottom:2px solid var(--primary); padding-bottom:8px">Riwayat Gaji</a>
                </div>
                <div class="table-container">
                    <table class="data-table">
                        <thead><tr><th>Tanggal</th><th>Nama</th><th>Status Gaji Bulan Ini</th><th>Nominal</th></tr></thead>
                        <tbody>${gajiRiwayat.length === 0 ? '<tr><td colspan="4" style="text-align:center;padding:20px">Belum ada riwayat gaji</td></tr>' : gajiRiwayat.map(ex => {
                            let parts = ex.note.split(' - ');
                            let nama = parts[0] ? parts[0].replace('Gaji ', '') : '-';
                            let periode = parts[1] ? parts[1].split(' (')[0] : '-';
                            let isThisMonth = ex.expense_date.startsWith(window.B);
                            let statusIcon = isThisMonth ? '✅' : '❌';
                            let dt = ex.created_at ? new Date(ex.created_at) : new Date(ex.expense_date);
                            let formattedDate = `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;
                            return `
                            <tr>
                                <td>${formattedDate}</td>
                                <td style="font-weight:bold">${nama}</td>
                                <td style="text-align:center">
                                    <div style="font-size:18px; margin-bottom:4px">${statusIcon}</div>
                                    <span class="badge" style="background:#f1f5f9;color:#475569">${periode}</span>
                                </td>
                                <td style="font-weight:bold; color:var(--danger)">Rp ${window.formatRupiah(ex.amount)}</td>
                            </tr>`;
                        }).join('')}</tbody>
                    </table>
                </div>
            `;
        };

        window.openAddEmployeeModal = function() {
              let m = document.getElementById("modal"), c = document.getElementById("modal-content");
              c.innerHTML = `
                  <div class="modal-header"><h2>Tambah Karyawan</h2><button class="close-btn" onclick="closeModal()">×</button></div>
                  <div class="modal-body" style="display:flex;flex-direction:column;gap:16px">
                      <div class="input-group"><label>Nama Lengkap</label><input type="text" id="emp-name" class="input-control" placeholder="Contoh: Budi" required></div>
                      <div class="input-group"><label>Jabatan</label><input type="text" id="emp-role" class="input-control" placeholder="Contoh: Kasir" required></div>
                      <div class="input-group"><label>Gaji Bulanan</label><input type="text" inputmode="numeric" id="emp-salary" class="input-control" placeholder="0" oninput="window.formatInputRupiah(event)" required></div>
                      <div class="input-group"><label>PIN Karyawan (min 4 digit)</label><input type="password" id="emp-pin" class="input-control" value="1234" maxlength="6" required></div>
                      <div class="input-group"><label>Status</label><select id="emp-status" class="input-control"><option value="Aktif">Aktif</option><option value="Nonaktif">Nonaktif</option></select></div>
                  </div>
                  <div class="modal-footer"><button class="btn btn-primary" style="width:100%;height:50px" onclick="saveEmployee()">Simpan Karyawan</button></div>
              `;
              m.classList.add("active");
          };
  
          window.saveEmployee = async function() {
              let name = document.getElementById('emp-name').value;
              let role = document.getElementById('emp-role').value;
              let salary = window.parseRupiah(document.getElementById('emp-salary').value);
              let status = document.getElementById('emp-status').value;
              let pin = document.getElementById('emp-pin').value;
              if(!name || !role || salary <= 0 || pin.length < 4) return showToast('Data tidak valid! Periksa nama, peran, gaji dan PIN', 'error');
              
              let empId = Date.now().toString();
              empArr.push({id: empId, name, role, salary, status, pin});
              await S('pos_employees', empArr);
              window.addLog('Karyawan', 'Menambahkan karyawan: ' + name);
              closeModal();
              showToast('Karyawan Ditambahkan');
              window.renderEmployeePage();
          };

        window.deleteEmployee = async function(id) {
            if(confirm('Hapus karyawan ini?')) {
                empArr = empArr.filter(e => e.id !== id);
                await S('pos_employees', empArr);
                showToast('Karyawan Dihapus');
                window.renderEmployeePage();
            }
        };

        window.openPaySalaryModal = function(id) {
            let emp = empArr.find(e => e.id === id);
            if(!emp) return;
            // Cek duplikat: jika sudah dibayar bulan ini, tolak
            let thisMonth = B;
            let alreadyPaid = expArr.some(ex => ex.category === "Gaji Karyawan" && ex.expense_date.startsWith(thisMonth) && ex.note.includes(emp.name));
            if (alreadyPaid) {
                showToast('Gaji bulan ini sudah dibayar!', 'error');
                return;
            }
            let monthName = new Date().toLocaleDateString('id-ID', {month:'long', year:'numeric'});
            let m = document.getElementById("modal"), c = document.getElementById("modal-content");
            c.innerHTML = `
                <div class="modal-header"><h2>Bayar Gaji</h2><button class="close-btn" onclick="closeModal()">×</button></div>
                <div class="modal-body" style="display:flex;flex-direction:column;gap:16px">
                    <div class="input-group"><label>Nama Karyawan</label><input type="text" class="input-control" value="${emp.name}" disabled></div>
                    <div class="input-group"><label>Periode</label><input type="text" class="input-control" value="${monthName}" disabled></div>
                    <div class="input-group"><label>Nominal Gaji</label><input type="text" class="input-control" value="Rp ${window.formatRupiah(emp.salary)}" disabled></div>
                    <div class="input-group"><label>Catatan Tambahan (Opsional)</label><input type="text" id="sal-note" class="input-control" placeholder="Opsional"></div>
                </div>
                <div class="modal-footer"><button class="btn btn-primary" style="width:100%;height:50px" onclick="confirmPaySalary('${emp.id}', '${monthName}')">Konfirmasi Bayar</button></div>
            `;
            m.classList.add("active");
        };

        window.confirmPaySalary = async function(id, monthName) {
              let emp = empArr.find(e => e.id === id);
              if(!emp) return;
  
              let note = document.getElementById('sal-note').value;
              let expNote = `Pembayaran gaji bulan ${monthName} untuk ${emp.name}. ${note}`;
  
              let now = new Date();
              let localDate = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
  
              expArr.push({
                  id: Date.now().toString(),
                  expense_date: localDate, 
                  category: "Gaji Karyawan",
                  source: "Uang Tersedia",
                  amount: Math.abs(emp.salary), // Always POSITIVE
                  note: expNote.trim(),
                  created_at: now.toISOString()
              });
              await S('pos_expenses', expArr);
              window.addLog('Bayar Gaji', 'Membayar gaji ' + emp.name + ' sebesar Rp ' + window.formatRupiah(emp.salary));
              closeModal();
              showToast('Gaji Berhasil Dibayar');
              window.renderEmployeePage();
          };
window.showResetDataModal = function() {
    let m = document.getElementById('modal'), c = document.getElementById('modal-content');
    c.innerHTML = `
        <div class="modal-header"><h2 style="color:var(--danger)">⚠️ Reset Data Laporan</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <p>Apakah Anda yakin ingin mereset seluruh data laporan penjualan dan aktivitas? Tindakan ini tidak dapat dibatalkan!</p>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-danger" onclick="window.confirmResetData()">Ya, Reset Data</button>
        </div>
    `;
    m.classList.add('active');
};

window.confirmResetData = async function() {
    window.j = []; // clear transactions
    window.logArr = []; // clear logs
    await window.S('pos_transactions', window.j);
    await window.S('pos_logs', window.logArr);
    window.addLog('Reset', 'Owner melakukan reset data laporan dan aktivitas.');
    closeModal();
    showToast('Data berhasil di-reset!');
    if(typeof J === 'function') J();
};

window.openEditSambalModal = function(cartId) {
    let item = k.find(i => (i.cart_id||i.id) === cartId);
    if(!item) return;
    
    let sambalList = [
        'Sambal Pencet', 'Sambal Korek', 'Sambal Pete', 'Sambal Teri', 'Sambal Cumi',
        'Sambal Cakalang', 'Sambal Bawang', 'Sambal Bajak', 'Sambal Manis', 'Sambal Ijo'
    ];
    let levelList = ['Tidak Pedas', 'Sedang', 'Pedas', 'Extra Pedas'];
    
    let currentSambal = item.sambal || 'Sambal Pencet';
    let currentLevel = item.spicy_level || 'Pedas';

    let m = document.getElementById('modal'), c = document.getElementById('modal-content');
    c.innerHTML = `
        <div class="modal-header"><h2>Ganti Sambal & Level</h2><button class="close-btn" onclick="closeModal()">×</button></div>
        <div class="modal-body">
            <input type="hidden" id="edit-sambal-id" value="${cartId}">
            <div class="input-group">
                <label>Jenis Sambal</label>
                <select id="edit-sambal-val" class="input-control">
                    ${sambalList.map(s => `<option value="${s}" ${s === currentSambal ? 'selected' : ''}>${s}</option>`).join('')}
                </select>
            </div>
            <div class="input-group" style="margin-top:16px">
                <label>Level Pedas</label>
                <select id="edit-level-val" class="input-control">
                    ${levelList.map(l => `<option value="${l}" ${l === currentLevel ? 'selected' : ''}>${l}</option>`).join('')}
                </select>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-outline" onclick="closeModal()">Batal</button>
            <button class="btn btn-primary" onclick="window.saveEditSambal()">Simpan Perubahan</button>
        </div>
    `;
    m.classList.add('active');
};

window.saveEditSambal = function() {
    let cartId = document.getElementById('edit-sambal-id').value;
    let newSambal = document.getElementById('edit-sambal-val').value;
    let newLevel = document.getElementById('edit-level-val').value;
    
    let item = k.find(i => (i.cart_id||i.id) === cartId);
    if(item) {
        item.sambal = newSambal;
        item.spicy_level = newLevel;
        showToast('Sambal diperbarui!');
        X();
    }
    closeModal();
};
