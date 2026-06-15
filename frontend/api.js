(function attachApiHelpers(window) {
  "use strict";

  const TOKEN_KEY = "aiLearnAuthToken";
  const USER_KEY = "aiLearnCurrentUser";
  const DEFAULT_BACKEND = "http://localhost:5000";

  function trimTrailingSlash(value) {
    return String(value || "").replace(/\/+$/, "");
  }

  function getApiBase() {
    const configured =
      window.AI_LEARN_API_BASE_URL ||
      window.localStorage.getItem("AI_LEARN_API_BASE_URL");

    if (configured) return trimTrailingSlash(configured);

    if (
      window.location.protocol === "http:" ||
      window.location.protocol === "https:"
    ) {
      const frontendOnlyPorts = new Set(["3000", "5173", "5500", "8080"]);
      if (
        window.location.pathname.startsWith("/app/") ||
        !frontendOnlyPorts.has(window.location.port)
      ) {
        return window.location.origin;
      }
      return DEFAULT_BACKEND;
    }

    return DEFAULT_BACKEND;
  }

  function getDefaultBackend() {
    return DEFAULT_BACKEND;
  }

  function getToken() {
    return window.localStorage.getItem(TOKEN_KEY) || "";
  }

  function setSession(token, username) {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    if (username) window.localStorage.setItem(USER_KEY, username);
    return true;
  }

  function clearSession() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }

  function getCurrentUser() {
    return window.localStorage.getItem(USER_KEY) || "";
  }

  async function request(path, options = {}) {
    const { baseUrl, timeout: timeoutMs, ...fetchOptions } = options;
    const requestBase = trimTrailingSlash(baseUrl || getApiBase());
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      timeoutMs || 20000,
    );
    const headers = new Headers(fetchOptions.headers || {});

    if (fetchOptions.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const token = getToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    try {
      const response = await fetch(`${requestBase}${path}`, {
        ...fetchOptions,
        headers,
        signal: controller.signal,
      });
      const text = await response.text();
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }

      const authToken =
        response.headers.get("X-Auth-Token") ||
        (json && (json.authToken || json.token)) ||
        "";
      const username =
        response.headers.get("X-User-Name") ||
        (json && (json.username || (json.user && json.user.username))) ||
        "";

      if (authToken) setSession(authToken, username);

      if (!response.ok) {
        const error = new Error(
          text || response.statusText || "Request failed.",
        );
        error.status = response.status;
        throw error;
      }

      if (json) {
        return {
          response,
          text,
          json,
          authToken,
          username,
          baseUrl: requestBase,
        };
      }

      return { response, text, authToken, username, baseUrl: requestBase };
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("The request timed out. Please try again.");
      }
      if (
        error instanceof TypeError &&
        /failed to fetch|networkerror|load failed/i.test(error.message || "")
      ) {
        throw new Error(
          `Cannot connect to the backend at ${requestBase}. Make sure the backend server is running and reachable from this page.`,
        );
      }
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function showToast(message, type = "info") {
    const region =
      document.getElementById("toastRegion") || createToastRegion();
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.setAttribute("role", "status");
    toast.textContent = message;

    region.appendChild(toast);
    window.setTimeout(() => {
      toast.remove();
    }, 4200);
  }

  function createToastRegion() {
    const region = document.createElement("div");
    region.id = "toastRegion";
    region.className = "toast-region";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    document.body.appendChild(region);
    return region;
  }

  function setBusy(button, isBusy, busyLabel = "Working...") {
    if (!button) return;

    if (isBusy) {
      button.dataset.previousLabel = button.textContent;
      button.textContent = busyLabel;
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      return;
    }

    button.textContent =
      button.dataset.previousLabel ||
      button.dataset.defaultLabel ||
      button.textContent;
    button.disabled = false;
    button.removeAttribute("aria-busy");
  }

  window.AILearnAPI = {
    clearSession,
    getApiBase,
    getCurrentUser,
    getDefaultBackend,
    getToken,
    request,
    setBusy,
    setSession,
    showToast,
  };
})(window);
