import { firebaseConfig, firebaseReady } from './firebase-config.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';

const $ = selector => document.querySelector(selector);
const loginView = $('#login-view');
const dashboardView = $('#dashboard-view');
const loginForm = $('#login-form');
const loginButton = $('#login-button');
const loginMessage = $('#login-message');
const setupAlert = $('#setup-alert');
const loadingState = $('#loading-state');
const emptyState = $('#empty-state');
const tableBody = $('#client-table-body');
const panelMessage = $('#panel-message');
const clientDialog = $('#client-dialog');
const clientForm = $('#client-form');
const clientFormMessage = $('#client-form-message');
const deleteDialog = $('#delete-dialog');
const statusFilter = $('#status-filter');
const searchInput = $('#client-search');
const saveButton = $('#save-client');
const confirmDeleteButton = $('#confirm-delete');
const toastElement = $('#toast');

let auth = null;
let db = null;
let unsubscribeClients = null;
let clients = [];
let deleteTarget = null;
let toastTimer = null;

const statusLabels = {
  contactado: 'Contactado',
  cotizando: 'Cotizando',
  activo: 'Activo',
  finalizado: 'Finalizado'
};

const money = value => new Intl.NumberFormat('es-PE', {
  style: 'currency', currency: 'PEN', maximumFractionDigits: 2
}).format(Number(value || 0));

const dateText = value => {
  if (!value) return '—';
  if (typeof value.toDate === 'function') {
    return new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(value.toDate());
  }
  const date = new Date(`${value}T12:00:00`);
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('es-PE', { dateStyle: 'medium' }).format(date);
};

function toast(message) {
  clearTimeout(toastTimer);
  toastElement.textContent = message;
  toastElement.classList.add('is-visible');
  toastTimer = setTimeout(() => toastElement.classList.remove('is-visible'), 2800);
}

function friendlyError(error) {
  const code = error?.code || '';
  if (code.includes('auth/invalid-credential') || code.includes('auth/wrong-password') || code.includes('auth/user-not-found')) return 'Correo o contraseña incorrectos.';
  if (code.includes('auth/too-many-requests')) return 'Demasiados intentos. Espera un momento y vuelve a intentar.';
  if (code.includes('auth/network-request-failed')) return 'No se pudo conectar con Firebase. Revisa tu internet.';
  if (code.includes('permission-denied')) return 'Firebase bloqueó el acceso. Revisa tu UID en firestore.rules y publica las reglas.';
  return 'Ocurrió un problema. Revisa la configuración de Firebase e inténtalo otra vez.';
}

function setLoginBusy(busy) {
  loginButton.disabled = busy || !firebaseReady;
  loginButton.querySelector('span').textContent = busy ? 'Entrando…' : 'Entrar al panel';
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
}

function showDashboard(user) {
  loginView.hidden = true;
  dashboardView.hidden = false;
  $('#admin-email').textContent = user.email || 'Administrador';
  $('#admin-avatar').textContent = (user.email || 'R').trim().charAt(0).toUpperCase();
}

function normalize(value) {
  return String(value || '').toLocaleLowerCase('es-PE').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filteredClients() {
  const term = normalize(searchInput.value.trim());
  const status = statusFilter.value;
  return clients.filter(client => {
    const matchesStatus = status === 'todos' || client.estado === status;
    const haystack = normalize([client.nombre, client.telefono, client.email, client.direccion, client.servicio].join(' '));
    return matchesStatus && (!term || haystack.includes(term));
  });
}

function updateStats() {
  $('#stat-total').textContent = String(clients.length);
  $('#stat-active').textContent = String(clients.filter(client => client.estado === 'activo').length);
  $('#stat-followup').textContent = String(clients.filter(client => ['contactado', 'cotizando'].includes(client.estado)).length);
  $('#stat-value').textContent = money(clients.reduce((sum, client) => sum + Number(client.precio || 0), 0)).replace('PEN', 'S/');
}

function renderClients() {
  const list = filteredClients();
  updateStats();
  tableBody.replaceChildren();
  loadingState.hidden = true;

  if (!list.length) {
    emptyState.hidden = false;
    $('#empty-title').textContent = clients.length ? 'No encontramos coincidencias.' : 'Aún no tienes clientes registrados.';
    $('#empty-copy').textContent = clients.length ? 'Prueba otra búsqueda o cambia el filtro.' : 'Añade el primero y aparecerá aquí.';
    $('#empty-add').hidden = Boolean(clients.length);
    return;
  }
  emptyState.hidden = true;

  list.forEach(client => {
    const tr = document.createElement('tr');

    const clientTd = document.createElement('td');
    clientTd.innerHTML = `<div class="client-cell"><strong></strong><span></span></div>`;
    clientTd.querySelector('strong').textContent = client.nombre || 'Sin nombre';
    clientTd.querySelector('span').textContent = client.direccion || 'Sin ubicación';

    const contactTd = document.createElement('td');
    contactTd.innerHTML = `<div class="contact-cell"><strong></strong><span></span></div>`;
    contactTd.querySelector('strong').textContent = client.telefono || '—';
    contactTd.querySelector('span').textContent = client.email || 'Sin correo';

    const serviceTd = document.createElement('td');
    serviceTd.innerHTML = `<div class="service-cell"><strong></strong><span></span></div>`;
    serviceTd.querySelector('strong').textContent = client.servicio || '—';
    serviceTd.querySelector('span').textContent = client.fechaInstalacion ? `Instalación: ${dateText(client.fechaInstalacion)}` : 'Fecha por definir';

    const statusTd = document.createElement('td');
    const pill = document.createElement('span');
    pill.className = `status-pill status-${client.estado || 'contactado'}`;
    pill.textContent = statusLabels[client.estado] || 'Contactado';
    statusTd.append(pill);

    const priceTd = document.createElement('td');
    priceTd.className = 'money';
    priceTd.textContent = money(client.precio || 0).replace('PEN', 'S/');

    const dateTd = document.createElement('td');
    dateTd.textContent = dateText(client.creadoEn);

    const actionsTd = document.createElement('td');
    actionsTd.innerHTML = '<div class="row-actions"><button class="row-action edit" type="button" title="Editar cliente" aria-label="Editar cliente">✎</button><button class="row-action delete" type="button" title="Eliminar cliente" aria-label="Eliminar cliente">×</button></div>';
    actionsTd.querySelector('.edit').addEventListener('click', () => openClientDialog(client));
    actionsTd.querySelector('.delete').addEventListener('click', () => openDeleteDialog(client));

    tr.append(clientTd, contactTd, serviceTd, statusTd, priceTd, dateTd, actionsTd);
    tableBody.append(tr);
  });
}

function subscribeToClients() {
  if (unsubscribeClients) unsubscribeClients();
  loadingState.hidden = false;
  panelMessage.textContent = '';
  const clientsQuery = query(collection(db, 'clientes'), orderBy('creadoEn', 'desc'));
  unsubscribeClients = onSnapshot(clientsQuery, snapshot => {
    clients = snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    renderClients();
  }, error => {
    loadingState.hidden = true;
    emptyState.hidden = true;
    panelMessage.textContent = friendlyError(error);
  });
}

function clearClientForm() {
  clientForm.reset();
  $('#client-id').value = '';
  $('#client-status').value = 'contactado';
  $('#client-service').value = 'Automatización de puerta';
  clientFormMessage.textContent = '';
}

function openClientDialog(client = null) {
  clearClientForm();
  if (client) {
    $('#dialog-kicker').textContent = 'EDITAR REGISTRO';
    $('#dialog-title').textContent = 'Editar cliente';
    $('#client-id').value = client.id;
    $('#client-name').value = client.nombre || '';
    $('#client-phone').value = client.telefono || '';
    $('#client-email').value = client.email || '';
    $('#client-address').value = client.direccion || '';
    $('#client-service').value = client.servicio || 'Automatización de puerta';
    $('#client-status').value = client.estado || 'contactado';
    $('#client-price').value = client.precio ?? '';
    $('#client-install-date').value = client.fechaInstalacion || '';
    $('#client-notes').value = client.notas || '';
  } else {
    $('#dialog-kicker').textContent = 'NUEVO REGISTRO';
    $('#dialog-title').textContent = 'Registrar cliente';
  }
  clientDialog.showModal();
  setTimeout(() => $('#client-name').focus(), 30);
}

function closeClientDialog() {
  if (clientDialog.open) clientDialog.close();
}

function clientPayload() {
  return {
    nombre: $('#client-name').value.trim(),
    telefono: $('#client-phone').value.trim(),
    email: $('#client-email').value.trim(),
    direccion: $('#client-address').value.trim(),
    servicio: $('#client-service').value,
    estado: $('#client-status').value,
    precio: Number($('#client-price').value || 0),
    fechaInstalacion: $('#client-install-date').value || '',
    notas: $('#client-notes').value.trim(),
    actualizadoEn: serverTimestamp()
  };
}

async function saveClient(event) {
  event.preventDefault();
  clientFormMessage.textContent = '';
  if (!clientForm.reportValidity()) return;
  const payload = clientPayload();
  if (!payload.nombre || !payload.telefono) {
    clientFormMessage.textContent = 'Nombre y teléfono son obligatorios.';
    return;
  }
  if (!Number.isFinite(payload.precio) || payload.precio < 0) {
    clientFormMessage.textContent = 'Ingresa un monto válido.';
    return;
  }

  saveButton.disabled = true;
  saveButton.querySelector('span').textContent = 'Guardando…';
  try {
    const id = $('#client-id').value;
    if (id) {
      await updateDoc(doc(db, 'clientes', id), payload);
      toast('Cliente actualizado.');
    } else {
      await addDoc(collection(db, 'clientes'), { ...payload, creadoEn: serverTimestamp() });
      toast('Cliente registrado.');
    }
    closeClientDialog();
  } catch (error) {
    clientFormMessage.textContent = friendlyError(error);
  } finally {
    saveButton.disabled = false;
    saveButton.querySelector('span').textContent = 'Guardar cliente';
  }
}

function openDeleteDialog(client) {
  deleteTarget = client;
  $('#delete-client-name').textContent = client.nombre || 'Cliente';
  deleteDialog.showModal();
}

async function deleteClient() {
  if (!deleteTarget) return;
  confirmDeleteButton.disabled = true;
  confirmDeleteButton.textContent = 'Eliminando…';
  try {
    await deleteDoc(doc(db, 'clientes', deleteTarget.id));
    deleteDialog.close();
    toast('Cliente eliminado.');
    deleteTarget = null;
  } catch (error) {
    toast(friendlyError(error));
  } finally {
    confirmDeleteButton.disabled = false;
    confirmDeleteButton.textContent = 'Eliminar';
  }
}

function csvCell(value) {
  const text = String(value ?? '').replace(/"/g, '""');
  return `"${text}"`;
}

function exportCSV() {
  if (!clients.length) {
    toast('No hay clientes para exportar.');
    return;
  }
  const rows = [['Nombre','Teléfono','Correo','Dirección','Servicio','Estado','Monto','Fecha instalación','Notas']];
  clients.forEach(client => rows.push([
    client.nombre, client.telefono, client.email, client.direccion, client.servicio,
    statusLabels[client.estado] || client.estado, client.precio || 0, client.fechaInstalacion, client.notas
  ]));
  const csv = '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `nexo-clientes-${new Date().toISOString().slice(0,10)}.csv`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  toast('CSV exportado.');
}

function initFirebase() {
  if (!firebaseReady) {
    setupAlert.hidden = false;
    setLoginBusy(false);
    loginMessage.textContent = 'Configura Firebase antes de iniciar sesión.';
    return;
  }
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    onAuthStateChanged(auth, user => {
      if (user) {
        showDashboard(user);
        subscribeToClients();
      } else {
        if (unsubscribeClients) unsubscribeClients();
        clients = [];
        showLogin();
      }
    });
  } catch (error) {
    setupAlert.hidden = false;
    loginMessage.textContent = friendlyError(error);
  }
}

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!firebaseReady || !auth) return;
  loginMessage.textContent = '';
  if (!loginForm.reportValidity()) return;
  setLoginBusy(true);
  try {
    await signInWithEmailAndPassword(auth, $('#login-email').value.trim(), $('#login-password').value);
  } catch (error) {
    loginMessage.textContent = friendlyError(error);
  } finally {
    setLoginBusy(false);
  }
});

$('#logout-button').addEventListener('click', async () => {
  if (!auth) return;
  await signOut(auth);
  toast('Sesión cerrada.');
});

['#new-client', '#new-client-side', '#empty-add'].forEach(selector => $(selector).addEventListener('click', () => openClientDialog()));
$('#close-dialog').addEventListener('click', closeClientDialog);
$('#cancel-dialog').addEventListener('click', closeClientDialog);
clientForm.addEventListener('submit', saveClient);
$('#cancel-delete').addEventListener('click', () => deleteDialog.close());
$('#confirm-delete').addEventListener('click', deleteClient);
searchInput.addEventListener('input', renderClients);
statusFilter.addEventListener('change', renderClients);
$('#export-csv').addEventListener('click', exportCSV);

const sidebar = $('#sidebar');
const sidebarToggle = $('#sidebar-toggle');
sidebarToggle.addEventListener('click', () => {
  const open = sidebar.classList.toggle('is-open');
  sidebarToggle.setAttribute('aria-expanded', String(open));
});
sidebar.querySelectorAll('a,button').forEach(item => item.addEventListener('click', event => {
  if (event.currentTarget.id !== 'new-client-side' && window.innerWidth <= 850) sidebar.classList.remove('is-open');
}));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && sidebar.classList.contains('is-open')) sidebar.classList.remove('is-open');
});

initFirebase();
