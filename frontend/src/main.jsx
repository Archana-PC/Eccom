import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './app/store.js'

window.addEventListener("error", (e) => {
  console.log("GLOBAL ERROR:", e.error || e.message, e);
});

window.addEventListener("unhandledrejection", (e) => {
  console.log("UNHANDLED PROMISE:", e.reason, e);
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

  