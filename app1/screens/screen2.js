import { makeRequest } from "../app.js";

export default function renderScreen2() {
  const app = document.getElementById("app");
  app.innerHTML = `
      <div id="screen2">
        <h2>Consultas Supabase</h2>
        <div class="card">
          <h3>Tarea 1: Obtener todos los productos</h3>
          <button id="get-products-btn">Obtener productos</button>
          <div id="products-result" class="result-container"></div>
        </div>
        
        <div class="card">
          <h3>Tarea 2: Filtrar productos por precio</h3>
          <button id="get-products-under-50-btn">Productos bajo $50</button>
          <div id="products-under-50-result" class="result-container"></div>
        </div>
        
        <div class="card">
          <h3>Tarea 3: Seleccionar campos específicos</h3>
          <button id="get-users-fields-btn">Username y Email</button>
          <div id="users-fields-result" class="result-container"></div>
        </div>
        
        <div class="card">
          <h3>Tarea 4: Ordenar resultados</h3>
          <button id="get-orders-sorted-btn">Órdenes por fecha</button>
          <div id="orders-sorted-result" class="result-container"></div>
        </div>
        
        <button id="back-btn">Volver</button>
      </div>
      `;

  // Función para mostrar resultados
  function displayResult(elementId, data) {
    const container = document.getElementById(elementId);
    
    if (!data || data.error) {
      container.innerHTML = `<p class="error">Error: ${JSON.stringify(data?.error || 'No se obtuvieron datos')}</p>`;
      return;
    }
    
    let html = '<div class="table-container"><table><thead><tr>';
    
    // Headers
    if (data.length > 0) {
      const headers = Object.keys(data[0]);
      headers.forEach(header => {
        html += `<th>${header}</th>`;
      });
    }
    
    html += '</tr></thead><tbody>';
    
    // Rows
    data.forEach(item => {
      html += '<tr>';
      Object.values(item).forEach(value => {
        html += `<td>${value !== null ? value : 'N/A'}</td>`;
      });
      html += '</tr>';
    });
    
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  // Eventos de los botones
  document.getElementById("get-products-btn").addEventListener("click", async () => {
    try {
      const productsResultContainer = document.getElementById("products-result");
      productsResultContainer.innerHTML = '<p>Cargando...</p>';
      
      const response = await makeRequest("/products", "GET");
      displayResult("products-result", response);
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("products-result").innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });

  document.getElementById("get-products-under-50-btn").addEventListener("click", async () => {
    try {
      const resultContainer = document.getElementById("products-under-50-result");
      resultContainer.innerHTML = '<p>Cargando...</p>';
      
      const response = await makeRequest("/products/under-50", "GET");
      displayResult("products-under-50-result", response);
    } catch (error) {
      console.error("Error fetching products under 50:", error);
      document.getElementById("products-under-50-result").innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });

  document.getElementById("get-users-fields-btn").addEventListener("click", async () => {
    try {
      const resultContainer = document.getElementById("users-fields-result");
      resultContainer.innerHTML = '<p>Cargando...</p>';
      
      const response = await makeRequest("/users/username-email", "GET");
      displayResult("users-fields-result", response);
    } catch (error) {
      console.error("Error fetching user fields:", error);
      document.getElementById("users-fields-result").innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });

  document.getElementById("get-orders-sorted-btn").addEventListener("click", async () => {
    try {
      const resultContainer = document.getElementById("orders-sorted-result");
      resultContainer.innerHTML = '<p>Cargando...</p>';
      
      const response = await makeRequest("/orders/by-date", "GET");
      displayResult("orders-sorted-result", response);
    } catch (error) {
      console.error("Error fetching sorted orders:", error);
      document.getElementById("orders-sorted-result").innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    // Función de navegación que debes añadir a app1/app.js
    navigateTo("/");
  });
}